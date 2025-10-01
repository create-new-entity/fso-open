import { Router, Response } from "express";

import { NonSensitivePatient } from "../types/types";
import { addPatientData, getNonSensitiveEntries, getPatientsData, toNewPatient } from "../services/patientsUtils";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {
    res.send(getNonSensitiveEntries(getPatientsData()));
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatientData = toNewPatient(req.body);
        const addedPatient = addPatientData(newPatientData);
        res.status(201).send(addedPatient);
    }
    catch(error) {
        if(error instanceof Error) {
            res.status(401).send({
                error: error.message
            });
        }
        else {
            res.status(500).send({
                error: 'Something is rotten in the state of Denmark.'
            });
        }
    }
});


export default patientsRouter;