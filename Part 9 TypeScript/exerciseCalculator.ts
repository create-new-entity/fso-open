import { validateData } from "./validate";

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


interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(exerciseHours: number[], target: number): Result {
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


validateData(process.argv.slice(2));

const trainingDays = process.argv.slice(3).map(n => parseFloat(n));
const target = parseInt(process.argv[2], 10);

if(require.main === module) {
    console.log(calculateExercises(trainingDays, target));
};

// npm run calculateExercises 3 0 2 4.5 0 3 1 2