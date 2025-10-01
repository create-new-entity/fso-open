
import patientsData from "../../data/patients";
import { Gender, NewPatient, Patient } from "../types/types";
import z from "zod";

export const getNonSensitiveEntries = (patientsData: Patient[]): Omit<Patient, 'ssn'>[] => {
  return patientsData.map((patient) => {
    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    };
  });
};

export const getPatientsData = (): Patient[] => {
    return patientsData;
};

export const PatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
    dateOfBirth: z.iso.date()
});

export const addPatientData = (newPatientData: NewPatient): Patient => {
    const patientsData = getPatientsData();
    const addedPatient = { ...newPatientData, id: getPatientsData().length + 1 + '' };
    patientsData.push(addedPatient);
    return addedPatient;
};