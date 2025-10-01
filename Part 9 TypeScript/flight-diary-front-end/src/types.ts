

type Visibility = 'good' | 'poor';
type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy';

export type DiaryEntry = {
    id: string,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment?: string
}
