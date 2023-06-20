import { Activity } from "../entities/Activity";
import { Event } from "../entities/Event";
import { Tournament } from "../entities/Tournament";

export interface VideoModel {
    videoId: number;
    url: string;
    user: number;
    event: Event;
    activity: Activity;
    tournament: Tournament;
}

export function toArray(
    video: VideoModel
): Array<number|string> {
    return [
        video.videoId,
        video.url,
        video.user,
        video.event.eventId,
        video.activity.activityId,
        video.tournament.tournamentId
    ];
}