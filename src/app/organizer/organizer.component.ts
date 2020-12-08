import { Component, OnInit } from '@angular/core';
import {DateService} from "src/app/services/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask, TasksService} from "src/app/services/tasks.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: ITask[] =[]
  constructor(private dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe( tasks => {
      this.tasks = tasks
    })
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }
    this.tasksService.create(task).subscribe(task => {
      console.log('New task:', task)
      this.tasks.push(task)
      this.form.reset()
    }, err => console.log(err))
  }
   remove(task: ITask) {
      this.tasksService.remove(task).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      }, err => console.log(err))
   }
}
