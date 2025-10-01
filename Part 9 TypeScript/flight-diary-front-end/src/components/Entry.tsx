import type { DiaryEntry } from "../types";


type EntryProps = {
    diaryEntry: DiaryEntry
};

const Entry = (props: EntryProps) => {
    const { diaryEntry }  = props;

    return (
        <div>
            <h2>{diaryEntry.date}</h2>
            <p>Visibility: {diaryEntry.visibility}</p>
            <p>Weather: {diaryEntry.weather}</p>
        </div>
    );
};

export default Entry;