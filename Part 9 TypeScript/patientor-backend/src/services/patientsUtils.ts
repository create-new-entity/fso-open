import { Patient } from "../types";

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