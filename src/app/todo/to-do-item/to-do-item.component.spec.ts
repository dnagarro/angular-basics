import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemComponent } from './to-do-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTodoItemComponent } from '../add-todo-item/add-todo-item.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { IToDoItem } from '../../shared/models/todoitem';

describe('ToDoItemComponent', () => {
  let component: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getToDo']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        ToDoItemComponent,
        AddTodoItemComponent,
      ],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    })
      .compileComponents();

      fixture = TestBed.createComponent(ToDoItemComponent);
      component = fixture.componentInstance;
      dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set todoItems on initialization', () => {
    const mockTodoItems: IToDoItem[] = [{ Details: "details", Name: "Name", Id: 1 }];

    // Set up the spy to return mock data when getToDo is called
    dataService.getToDo.and.returnValue(mockTodoItems);

    // Call ngOnInit
    component.ngOnInit();

    // Check if todoItems is set correctly
    expect(component.todoItems).toEqual(mockTodoItems);

    // Check if getToDo method was called
    expect(dataService.getToDo).toHaveBeenCalled();
  });

});
