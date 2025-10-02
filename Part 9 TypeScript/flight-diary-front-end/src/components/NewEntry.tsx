import { useState } from "react";
import diaryService from "../services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "../types";
import { AxiosError } from "axios";

type NewEntryProps = {
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}


const NewEntry = (props: NewEntryProps) => {
    const { setEntries } = props;

    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [notification, setNotification] = useState('');

    const resetForm = () => {
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const newEntry = {
                date, visibility, weather, comment
            };
            const addedEntry = await diaryService.createDiaryEntry(newEntry as NewDiaryEntry);
            setEntries((prev) => {
                return [...prev, addedEntry];
            });
            resetForm();
        }
        catch(error) {
            if(error instanceof AxiosError) {
                setNotification(error.response?.data);
                setTimeout(() => {
                    setNotification('');
                }, 3000);
            }
            else {
                setNotification('Something went wrong.');
                setTimeout(() => {
                    setNotification('');
                }, 3000);
            }
        }
    };

    const btnsBox = {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '3px',
        border: '2px solid',
        borderRadius: '5px',
        padding: '3px',
        alignItems: 'center',
        marginTop: '5px',
        marginBottom: '5px'
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {
                notification &&
                <p style={{ color: 'red' }}>{notification}</p>
            }
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <label>
                        date: <input
                                    type="date"
                                    id="start"
                                    name="trip-start"
                                    value={date}
                                    min="1980-01-01"
                                    max="2050-12-31"
                                    onChange={(e) => setDate(e.target.value)}
                               />
                    </label>
                    <div style={btnsBox}>
                        visibility:
                        {
                            ['great', 'good', 'ok', 'poor'].map((v, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value={v}
                                            checked={v === visibility}
                                            onChange={(e) => setVisibility(e.target.value)}
                                        />
                                        {v}
                                    </label>
                                );
                            })
                        }
                    </div>
                    <div style={btnsBox}>
                        weather:
                        {
                            ['rainy', 'sunny', 'windy', 'cloudy', 'stormy'].map((w, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="weather"
                                            value={w}
                                            checked={w === weather}
                                            onChange={(e) => setWeather(e.target.value)}
                                        />
                                        {w}
                                    </label>
                                );
                            })
                        }
                    </div>
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