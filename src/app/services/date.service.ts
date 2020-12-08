import {Injectable} from "@angular/core";
import * as moment from "moment";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())
  public x: number = 1

  changeMonth(count: number) {
    console.log(this.date)
    const value = this.date.value.add(count, 'month')
    this.date.next(value)
    this.x = this.x +1
  }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    })
    this.date.next(value)
  }
}
