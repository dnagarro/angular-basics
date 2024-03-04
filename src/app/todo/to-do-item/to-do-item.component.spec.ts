import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemComponent } from './to-do-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTodoItemComponent } from '../add-todo-item/add-todo-item.component';
import { FormsModule } from '@angular/forms';

describe('ToDoItemComponent', () => {
  let component: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule 
      ],
      declarations: [
        ToDoItemComponent,
        AddTodoItemComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToDoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
