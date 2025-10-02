

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy' | 'stormy';

export type DiaryEntry = {
    id: string,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment?: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
