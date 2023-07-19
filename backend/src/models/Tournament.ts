import { Activity } from "../entities/Activity";
import { Event } from "../entities/Event";
import { Video } from "../entities/Video";

export interface TournamentModel {
    tournamentId: number;
    name: string;
    date: Date;
    videos: Video[];
    type: Activity;
    event: Event;
}

export function toArray(
    tournament: TournamentModel
): Array<number|string|Date|Array<number>> {
    const video_ids: Array<number> = [];

    tournament.videos.forEach((video: Video) => {
        video_ids.push(video.videoId);
    })

    return [
        tournament.tournamentId,
        tournament.name,
        tournament.date,
        video_ids,
        tournament.type.activityId,
        tournament.event.eventId
    ];
}