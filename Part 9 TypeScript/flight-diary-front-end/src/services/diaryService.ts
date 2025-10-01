import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";


const baseUrl = 'http://localhost:3000';
const diariesUrl = `${baseUrl}/api/diaries`;


const getAllDiaries = async (): Promise<DiaryEntry[]> => {
    const response = await axios.get<DiaryEntry[]>(diariesUrl);
    return response.data;
};

const createDiaryEntry = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
    const response = await axios.post<DiaryEntry>(diariesUrl, newEntry);
    return response.data;
};

const diaryService = {
    getAllDiaries,
    createDiaryEntry
};

export default diaryService;