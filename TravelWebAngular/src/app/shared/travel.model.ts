import { Place } from './place.model';

export class Travel {
  id?: number = 0;
  city: string = '';
  image: string = '';
  description: string = '';
  dateTimeStart: Date = new Date();
  dateTimeEnd: Date = new Date();
  cost: number = 0;
  places: Place[] = [];
}
