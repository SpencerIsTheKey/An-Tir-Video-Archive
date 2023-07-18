import { Activity } from "../entities/Activity";
import { Tournament } from "../entities/Tournament";
import { Video } from "../entities/Video";


export interface EventModel{
    eventId: number;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    host: string;
    url: string;
    activities: Activity[];
    tournaments: Tournament[];
    videos: Video[];
}

export function toArray(
    event: EventModel
): Array<number|string|Date|Array<number>>{
    const activity_ids: Array<number> = [];
    const tournament_ids: Array<number> = [];
    const video_ids: Array<number> = [];

    event.activities.forEach((activity: Activity) => {
        activity_ids.push(activity.activityId);
    });

    event.tournaments.forEach((tournament: Tournament) => {
        tournament_ids.push(tournament.tournamentId);
    });

    event.videos.forEach((video: Video) => {
        video_ids.push(video.videoId);
    });

    return [
        event.eventId,
        event.name,
        event.location,
        event.startDate,
        event.endDate,
        event.host,
        event.url,
        activity_ids,
        tournament_ids,
        video_ids
    ];
}