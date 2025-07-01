import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placeUrl: string = environment.apiBaseUrl + '/PlaceModels';
  placeForm: Place = new Place();
  constructor(private http: HttpClient) {}

  addPlace() {
    return this.http.post(this.placeUrl, this.placeForm);
  }
  updatePlace(id: number, place: Place) {
    return this.http.put(this.placeUrl + '/' + id, place);
  }
  deletePlace(id: number) {
    return this.http.delete(this.placeUrl + '/' + id);
  }
}
