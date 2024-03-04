import { DataService } from "./data.service";

describe('DataService', () => {
    it('getToDo should return two values', () => {
        const dataService = new DataService();
        var result = dataService.getToDo();
        expect(result.length).toBe(2);
    });

    it('getToDo should return there values after adding a todo item', () => {
        const dataService = new DataService();
        var result = dataService.addToDo({
            Id: 1,
            Name: 'name',
            Details: 'Details'
        });
        var getToDoResult = dataService.getToDo();
        expect(result).toBe(true);
        expect(getToDoResult.length).toBe(3);
    });
});