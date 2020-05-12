import { Pipe, PipeTransform } from '@angular/core';

import { ITodo } from '../../shared/interfaces/ITodo';

@Pipe({
  name: 'todoCompleted',
})
export class TodoCompletedPipe implements PipeTransform {
  transform(todos: ITodo[], filter: string): ITodo[] {
    switch (filter) {
      case 'all':
        return todos;

      case 'completed':
        return todos.filter((todo) => todo.completed);

      case 'active':
        return todos.filter((todo) => !todo.completed);

      default:
        return todos;
    }
  }
}
