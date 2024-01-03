export type Activity = {
    id: number;
    name: string;
    tournament_ids: Array<number>;
    video_ids: Array<number>;
    event_ids: Array<number>;
};

export type Event = {
    id: number;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    host: string;
    url: string;
    activity_ids: Array<number>;
    tournament_ids: Array<number>;
    video_ids: Array<number>;
};

export type Tournament = {
    id: number;
    name: string;
    date: Date;
    tournament_type: number;
    tournament_event: number;
    video_ids: Array<number>;
};

export type Video = {
    id: number;
    url: string;
    poster: number;
    event: number;
    activity: number;
    tournament: number | null;
};