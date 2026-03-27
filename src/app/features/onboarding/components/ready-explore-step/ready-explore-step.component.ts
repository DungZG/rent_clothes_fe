import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ready-explore-step',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './ready-explore-step.component.html',
  styleUrls: ['./ready-explore-step.component.scss']
})
export class ReadyExploreStepComponent {
  @Output() complete = new EventEmitter<void>();

  onStartExploring(): void {
    this.complete.emit();
  }
}
