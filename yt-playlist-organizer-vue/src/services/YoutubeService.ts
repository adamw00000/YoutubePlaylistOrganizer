import axios from 'axios';
import { PlaylistInfo } from '../models/playlistInfo';
import { Video } from '../models/video';

export default class YoutubeService {
    public getLikedVideos(userId: string, authCode: string): Promise<Video[]> {
        return new Promise(async (resolve, reject) => {
            try {
                axios.get('Youtube/LikedVideos', {
                    params: {
                        userId: userId,
                        authCode: authCode,
                        maxResults: 10,
                    }
                }).then((response: any) => {
                    resolve(response.data)
                })
            } catch (error) {
                console.error(error);
                reject()
            }            
        })
    }
    public getPlaylists(userId: string, authCode: string): Promise<PlaylistInfo[]> {
        return new Promise(async (resolve, reject) => {
            try {
                axios.get('Youtube/Playlists', {
                    params: {
                        userId: userId,
                        authCode: authCode,
                    }
                }).then((response: any) => {
                    resolve(response.data)
                })
            } catch (error) {
                console.error(error);
                reject()
            }            
        })
    }
}