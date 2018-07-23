const express = require('express')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express()
const validator = require('express-validator');
const jwtVerifier = require('express-jwt');
const cors = require('cors');

app.use(cors());
app.options("*", cors());

/**https server */
var fs = require('fs');
var https = require('https');
var http = require('http');
/** */



// const user = { email: 'demo@gmail.com', password: 1234 }
const secret = 'ODBmMTM1Y2IiLCJpYXQiOjE1MzEzMTc3MzJ9.pHqPWofL_iC'


/*function createToken(){
    // sign with default (HMAC SHA256)
    let expirationDate =  Math.floor(Date.now() / 1000) + 800 //30 seconds from now
    var token = jwt.sign({ userID: user.email, exp: expirationDate }, secret);
    return token;
}*/

function createNewToken() {
    // sign with default (HMAC SHA256)
    let expirationDate = Math.floor(Date.now() / 1000) + 1 //30 seconds from now
    var token = jwt.sign({ name: 'john doe', exp: expirationDate }, secret);
    return token;
}


// res.send(createNewToken());



app.use(validator());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/test',cors(corsOptions), (req, res) => {
app.get('/test', (req, res) => {
    console.log('testing updated');
    res.send({ str: 'testing' });
});

app.get('/create', (req, res) => {
    console.log('create token');
    const tmpToken = createNewToken();
    res.send(tmpToken);
});


app.get('/home', jwtVerifier({ secret: secret }), (req, res) => {
        console.log('valid token');
        res.send('true');
    },
    () => {
        console.log('invalid token!!!');
        res.send('false');
    })

/*
app.post('/login', (req, res) => {
    // req.checkBody('email', 'Not a valid email').isEmail();
    // var errors = req.validationErrors();
    // if (errors) {
    //     res.send(errors);
    // } else {
        if (req.body.email == user.email && req.body.password == user.password) {
            res.send(createToken());
            // res.send('create token')
        }else{
            res.sendStatus(400);
        }
    // }
})*/

// app.use((err, req, res, next) => {
// 	if (err.name === 'UnauthorizedError') {
//         res.status(500).send(err.message);
// 	}
// });


/**https server */
/** */
const options = {
    pfx: fs.readFileSync('sagiCer.pfx'),
    passphrase: 'o0JULgRqSMW52lhvKgie/W6BPmqGj28cpbrkGLBukeg='
};


var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);

httpsServer.listen(4003, '0.0.0.0', function() {
    console.log('https check server fixed Listening to port:  4003');
});

httpServer.listen(4004, '0.0.0.0', function() {
    console.log('http check server a fixed Listening to port:  4004');
});



/** */
// app.listen(4003, () => console.log('jwt check node.js server  listening on port 4003!'));