
import patientsData from "../../data/patients";
import { Gender, NewPatient, NonSensitivePatient, Patient, Diagnosis, EntryWithoutId } from "../types/types";
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

export const getPatientData = (patientId: string): Patient | undefined => {
  const foundPatient = getPatientsData().find((patient) => patient.id === patientId);
  if(!foundPatient) {
    throw new Error('Person not found.');
  }
  return { ...foundPatient };
};

export const addPatientEntry = (patientId: string, entry: EntryWithoutId): Patient => {
  const foundPatient = getPatientsData().find((patient) => patient.id === patientId);
  if(!foundPatient) {
    throw new Error('Patient not found.');
  }
  foundPatient.entries = foundPatient.entries.concat({ ...entry, id: `${foundPatient.entries.length + 1}-${foundPatient.entries.length + 1}`});
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


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};