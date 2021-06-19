import { Component, OnInit } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { IVideo } from 'src/app/models/IVideo';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-playlist-main',
  templateUrl: './playlist-main.component.html',
  styleUrls: ['./playlist-main.component.scss']
})
export class PlaylistMainComponent implements OnInit {
  public playlists: IPlaylist[] = [
    {
      id: "id1",
      name: "Cool stuff"
    },
    {
      id: "id2",
      name: "Cooler stuff"
    },
    {
      id: "id3",
      name: "Coolerest stuff"
    },
    {
      id: "id4",
      name: "Cool stuffer"
    },
    {
      id: "id5",
      name: "Cool stufferests"
    },
  ];

  public videos: IVideo[] = [
    {
      id: "6UXkzgu2T28",
      name: "Some celtic music",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "ykURWvAo6Eg",
      name: "Some celtic music 2",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "6UXkzgu2T28",
      name: "Some celtic music 3",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "ykURWvAo6Eg",
      name: "Some celtic music 4",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "6UXkzgu2T28",
      name: "Some celtic music 5",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "ykURWvAo6Eg",
      name: "Some celtic music 6",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
    {
      id: "6UXkzgu2T28",
      name: "Some celtic music 7",
      imageUrl: "https://i.redd.it/3t78fm2mul571.png"
    },
  ]

  constructor(private ytService: YoutubeService) { }

  async ngOnInit(): Promise<void> {
    this.videos = await this.ytService.getLikedVideos().toPromise()
  }

}
