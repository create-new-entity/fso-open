import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import type { DiaryEntry } from './types';
import Entries from './components/Entries';
import NewEntry from './components/NewEntry';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const diaryEntries = await diaryService.getAllDiaries();
      console.log('diaryEntries', diaryEntries);
      setEntries(diaryEntries);
    })();
  }, []);

  return (
    <div>
      <NewEntry setEntries={setEntries}/>
      <Entries diaryEntries={entries}/>
    </div>
  );
};

export default App;
