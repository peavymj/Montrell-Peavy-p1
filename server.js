import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult } from 'express-validator';
const app = express();




connectDatabase();

app.use(express.json({ extended: false }));

app.get('/', (req,res) =>
    res.send('http get request sent to root api endpoint')
);

app.post('/api/users',
[
    check('name', 'Please enter your name')
    .not()
    .isEmpty(),
    check('Age', 'Please enter your age').isInt({min: 18}),
    check(
    'phone number',
     'Your number wont be visible to other users')
    .isMobilePhone()
],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        return res.send(req.body);
    }
});

app.listen(4000, () => console.log('Express server running on port 4000'));
