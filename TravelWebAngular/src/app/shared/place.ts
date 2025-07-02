import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placeUrl: string = environment.apiBaseUrl + '/PlaceModels';
  constructor(private http: HttpClient) {}

  addPlace(place: Place) {
    return this.http.post(this.placeUrl, place);
  }
  updatePlace(place: Place) {
    return this.http.put(this.placeUrl + '/' + place.id, place);
  }
  deletePlace(id: number) {
    return this.http.delete(this.placeUrl + '/' + id);
  }
}
