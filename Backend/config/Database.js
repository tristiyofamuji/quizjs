import {Sequelize} from "sequelize";

const db = new Sequelize('quiz_js', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;