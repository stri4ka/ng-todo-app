import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../services/todos.service';

@Pipe({
  name: 'todoCompleted',
})
export class TodoCompletedPipe implements PipeTransform {
  transform(todos: Todo[], filter: string): Todo[] {
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
