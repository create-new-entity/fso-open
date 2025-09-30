import { validateData } from "./validate"

function calculateBmi(height: number, weight: number): string {

    if(height <= 0 || weight <= 0) {
        throw new Error('Height or Weight can not be zero or negative.')
    }

    const bmi = weight / (height * height * .01 * .01)

    if(bmi < 16.0) {
        return 'Underweight (Severe thinness)'
    }
    else if(bmi >= 16.0 && bmi < 17.0) {
        return 'Underweight (Moderate thinness)'
    }
    else if(bmi >= 17.0 && bmi < 18.5) {
        return 'Underweight (Mild thinness)'
    }
    else if(bmi >= 18.5 && bmi < 25.0) {
        return 'Normal range'
    }
    else if(bmi >= 25.0 && bmi < 30.0) {
        return 'Overweight (Pre-obese)'
    }
    else if(bmi >= 30.0 && bmi < 35.0) {
        return 'Obese (Class I)'
    }
    else if(bmi >= 35.0 && bmi < 40.0) {
        return 'Obese (Class II)'
    }
    else if(bmi >= 40.0) {
        return 'Obese (Class III)'
    }

    throw new Error('Something went wrong.')
}

validateData(process.argv.slice(2))

const height = parseFloat(process.argv[2])
const weight = parseFloat(process.argv[3])

console.log(calculateBmi(height, weight))

// npm run calculateBmi 180 74