import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { IToDoItem } from '../shared/models/todoitem';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent implements OnInit {
  todoItems: IToDoItem[] | undefined;
  constructor(private dataService: DataService, private authservice: AuthService) {

  }
  ngOnInit(): void {
    this.todoItems = this.dataService.getToDo();   
  }
}
