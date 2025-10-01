import { Router, Response } from "express";
import { NonSensitivePatient } from "./../types";

import patientsData from "../../data/patients";
import { getNonSensitiveEntries } from "../services/patientsUtils";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {
    res.send(getNonSensitiveEntries(patientsData));
});


export default patientsRouter;