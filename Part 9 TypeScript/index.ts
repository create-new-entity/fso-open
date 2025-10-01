
import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const result = {
            weight: parseFloat(req.query.weight as string),
            height: parseFloat(req.query.height as string),
            bmi: calculateBmi(req.query.height as string, req.query.weight as string)
        };
        res.send(result);
    }
    catch(e) {
        if(e instanceof Error) {
            res.status(500).send({
                error: e.message
            });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

