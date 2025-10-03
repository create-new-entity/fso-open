
export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum EntryTypes {
  Hostpital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseEntry {
  id: string,
  date: string,
  type: EntryTypes,
  specialist: string,
  description: string,
  diagnosisCodes? : string[],
}

type Leave = {
  startDate: string,
  endDate: string
};


interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string,
  sickLeave?: Leave
}

type Discharge = {
  date: string,
  criteria: string
};

interface HospitalEntry extends BaseEntry {
  discharge: Discharge
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: number
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;

  entries: Entry[]
}


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatient = Omit<Patient, 'id'>;