import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoItemComponent } from './add-todo-item.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

describe('AddTodoItemComponent', () => {
  let component: AddTodoItemComponent;
  let fixture: ComponentFixture<AddTodoItemComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['addToDo']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [AddTodoItemComponent],
      imports: [FormsModule],
    providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTodoItemComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert Name is required.', () => {
    component.toDoItem.Name = '';
    component.toDoItem.Details = 'Task details';
    spyOn(window, 'alert'); // Spy on the alert function
    component.submitForm();
    expect(window.alert).toHaveBeenCalledWith('Name is required.'); // Ensure alert was not called
  });

  it('should alert Details is required.', () => {
    component.toDoItem.Name = 'Name';
    component.toDoItem.Details = '';
    spyOn(window, 'alert'); // Spy on the alert function
    component.submitForm();
    expect(window.alert).toHaveBeenCalledWith('Details is required.'); // Ensure alert was not called
  });

  it('should add to-do and navigate to /items when from is valid', () => {
    component.toDoItem.Name = 'Name';
    component.toDoItem.Details = 'Details';
    dataService.addToDo.and.returnValue(true);
    
    component.submitForm();
    
    expect(dataService.addToDo).toHaveBeenCalledWith(component.toDoItem);
    expect(router.navigate).toHaveBeenCalledWith(['/items']);
  });
});
