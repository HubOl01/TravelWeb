import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Travel } from './travel.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  travelsUrl: string = environment.apiBaseUrl + '/TravelDetails';
  list: Travel[] = [];

  constructor(private http: HttpClient) {}
  refreshList() {
    this.http.get(this.travelsUrl).subscribe({
      next: (res) => {
        this.list = (res as Travel[]).map((item) => ({
          ...item,
          dateTimeStart: new Date(item.dateTimeStart),
          dateTimeEnd: new Date(item.dateTimeEnd),
        }));
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  addTravel(travel: Travel) {
    return this.http.post(this.travelsUrl, travel);
  }
  updateTravel(travel: Travel) {
    return this.http.put(this.travelsUrl + '/' + travel.id, travel);
  }
  deleteTravel(id: number) {
    return this.http.delete(this.travelsUrl + '/' + id);
  }
}
