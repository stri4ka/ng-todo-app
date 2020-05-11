import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../../shared/interfaces/ITodo';

@Pipe({
  name: 'todosSearch',
})
export class TodosSearchPipe implements PipeTransform {
  transform(todos: ITodo[], search: string = ''): ITodo[] {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}
