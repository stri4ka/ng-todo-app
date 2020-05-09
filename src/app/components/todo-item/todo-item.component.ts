import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodosService } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  searchString = '';
  title = '';
  oldTodo: Todo;
  isEditing = false;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.title = this.todo.title;
  }

  onChange() {
    this.todosService.onToggle(this.todo.id);
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id);
  }

  handleEdit() {
    this.isEditing = true;
    this.oldTodo = { ...this.todo };
  }

  submitEdit() {
    this.isEditing = false;
    this.todo.title = this.title;
    this.todosService.updateTodo(this.todo);
  }
}
