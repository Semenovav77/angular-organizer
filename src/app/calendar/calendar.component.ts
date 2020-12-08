import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {DateService} from "src/app/services/date.service";

interface IDay {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}
interface IWeek {
  days: IDay[]
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: IWeek[]

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(currentMonth: moment.Moment) {
    const startDay = currentMonth.clone().startOf('month').startOf('week')
    const endDay = currentMonth.clone().endOf('month').endOf('week')
    const date = startDay.clone().subtract(1, 'day')
    const calendar = []
    while (date.isBefore(endDay,'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !currentMonth.isSame(value, 'month')
            const selected = currentMonth.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }
    this.calendar = calendar
  }

  select(day: IDay) {
    this.dateService.changeDate(day.value)
  }
}
