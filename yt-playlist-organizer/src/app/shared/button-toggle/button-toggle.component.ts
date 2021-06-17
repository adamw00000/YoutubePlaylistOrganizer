import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent implements OnInit {
  @Input() name: string;
  @Output() toggleChanged = new EventEmitter<boolean>();
  
  public checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(): void {
    this.checked = !this.checked;
    this.toggleChanged.emit(this.checked)
  }
}
