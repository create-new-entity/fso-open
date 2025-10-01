import axios from "axios";
import type { DiaryEntry } from "../types";


const baseUrl = 'http://localhost:3000';


const getAllDiaries = async (): Promise<DiaryEntry[]> => {
    const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
    return response.data;
};

const diaryService = {
    getAllDiaries
};

export default diaryService;