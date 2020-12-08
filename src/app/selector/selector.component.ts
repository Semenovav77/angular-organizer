import { Component, OnInit } from '@angular/core';
import {DateService} from "src/app/services/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
  }

  go(count: number) {
    this.dateService.changeMonth(count)
  }
}
