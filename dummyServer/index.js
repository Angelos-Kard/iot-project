const express = require('express');
const model = require('./src/model-sql')

// const routes = require('./src/iot-routes');

const app = express();
app.use(express.json())

app.get('/dummy', (req, res)=>{
    const con = model.connectToDB();

    con.connect((err) => {
        if(err) console.log(err);
        //console.log("Connected!");

        con.query("SELECT * FROM dummy_table", (err, results, fields) => {
            if (err) console.log(err);
            con.end();
            res.send(results);
        });


    });
})

app.post('/users', (req, res)=> {
    const con = model.connectToDB();

    con.connect((err) => {
        if(err) console.log(err);
        console.log(req.body.username, req.body.password);
        
        con.query("SELECT COUNT(*) as `plithos` FROM Users WHERE `username`=? AND `password`=?", [req.body.username, req.body.password], (err, results, fields) => {
            if (err) console.log(err);
            con.end();
            res.send(results);
        });


    });
})

const port = process.env.PORT || '3000';
app.listen(port, ()=>{
    console.log('Listening to port ' + port)
});


module.exports = app;