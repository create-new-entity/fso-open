import { useState } from "react";
import diaryService from "../services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "../types";

type NewEntryProps = {
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const NewEntry = (props: NewEntryProps) => {
    const { setEntries } = props;

    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const resetForm = () => {
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newEntry = {
            date, visibility, weather, comment
        };
        const addedEntry = await diaryService.createDiaryEntry(newEntry as NewDiaryEntry);
        setEntries((prev) => {
            return [...prev, addedEntry];
        });
        resetForm();
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <label>
                        date: <input value={date} onChange={(e) => setDate(e.target.value)}/>
                    </label>
                    <label>
                        visibility: <input value={visibility} onChange={(e) => setVisibility(e.target.value)}/>
                    </label>
                    <label>
                        weather: <input value={weather} onChange={(e) => setWeather(e.target.value)}/>
                    </label>
                    <label>
                        comment: <input value={comment} onChange={(e) => setComment(e.target.value)}/>
                    </label>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
};

export default NewEntry;