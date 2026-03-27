import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-welcome-step',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './welcome-step.component.html',
  styleUrls: ['./welcome-step.component.scss']
})
export class WelcomeStepComponent {
  @Output() next = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();

  onNext(): void {
    this.next.emit();
  }

  onSkip(): void {
    this.skip.emit();
  }
}
