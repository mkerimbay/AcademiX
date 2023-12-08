const Student = require('../models/student')
const Professor = require('../models/professor')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/academix');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});



const seedDB = async () => {
    await Student.deleteMany({});
    await Professor.deleteMany({});
    
    const fake_students = [
        { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', image: 'https://images.unsplash.com/photo-1538683169688-33a8bbea0be1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=390&q=80', location: 'Almaty, Kazakhstan'},
        { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', image: 'https://images.unsplash.com/photo-1536129808005-fae894214c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', location: 'Paris, France' },
        { firstName: 'Carol', lastName: 'Williams', email: 'carol.williams@example.com', image: 'https://images.unsplash.com/photo-1558499932-9609acb6f443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', location: 'Fremont, USA' },
        { firstName: 'Dave', lastName: 'Jones', email: 'dave.jones@example.com', image: 'https://images.unsplash.com/photo-1542909192-2f2241a99c9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80', location: 'New York, USA' },
        { firstName: 'Eve', lastName: 'Brown', email: 'eve.brown@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', location: 'Astana, Kazakhstan' },
        { firstName: 'Frank', lastName: 'Green', email: 'frank.green@example.com', image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=344&q=80', location: 'Shymkent, Kazakhstan' },
        { firstName: 'George', lastName: 'Williams', email: 'george.williams@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', location: 'Texas, USA' },
        { firstName: 'Henry', lastName: 'Jones', email: 'henry.jones@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Iris', lastName: 'Brown', email: 'iris.brown@example.com', image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Jack', lastName: 'Green', email: 'jack.green@example.com', image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', location: 'Utah, USA' },
        { firstName: 'Kelly', lastName: 'Williams', email: 'kelly.williams@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Louis', lastName: 'Jones', email: 'louis.jones@example.com', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Mary', lastName: 'Brown', email: 'mary.brown@example.com', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', location: 'Miami, USA' },
        { firstName: 'Nathan', lastName: 'Green', email: 'nathan.green@example.com', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Olivia', lastName: 'Williams', email: 'olivia.williams@example.com', image: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2038&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com', image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80', location: 'San Francisco, USA' },
        { firstName: 'Quinn', lastName: 'Brown', email: 'quinn.brown@example.com', image: 'https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Ryan', lastName: 'Green', email: 'ryan.green@example.com', image: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80', location: 'Almaty, Kazakhstan' },
        { firstName: 'Samantha', lastName: 'Williams', email: 'samantha.williams@example.com', image: 'https://images.unsplash.com/photo-1630883665215-dc90914c334b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', location: 'San Jose, USA' },
        { firstName: 'Zara', lastName: 'Green', email: 'zara.green@example.com', image: 'https://images.unsplash.com/photo-1606914707708-5180546f153d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80', location: 'Almaty, Kazakhstan' }
    ];

    for (const student of fake_students) {
    const c = new Student(student);
    await c.save();
    }
    
    const fake_professors = [
        { firstName: 'Astrid', lastName: 'Williams', email: 'astrid.williams@physics.mit.edu', rank: 'PhD in Physics' },
        { firstName: 'Brianna', lastName: 'Jones', email: 'brianna.jones@chemistry.harvard.edu', rank: 'PhD in Chemistry' },
        { firstName: 'Cassandra', lastName: 'Smith', email: 'cassandra.smith@biology.stanford.edu', rank: 'PhD in Biology' },
        { firstName: 'Daniel', lastName: 'Brown', email: 'daniel.brown@computerscience.ucla.edu', rank: 'PhD in Computer Science' },
        { firstName: 'Emily', lastName: 'Green', email: 'emily.green@economics.yale.edu', rank: 'PhD in Economics' },
        { firstName: 'Felicia', lastName: 'Williams', email: 'felicia.williams@history.columbia.edu', rank: 'PhD in History' },
        { firstName: 'Gabriel', lastName: 'Jones', email: 'gabriel.jones@politicalscience.princeton.edu', rank: 'PhD in Political Science' },
        { firstName: 'Hannah', lastName: 'Smith', email: 'hannah.smith@english.nyu.edu', rank: 'PhD in English' },
        { firstName: 'Isabella', lastName: 'Brown', email: 'isabella.brown@mathematics.umich.edu', rank: 'PhD in Mathematics' },
        { firstName: 'James', lastName: 'Green', email: 'james.green@music.berkeley.edu', rank: 'PhD in Music' },
        { firstName: 'Kayla', lastName: 'Williams', email: 'kayla.williams@art.scaa.edu', rank: 'PhD in Art History' },
    ];
    for (const professor of fake_professors) {
    const c = new Professor(professor);
    await c.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
})