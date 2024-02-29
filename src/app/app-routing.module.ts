import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { LoginComponent } from './login/login.component';
import { ToDoItemsGuard } from './shared/services/todo-items.guard';

const routes: Routes = 
[
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'items', canActivate: [ToDoItemsGuard], component: ToDoItemComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
