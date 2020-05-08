import { Component, Input } from '@angular/core';
import { Todo, TodosService } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: Todo;
  public loading: boolean = true;
  public searchString = '';
  public title: string = '';
  oldTodo: Todo;
  isEditing = false;

  constructor(public todosService: TodosService) {}

  ngOnInit() {
    this.title = this.todo.title;
    this.loading = false;
  }

  onChange(id: number) {
    this.todosService.onToggle(id);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  handleEdit(): void {
    this.isEditing = true;
    this.oldTodo = { ...this.todo };
  }

  submitEdit(): void {
    this.isEditing = false;
    this.todo.title = this.title;
    this.todosService.updateTodo(this.todo.id, this.todo);
  }
}
