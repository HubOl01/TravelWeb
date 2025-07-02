import { Component, inject, OnInit } from '@angular/core';
import { TravelForm } from './travel-form/travel-form';

import { MatListModule } from '@angular/material/list';
import { TravelService } from '../shared/travel';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Travel } from '../shared/travel.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-travels',
  imports: [
    TravelForm,
    MatListModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './travels.html',
  styles: ``,
  styleUrl: './travels.css',
})
export class Travels implements OnInit {
  private _snackBar = inject(MatSnackBar);
  selectedTravel?: Travel;

  constructor(public service: TravelService) {}
  ngOnInit(): void {
    this.service.refreshList();
  }
  onEditTravel(travel: Travel) {
    this.selectedTravel = { ...travel };
  }

  onDeleteTravel(id: number) {
    if (confirm('Вы хотите удалить текущий объект?'))
      this.service.deleteTravel(id).subscribe({
        next: (res) => {
          this.service.list = res as Travel[];
          this._snackBar.open('Удаление успешно завершено!', 'Ок');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
