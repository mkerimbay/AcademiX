const express = require('express');
const app = express();
const path = require('path');

const User = require('./models/user');
const Course = require('./models/course');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash')
const {isLoggedIn} = require('./middleware')
const MongoStore = require("connect-mongo")
dbUrl = 'mongodb://localhost:27017/academix'
const secret = 'thisshouldbeabettersecret!'

const mongoose = require('mongoose');




mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sessionConfig = {
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({ mongoUrl: dbUrl })
}

app.use(session(sessionConfig));
app.use(flash())

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
// express.static(path.join(__dirname, 'images'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.engine('ejs', ejsMate) 



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



app.get('/', (req, res) => {
    res.render('home')
})



app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    try {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;
        const user = new User({username, email})
        const registeredUser = await User.register(user, password)

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to AcademiX')
            res.redirect('/')
        })

        
        
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
    
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome back')
    res.redirect('/')
})

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}); 


app.get('/courses', isLoggedIn, async(req, res) => {
    const courses = await Course.find({})
    res.render('courses/index', {courses})
})

app.get('/courses/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)
    const users = []
    for (let user_id of course.enrolledStudents) {
        const user = await User.findById(user_id)
        users.push(user)
    }
    
    
    res.render('courses/show', {course, users})
})


app.get('/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id)

    const courses = []
    for (let id of user.enrolledCourses) {
        const course = await Course.findById(id)
        courses.push(course)
    }
    console.log(user.enrolledCourses)
    console.log(courses)
    res.render('users/show', {user, courses})
})

app.put('/enroll/:user_id/:course_id', async(req, res) => {
    try {
        const user_id = req.params.user_id
        const course_id = req.params.course_id
    
        const user = await User.findById(req.params.user_id)
        user.enrolledCourses.push(course_id);
        await user.save();

        const course = await Course.findById(req.params.course_id)
        course.enrolledStudents.push(user_id)
        await course.save()

        res.redirect(`/courses/${course_id}`)
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/courses')
    }
    
})

app.put('/unenroll/:user_id/:course_id', async(req, res) => {
    
    const course_id = req.params.course_id
    const user_id = req.params.user_id
    console.log(course_id)
    console.log(user_id)
        
    // delete course from user
    try {
        var user = await User.findById(user_id)
        var courseIndex = user.enrolledCourses.indexOf(course_id);
        if (courseIndex !== -1) {
            user.enrolledCourses.splice(courseIndex, 1);
            await user.save();
        }
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/courses')
    }


    try {
        // delete user from course
        const course = await Course.findById(course_id)
        const userIndex = course.enrolledStudents.indexOf(user_id)
        if (userIndex !== -1) {
            course.enrolledStudents.splice(userIndex, 1);
            await course.save();
        }
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/courses')
    }
    
    res.redirect(`/courses/${course_id}`)
    
})



app.listen(3000, () => {
    console.log('Serving on port 3000')
})