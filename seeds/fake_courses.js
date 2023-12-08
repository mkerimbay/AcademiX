const Course = require('../models/course')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/academix');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});


const fake_courses = [
    {
      "name": "Fundamentals of Artificial Intelligence",
      "code": "CS483",
      "description": "This course covers artificial intelligence applications in problem solving, reasoning, planning, natural language understanding, computer vision, autonomous car navigation, machine learning, business intelligence, robot design, and so on. In order to solve artificial intelligence problems, the major algorithms include machine learning, search, Markov decision processes, constraint satisfaction, graphical models, and logic. The main goal of the course is to equip students with the tools in Python library to tackle a variety of AI problems in the industries.",
      "professor": "Mr. Ceran, Yasin",
      "enrolledStudents": []
    },
    {
      "name": "Principles of Microeconomics",
      "code": "ECON202",
      "description": "ECON202 is an introduction to the study of microeconomics, which focuses on the behavior of individual consumers and firms in markets. The course examines how individuals and firms make decisions about what to produce, consume, and invest, and how these decisions interact to determine prices, quantities, and market structures. The course also explores the role of government in the economy, including its impact on resource allocation and market efficiency.",
      "professor": "Mr. Sabit, Gul",
      "enrolledStudents": []
    },
    {
      "name": "Agile Project Management",
      "code": "MGT501",
      "description": "Agility in management has been a hallmark factor behind many Silicon Valley success stories. Agile's rapid approach stands in contrast to traditional approaches which rely on slow bureaucratic and paperwork heavy planning approaches. After introducing Agile's manifesto, students will master Agile's adaptive principles, plus its iterative and incremental methodologies and learn how to apply them for managing projects, programs, and portfolios. Students as project managers will learn how to create user stories, apply multiple estimation techniques, pivot appropriately to changing requirements, enhance customer collaborations, measure progress, measure value, reduce costs, and ensure technical excellence. Course knowledge areas also include: Sprint planning, daily Sprints, Sprint reviews, Sprint retrospectives, backlog refinement, and the different roles in Agile mainly the 'Scrum Master', Product Owner, and Development Team",
      "professor": "Mr. Sabit, Gul",
      "enrolledStudents": []
    },
    {
      "name": "Introduction to Web Development",
      "code": "CS402",
      "description": "This course will introduce students to the concepts of artificial intelligence, including search algorithms, knowledge representation, and machine learning.",
      "professor": "Tim Cook",
      "enrolledStudents": []
    },
    {
      "name": "Capstone Project",
      "code": "CS201",
      "description": "This course will cover the fundamental concepts of data structures and algorithms, including arrays, linked lists, stacks, queues, trees, and graphs.",
      "professor": "Mr. A. Banafaa",
      "enrolledStudents": []
    },
    {
      "name": "Computer Graphics",
      "code": "CS102",
      "description": "This course will introduce students to the principles of software engineering, including software design, software development methodologies, and software testing.",
      "professor": "Jeff Bezos",
      "enrolledStudents": []
    },
    {
      "name": "Programming Fundamentals",
      "code": "CS501",
      "description": "This course will introduce students to the principles of computer networks, including network architectures, protocols, and routing.",
      "professor": "Mr.Knut",
      "enrolledStudents": []
    },
    {
      "name": "Machine Learning",
      "code": "CS502",
      "description": "This course will introduce students to the fundamentals of web development, including HTML, CSS, and JavaScript.",
      "professor": "Mr Jonathan Smith",
      "enrolledStudents": []
    }
  ]



const seedDB = async () => {
    await Course.deleteMany({});

    for (let course of fake_courses) {
    const c = new Course(course);
    await c.save();
    }
}
    

seedDB().then(() => {
    mongoose.connection.close()
})