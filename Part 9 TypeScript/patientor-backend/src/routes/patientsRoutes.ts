import { Router, Response } from "express";

import { NonSensitivePatient } from "../types/types";
import { addPatientData, getNonSensitiveEntries, getPatientsData, PatientSchema } from "../services/patientsUtils";
import z from "zod";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {
    res.send(getNonSensitiveEntries(getPatientsData()));
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatientData = PatientSchema.parse(req.body);
        const addedPatient = addPatientData(newPatientData);
        res.status(201).send(addedPatient);
    }
    catch(error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});


export default patientsRouter;