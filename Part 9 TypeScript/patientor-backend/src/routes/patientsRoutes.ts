import { Router, Request, Response } from "express";

import { EntryWithoutId, NonSensitivePatient, Patient } from "../types/types";
import { addPatientData, addPatientEntry, getNonSensitiveEntries, getPatientData, getPatientsData, parseDiagnosisCodes, PatientSchema } from "../services/patientsUtils";
import z from "zod";

const patientsRouter = Router();

patientsRouter.get('/:id', (req, res: Response<Patient | { error: string }>) => {
    try {
        const patient = getPatientData(req.params.id);
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

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]> ) => {
    res.send(getNonSensitiveEntries(getPatientsData()));
});



patientsRouter.post('/:id/entries', (req: Request<{ id: string}, unknown, EntryWithoutId>, res) => {
    try {
        const newEntry = req.body;
        const diagnosisCodes = parseDiagnosisCodes(req.body);
        newEntry.diagnosisCodes = diagnosisCodes;
        const patientId = req.params.id;
        const updatedPatient = addPatientEntry(patientId, newEntry);
        return res.send(updatedPatient);
    }
    catch(error) {
        if(error instanceof Error) {
            return res.status(500).send({ error: error.message });
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