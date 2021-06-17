import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistEntryComponent } from './playlist-entry.component';

describe('PlaylistEntryComponent', () => {
  let component: PlaylistEntryComponent;
  let fixture: ComponentFixture<PlaylistEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
