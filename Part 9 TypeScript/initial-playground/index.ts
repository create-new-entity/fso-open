
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseRequestPayload, processData } from './exerciseCalculator';
import { validateData } from './validate';

const app = express();

app.use(express.json())

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

app.post('/exercises', (req, res) => {
    try {
        const { daily_exercises, target }: ExerciseRequestPayload = req.body
        if(!daily_exercises || !target) {
            res.status(400).json({
                error: 'parameters missing'
            })
            return
        }
        validateData([target, ...daily_exercises])
        const processedData = processData(daily_exercises, target)
        const result = calculateExercises(processedData.daily_exercises, processedData.target)
        res.json(result)
    }
    catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

