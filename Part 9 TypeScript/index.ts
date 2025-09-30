
import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    try {
        const result = {
            weight: parseFloat(String(req.query.weight)),
            height: parseFloat(String(req.query.height)),
            bmi: calculateBmi(String(req.query.height), String(req.query.weight))
        }
        res.send(result)
    }
    catch(e) {
        res.status(500).send({
            error: e.message
        })
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

