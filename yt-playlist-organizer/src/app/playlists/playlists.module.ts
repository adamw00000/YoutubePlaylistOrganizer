import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEntryComponent } from './playlist-entry/playlist-entry.component';
import { PlaylistMainComponent } from './playlist-main/playlist-main.component';
import { SharedModule } from '../shared/shared.module';
import { SafePipe } from '../shared/pipes/safe-pipe';



@NgModule({
  declarations: [
    PlaylistComponent,
    PlaylistEntryComponent,
    PlaylistMainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    PlaylistMainComponent
  ]
})
export class PlaylistsModule { }
