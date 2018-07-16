const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

function tokenValidator(req, res, next) {
if (!req.get('Authorization')) {
res.status(401).json({error: 'Authorization error'});
            return;
}
    const authToken = req.get('Authorization').split('Bearer ')[1];
    jwt.verify(authToken, 'secret_key', (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Authorization error'});
            return;
        }
        next();
    });
}

app.post('/login', (req, res) => {
    const access_token = jwt.sign(req.body, 'secret_key', { expiresIn: 60 });
    const refresh_token = jwt.sign(req.body, 'secret_key_for_refresh', { expiresIn: '12h' });
    res.json({
        access_token,
        refresh_token,
    });
})

app.post('/token/refresh', (req, res) => {
    if (!req.body || !req.body.refresh_token) {
        res.status(401).json({error: 'Authorization error'});
    }
    jwt.verify(req.body.refresh_token, 'secret_key_for_refresh', (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Authorization error'});
        }
        const access_token = jwt.sign({login: decoded.login, password: decoded.password}, 'secret_key');
        res.json({access_token});
    });
})

app.get('/data', tokenValidator, (req, res) => {
    res.json({
        data: 'here goes some data',
    });
})

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080')
})