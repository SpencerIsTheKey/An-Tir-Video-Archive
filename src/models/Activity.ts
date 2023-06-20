import { Activity } from "../entities/Activity";
import { Event } from "../entities/Event";
import { Tournament } from "../entities/Tournament";
import { Video } from "../entities/Video";

export interface ActivityModel {
    activityId: number;
    name: string;
    tournaments: Tournament[];
    videos: Video[];
    events: Event[];
}

export function toArray(
    activity: ActivityModel
): Array<number | string | Array<number>>{
    const tournament_ids: Array<number> = [];
    const video_ids: Array<number> = [];
    const event_ids: Array<number> = [];

    activity.tournaments.forEach((tournament: Tournament) => {
        tournament_ids.push(tournament.tournamentId);
    })

    activity.videos.forEach((video: Video) => {
        video_ids.push(video.videoId);
    });

    activity.events.forEach((event: Event) => {
        event_ids.push(event.eventId);
    });

    return [
        activity.activityId,
        activity.name,
        tournament_ids,
        video_ids,
        event_ids
    ];
}