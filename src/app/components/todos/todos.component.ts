import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit{
  loading = true;
  searchString = '';
  isEditing = false;
  completedFilter = 'all';
  todoList: Todo[];

  constructor(public todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos) => {
      this.loading = false;
      this.todoList = todos;
    });
  }

  changeCompletedFilter(value: string) {
    this.completedFilter = value;
  }

  clearSearch() {
    this.searchString = '';
  }
}
