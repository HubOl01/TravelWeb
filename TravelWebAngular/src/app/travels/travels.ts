import { Component, OnInit } from '@angular/core';
import { TravelForm } from './travel-form/travel-form';

import { MatListModule } from '@angular/material/list';
import { TravelService } from '../shared/travel';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(public service: TravelService) {}
  ngOnInit(): void {
    this.service.refreshList();
  }
}
