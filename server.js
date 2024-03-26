var express = require("express")
var bodyParser = require("body-parser")
var app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));


let calculationHistory = [];

// POST method
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;
    switch (operation) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            result = 'Invalid operation';
    }

    // Store calculation history
    const calculation = `${num1} ${operation} ${num2} = ${result}`;
    calculationHistory.push(calculation);

    res.send(`Result: ${result}`);
});

// GET method
app.get('/history', (req, res) => {
    res.json(calculationHistory);
});
var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Server running at port: " + port)
})