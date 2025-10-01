
import patientsData from "../../data/patients";
import { Gender, NewPatient, Patient } from "../types/types";
import { isDate, isString } from "./generalUtils";

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

export const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name.');
    }
    return name;
};

export const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation.');
    }
    return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (param: unknown): string => {
    if(!isString(param) || !Object.values(Gender).map(v => v.toString()).includes(param)) {
        throw new Error('Incorrect or missing gender.');
    }
    return param;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing name.');
    }
    return ssn;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    const objectHasAllTheRequiredKeys = 'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object;

    if (objectHasAllTheRequiredKeys)  {
        const newEntry: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const addPatientData = (newPatientData: NewPatient): Patient => {
    const newPatient = toNewPatient(newPatientData);
    const patientsData = getPatientsData();
    const addedPatient = { ...newPatient, id: getPatientsData().length + 1 + '' };
    patientsData.push(addedPatient);
    return addedPatient;
};