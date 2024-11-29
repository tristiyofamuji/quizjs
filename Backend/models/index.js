import { Sequelize } from 'sequelize';
import dbConfig from '../config/Database.js';
import Question from './Question.js';
import Answer from './Answer.js';

const db = new Sequelize(dbConfig);

Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' });
Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

export { db, Question, Answer };
