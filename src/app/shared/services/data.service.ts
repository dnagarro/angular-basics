import { Injectable } from "@angular/core";
import { IToDoItem } from "../models/todoitem";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    iToDoItems: IToDoItem[] =
        [
            {
                "Id": 1,
                "Details": "details",
                "Name": "Name"
            },
            {
                "Id": 2,
                "Details": "details2",
                "Name": "Name2"
            }
        ];


    getToDo(): IToDoItem[] {
        return this.iToDoItems;
    }

    addToDo(iToDoItem: IToDoItem): boolean {
        const maxId = this.iToDoItems.reduce((max, item) => (item.Id > max ? item.Id : max), 0);
        const newId = maxId + 1;

        this.iToDoItems.push({
            Details: iToDoItem.Details,
            Id: newId,
            Name: iToDoItem.Name
        });

        return true;
    }
}