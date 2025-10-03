
import patientsData from "../../data/patients";
import { Gender, NewPatient, NonSensitivePatient, Patient } from "../types/types";
import z from "zod";

export const getNonSensitiveEntries = (patientsData: Patient[]): NonSensitivePatient[] => {
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

export const getPatientData = (patiendId: string) => {
  const foundPatient = getPatientsData().find((patient) => patient.id === patiendId);
  return foundPatient;
};

export const PatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender),
    dateOfBirth: z.iso.date(),
    entries: z.array(z.any())
});

export const addPatientData = (newPatientData: NewPatient): Patient => {
    const patientsData = getPatientsData();
    const addedPatient = { ...newPatientData, id: getPatientsData().length + 1 + '' };
    patientsData.push(addedPatient);
    return addedPatient;
};