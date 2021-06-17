import { Component, Input, OnInit } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { IVideo } from 'src/app/models/IVideo';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() videos: IVideo[];
  @Input() playlists: IPlaylist[];

  constructor() { }

  ngOnInit(): void {
  }

}
