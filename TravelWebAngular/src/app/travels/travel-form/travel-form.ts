import { Component } from '@angular/core';
import { TravelService } from '../../shared/travel';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Travel } from '../../shared/travel.model';

@Component({
  selector: 'app-travel-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './travel-form.html',
  styles: ``,
})
export class TravelForm {
  travelForm: FormGroup;

  constructor(public service: TravelService, private fb: FormBuilder) {
    this.travelForm = this.fb.group({
      city: ['', Validators.required],
      image: [''],
      description: [''],
      dateTimeStart: ['', Validators.required],
      dateTimeEnd: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      places: this.fb.array([]),
    });
  }

  get places() {
    return this.travelForm.get('places') as FormArray;
  }

  addPlace() {
    console.log('Добавление достопримечательности');
    const placeGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      travelDetailId: [0],
    });
    this.places.push(placeGroup);
    console.log(this.places.value);
  }

  removePlace(index: number) {
    this.places.removeAt(index);
  }

  onSubmit() {
    if (this.travelForm.valid) {
      const travelData = this.travelForm.value;

      this.service.addTravel(travelData).subscribe({
        next: (res) => {
          this.service.list = res as Travel[];
        },
        error: (res) => {
          console.log(res);
        },
      });
    }
  }
}
