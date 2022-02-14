const mysql = require('mysql');

if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

exports.connectToDB = () => {
    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER_DB,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        multipleStatements: true
    });
}