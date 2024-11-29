import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll({
            attributes: ['uuid', 'question_text', 'skill_points'],
            include: [{
                model: Answer,
                attributes: ['uuid', 'answer_text', 'is_correct']
            }]
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findOne({
            attributes: ['uuid', 'question_text', 'skill_points'],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Answer,
                attributes: ['uuid', 'answer_text', 'is_correct']
            }]
        });
        if (!question) return res.status(404).json({ msg: "Question not found" });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createQuestion = async (req, res) => {
    const { question_text, skill_points, answers } = req.body;  // Expecting answers as an array of objects
    try {
        const question = await Question.create({
            question_text: question_text,
            skill_points: skill_points
        });

        if (answers && answers.length > 0) {
            const answerPromises = answers.map(answer => 
                Answer.create({
                    answer_text: answer.answer_text,
                    is_correct: answer.is_correct,
                    question_id: question.uuid
                })
            );
            await Promise.all(answerPromises);
        }

        res.status(201).json({ msg: "Question and Answers Created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateQuestion = async (req, res) => {
    const question = await Question.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!question) return res.status(404).json({ msg: "Question not found" });

    const { question_text, skill_points, answers } = req.body;
    try {
        await Question.update({
            question_text: question_text,
            skill_points: skill_points
        }, {
            where: {
                uuid: req.params.id
            }
        });

        if (answers && answers.length > 0) {
            await Answer.destroy({ where: { question_id: question.uuid } });

            const answerPromises = answers.map(answer =>
                Answer.create({
                    answer_text: answer.answer_text,
                    is_correct: answer.is_correct,
                    question_id: question.uuid
                })
            );
            await Promise.all(answerPromises);
        }

        res.status(200).json({ msg: "Question Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    const question = await Question.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!question) return res.status(404).json({ msg: "Question not found" });
    try {
        await Answer.destroy({ where: { question_id: question.uuid } });
        await Question.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Question and Answers Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Answer CRUD (Optional, if you need separate endpoints for answers)
export const getAnswers = async (req, res) => {
    try {
        const answers = await Answer.findAll({
            attributes: ['uuid', 'answer_text', 'is_correct', 'question_id']
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createAnswer = async (req, res) => {
    const { answer_text, is_correct, question_id } = req.body;
    try {
        await Answer.create({
            answer_text: answer_text,
            is_correct: is_correct,
            question_id: question_id
        });
        res.status(201).json({ msg: "Answer Created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateAnswer = async (req, res) => {
    const answer = await Answer.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!answer) return res.status(404).json({ msg: "Answer not found" });

    const { answer_text, is_correct, question_id } = req.body;
    try {
        await Answer.update({
            answer_text: answer_text,
            is_correct: is_correct,
            question_id: question_id
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Answer Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteAnswer = async (req, res) => {
    const answer = await Answer.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!answer) return res.status(404).json({ msg: "Answer not found" });
    try {
        await Answer.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Answer Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
