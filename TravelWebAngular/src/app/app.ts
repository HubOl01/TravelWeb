import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Travels } from './travels/travels';

@Component({
  selector: 'app-root',
  imports: [Travels],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected title = 'TravelWebAngular';
}
