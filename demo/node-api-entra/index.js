require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());

app.use(express.json());

const checkJwt = jwt.expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${process.env.API_TENANT_ID}/discovery/v2.0/keys`,
    }),
    audience: process.env.API_IDENTIFIER,
    issuer: `https://sts.windows.net/${process.env.API_TENANT_ID}/`,
    algorithms: ['RS256'],
});

// In-memory todo storage
const todos = {};

// Utils
const getUserId = (req) => req.auth?.oid || req.auth?.sub;

app.get('/api/protected', checkJwt, (req, res) => {
    res.json({ message: 'You accessed a protected API route!', user: req.auth });
});

app.get('/api/_status', (req, res) => {
    const response = "Node API running successfully!";
    res.json(response);
})

app.get('/api/todos', checkJwt, (req, res) => {
    const userId = getUserId(req);
    res.json(todos[userId] || []);
});

app.post('/api/todos', checkJwt, (req, res) => {
    try {
        const userId = getUserId(req);
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'Todo text is required.' });

        const todo = {
            id: uuidv4(),
            text,
            completed: false,
        };

        if (!todos[userId]) todos[userId] = [];
        todos[userId].push(todo);

        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
    }
});

app.put('/api/todos/:id/complete', checkJwt, (req, res) => {
    const userId = getUserId(req);
    const todoList = todos[userId] || [];

    const todo = todoList.find((t) => t.id === req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.completed = true;
    res.json(todo);
});

app.delete('/api/todos/:id', checkJwt, (req, res) => {
    const userId = getUserId(req);
    const todoList = todos[userId] || [];

    const index = todoList.findIndex((t) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    const deleted = todoList.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(4000, () => {
    console.log('API running on http://localhost:4000');
});