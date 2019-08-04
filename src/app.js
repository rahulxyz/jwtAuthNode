const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the api'
    });
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.json({
                status: 403,
                message: 'Something went wrong. Please try again.'
            });
        } else {
            res.json({
                message: 'Post created',
                authData: authData
            })
        }
    })

})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'rahul',
        email: 'rahul@gmail.com'
    }
    jwt.sign({ user: user }, 'secretKey', (err, token) => {
        res.json({
            token: token
        })
    });
})

//FORMAT OF TOKEN 
//AUTHORIZATION: Bearer <access_token>

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //Forbidden
        res.json({
            status: 403,
            message: 'Access forbidden'
        })
    }

}

app.listen(5000, () => { console.log('Server started on 5000') });