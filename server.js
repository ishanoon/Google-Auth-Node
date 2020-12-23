const app = require('express')();
const bodyParser = require('body-parser')
const dbconnection = require('./configs/db')
const login = require('./routes/login')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", login)


dbconnection
const PORT = 3000 || process.env.PORT

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
})

module.exports = app