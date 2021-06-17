import { Component, Input, OnInit } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { IVideo } from 'src/app/models/IVideo';

@Component({
  selector: 'app-playlist-entry',
  templateUrl: './playlist-entry.component.html',
  styleUrls: ['./playlist-entry.component.scss']
})
export class PlaylistEntryComponent implements OnInit {
  @Input() video: IVideo;
  @Input() playlists: IPlaylist[];

  public showVideo: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get embedUrl() {
    return 'http://www.youtube.com/embed/' + this.video.id + '?autoplay=1';
  }
}
