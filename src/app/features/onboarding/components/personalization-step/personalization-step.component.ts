import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface Interest {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-personalization-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule
  ],
  templateUrl: './personalization-step.component.html',
  styleUrls: ['./personalization-step.component.scss']
})
export class PersonalizationStepComponent {
  @Output() next = new EventEmitter<{ interests: string[], city: string }>();
  @Output() back = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();

  interests: Interest[] = [
    { id: 'anime', label: 'Anime/Manga', icon: 'star', selected: false },
    { id: 'gaming', label: 'Gaming', icon: 'trophy', selected: false },
    { id: 'historical', label: 'Historical & Tradition', icon: 'bank', selected: false },
    { id: 'photographers', label: 'Photographers', icon: 'camera', selected: false },
    { id: 'makeup', label: 'Makeup Artists', icon: 'skin', selected: false }
  ];

  cities = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' }
  ];

  personalizationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalizationForm = this.fb.group({
      city: [null]
    });
  }

  toggleInterest(interest: Interest): void {
    interest.selected = !interest.selected;
  }

  onNext(): void {
    const selectedInterests = this.interests
      .filter(i => i.selected)
      .map(i => i.id);

    this.next.emit({
      interests: selectedInterests,
      city: this.personalizationForm.get('city')?.value
    });
  }

  onBack(): void {
    this.back.emit();
  }

  onSkip(): void {
    this.skip.emit();
  }
}
