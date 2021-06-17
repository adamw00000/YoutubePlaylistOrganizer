import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMainComponent } from './playlist-main.component';

describe('PlaylistMainComponent', () => {
  let component: PlaylistMainComponent;
  let fixture: ComponentFixture<PlaylistMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
