import { Router, Response } from "express";
import { Diagnosis } from "../types";

import diagnosesData from "../../data/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]> ) => {
    res.send(diagnosesData);
});


export default diagnosesRouter;