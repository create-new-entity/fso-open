import { Router, Response } from "express";

import { NonSensitivePatient, Patient } from "../types/types";
import { addPatientData, getNonSensitiveEntries, getPatientData, getPatientsData, PatientSchema } from "../services/patientsUtils";
import z from "zod";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {
    res.send(getNonSensitiveEntries(getPatientsData()));
});

patientsRouter.get('/:id', (req, res: Response<Patient | { error: string }>) => {
    try {
        const patient = getPatientData(req.params.id);
        if(!patient) {
            throw new Error('Person not found.');
        }
        return res.send(patient);
    }
    catch(error) {
        if(error instanceof Error) {
            return res.status(500).send({
                error: error.message
            });
        }
        return res.status(500).send({
            error: 'Unknown error.'
        });
    }
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatientData = PatientSchema.parse(req.body);
        newPatientData.entries = [];
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