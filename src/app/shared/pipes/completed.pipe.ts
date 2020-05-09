import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../services/todos.service';

@Pipe({
  name: 'completed',
})
export class CompletedPipe implements PipeTransform { // it's not better name
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
