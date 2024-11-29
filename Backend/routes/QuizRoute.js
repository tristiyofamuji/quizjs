import express from "express";
import {
    getQuestions, 
    getQuestionById, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion, 
    getAnswers, 
    createAnswer, 
    updateAnswer, 
    deleteAnswer
} from "../controllers/Quiz.js"; 

const router = express.Router();

// Routes for Questions
router.get("/questions", getQuestions);  // Get all questions with answers
router.get("/questions/:id", getQuestionById);  // Get a specific question with answers
router.post("/questions", createQuestion);  // Create a new question with answers
router.put("/questions/:id", updateQuestion);  // Update a question and its answers
router.delete("/questions/:id", deleteQuestion);  // Delete a question and its answers

// Routes for Answers
router.get("/answers", getAnswers);  // Get all answers
router.post("/answers", createAnswer);  // Create a new answer
router.put("/answers/:id", updateAnswer);  // Update an existing answer
router.delete("/answers/:id", deleteAnswer);  // Delete an answer

export default router;
