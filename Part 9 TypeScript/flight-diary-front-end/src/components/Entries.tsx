import type { DiaryEntry } from "../types";
import Entry from "./Entry";

type EntriesProps = {
    diaryEntries: DiaryEntry[]
}

const Entries = (props: EntriesProps) => {
    const { diaryEntries } = props;

    return (
        <div>
            <h2>Diary entries</h2>
            <div>
                {
                    diaryEntries.map((diaryEntry, index) => {
                        return (
                            <Entry diaryEntry={diaryEntry} key={index}/>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Entries;