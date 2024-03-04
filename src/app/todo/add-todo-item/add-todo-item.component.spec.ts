import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoItemComponent } from './add-todo-item.component';
import { FormsModule } from '@angular/forms';

describe('AddTodoItemComponent', () => {
  let component: AddTodoItemComponent;
  let fixture: ComponentFixture<AddTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoItemComponent],
      imports: [FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
