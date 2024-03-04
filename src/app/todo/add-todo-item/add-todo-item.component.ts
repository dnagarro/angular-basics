import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IToDoItem } from '../../shared/models/todoitem';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrl: './add-todo-item.component.css'
})
export class AddTodoItemComponent {

  toDoItem: IToDoItem = {
    Id: 0,
    Name: '',
    Details: ''
  };

  constructor(private router: Router, private dataService: DataService) { }

  submitForm(): void {
    if (this.toDoItem.Name == '') {
      alert('Name is required.');
      return;
    }
    if (this.toDoItem.Details == '') {
      alert('Details is required.');
      return;
    }

    if (this.dataService.addToDo(this.toDoItem)) {
      this.router.navigate(['/items']);
    }
  }
}
