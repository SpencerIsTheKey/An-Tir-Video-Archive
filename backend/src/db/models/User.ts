import { Video } from "../entities/Video";

export interface UserModel {
    userId: number;
    username: string;
    password: string;
    email: string;
    videos: Video[];
}

export function toArray(
    user: UserModel
): Array<number|string|Array<number>> {
    const video_ids: Array<number> = [];

    user.videos.forEach((video: Video) => {
        video_ids.push(video.videoId);
    });

    return [
        user.userId,
        user.username,
        user.password,
        user.email,
        video_ids
    ];
}