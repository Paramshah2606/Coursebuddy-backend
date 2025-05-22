const express = require('express');
const router = express.Router();
const UserController = require("../controller/user-controller");

// Auth

// Sign-up
router.post('/signup',UserController.signup);
// Login route
router.post('/login', UserController.login);
// Logout route
router.get('/logout', UserController.logout);

// Categories 

router.get("/categories/get",UserController.get_categories);

// Course 

router.post("/course/add",UserController.add_course);

router.post("/course/get",UserController.get_courses);

router.get("/course/subscription",UserController.get_course_subscription);

router.get("/course/:id",UserController.get_course_by_id);

router.post("/course/buy",UserController.buy_course);


// Lesson 

router.post("/lesson/add",UserController.add_lesson);

router.post("/lesson/mark",UserController.mark_lesson);

router.get("/lesson/mark/get",UserController.mark_lesson_get);

// Users

router.get("/users/get",UserController.get_users);

// User Progress

router.post("/courseProgress/get",UserController.get_course_progress);


module.exports = router;