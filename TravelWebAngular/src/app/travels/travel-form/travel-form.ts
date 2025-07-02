import { Component, Input, SimpleChanges } from '@angular/core';
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
import { PlaceService } from '../../shared/place';
import { Place } from '../../shared/place.model';
import { firstValueFrom } from 'rxjs';

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
  @Input() travelToEdit?: Travel;

  constructor(
    public travelService: TravelService,
    public placeService: PlaceService,
    private fb: FormBuilder
  ) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['travelToEdit'] && this.travelToEdit) {
      this.setFormData(this.travelToEdit);
    }
  }
  setFormData(travel: Travel) {
    this.travelForm.patchValue({
      city: travel.city,
      image: travel.image,
      description: travel.description,
      dateTimeStart: travel.dateTimeStart,
      dateTimeEnd: travel.dateTimeEnd,
      cost: travel.cost,
    });

    this.places.clear();

    travel.places?.forEach((place) => {
      const placeGroup = this.fb.group({
        name: [place.name, Validators.required],
        description: [place.description],
        image: [place.image],
        travelDetailId: [place.travelDetailId],
      });
      this.places.push(placeGroup);
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
  cancelEdit() {
    this.travelForm.reset();
    this.places.clear();
    this.travelToEdit = undefined;
  }

  onSubmit() {
    if (this.travelForm.valid) {
      const travelData = this.travelForm.value;
      const travelId = this.travelToEdit?.id;

      if (travelId) {
        const updatedTravel = { ...travelData, id: travelId };
        this.travelService.updateTravel(updatedTravel).subscribe({
          next: () => {
            const places: Place[] = this.places.value;

            for (const place of places) {
              place.travelDetailId = travelId;

              if (place.id) {
                this.placeService.updatePlace(place).subscribe();
              } else {
                this.placeService.addPlace(place).subscribe();
              }
            }
            const originalPlaceIds =
              this.travelToEdit?.places?.map((p) => p.id) ?? [];
            const currentPlaceIds = places.filter((p) => p.id).map((p) => p.id);
            const deletedPlaceIds = originalPlaceIds.filter(
              (id) => !currentPlaceIds.includes(id)
            );

            for (const id of deletedPlaceIds) {
              this.placeService.deletePlace(id!).subscribe();
            }

            this.travelService.refreshList();
            this.travelForm.reset();
            this.places.clear();
            this.travelToEdit = undefined;
          },
          error: (err) => console.log(err),
        });
      } else {
        this.travelService.addTravel(travelData).subscribe({
          next: async (createdTravel: any) => {
            const travelDetailId = createdTravel.id;

            for (const placeData of this.places.value) {
              placeData.travelDetailId = travelDetailId;
              try {
                await firstValueFrom(this.placeService.addPlace(placeData));
                console.log('Место добавлено:', placeData.name);
              } catch (err) {
                console.error('Ошибка при добавлении места:', err);
              }
            }

            this.travelForm.reset();
            while (this.places.length !== 0) {
              this.places.removeAt(0);
            }
            this.travelService.refreshList();
          },
          error: (res) => {
            console.log(res);
          },
        });
      }
    }
  }
}
