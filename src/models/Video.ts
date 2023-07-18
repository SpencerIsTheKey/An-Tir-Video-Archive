import { Activity } from "../entities/Activity";
import { Event } from "../entities/Event";
import { Tournament } from "../entities/Tournament";
import { User } from "../entities/User";

export interface VideoModel {
    videoId: number;
    url: string;
    name: string;
    user: User;
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
        video.user.userId,
        video.event.eventId,
        video.activity.activityId,
        video.tournament.tournamentId
    ];
}