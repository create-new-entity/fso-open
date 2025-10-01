import { validateData } from "./validate";

export type ExerciseRequestPayload = {
    daily_exercises: number[],
    target: number
}

function parseData(trainingDays: string[], target: string): ExerciseRequestPayload {
    const parsedTrainingDays = trainingDays.map(n => parseFloat(n));
    const parsedTarget = parseInt(target, 10);

    return {
        daily_exercises: parsedTrainingDays,
        target: parsedTarget
    }
}

function getRating(average: number, target: number): Pick<Result, 'rating' | 'ratingDescription'> {
    if(average > target) {
        return {
            rating: 3,
            ratingDescription: 'Expectation exceeded. Great job!'
        };
    };
    if(average === target) {
        return {
            rating: 2,
            ratingDescription: 'not too bad but could be better'
        };
    };
    return {
        rating: 1,
        ratingDescription: 'Needs improvement.'
    };
};

export function processData(trainingDays: string[] | number[], target: string | number): ExerciseRequestPayload {
    if(typeof trainingDays[0] === 'string') {
        return parseData(trainingDays as string[], target as string)
    }
    return {
        daily_exercises: trainingDays as number[],
        target: target as number
    }
}


interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(exerciseHours: number[], target: number): Result {
    const trainingDays = exerciseHours.filter(h => h > 0).length;
    const totalWorkedOutHours = exerciseHours.reduce((acc, curr) => acc + curr);
    const averageWorkedOutHourse = totalWorkedOutHours / exerciseHours.length;

    const success = averageWorkedOutHourse >= target;
    const { rating, ratingDescription } = getRating(averageWorkedOutHourse, target);

    return {
        periodLength: exerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: averageWorkedOutHourse
    };
};


if(require.main === module) {
    validateData(process.argv.slice(2));
    const { daily_exercises: trainingDays, target } = processData(process.argv.slice(3), process.argv[2])
    console.log(calculateExercises(trainingDays, target));
};

// npm run calculateExercises 3 0 2 4.5 0 3 1 2