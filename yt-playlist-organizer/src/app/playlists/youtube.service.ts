import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../models/IVideo';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private http: HttpClient) { }

  public getLikedVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>('Youtube/LikedVideos', {
      params: {
        'authCode': localStorage.getItem('authCode')!,
        'userId': localStorage.getItem('userId')!,
        'maxResults': 10,
      }
    });
  }
}
