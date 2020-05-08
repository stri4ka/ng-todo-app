import { Component } from '@angular/core';
import { TodosService } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  public loading: boolean = true;
  public searchString = '';
  public isEditing = false;
  completedFilter: string = 'all';

  constructor(public todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe(() => {
      this.loading = false;
    });
  }

  onChange(id: number) {
    this.todosService.onToggle(id);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  handleEdit(id: number): void {
    this.isEditing = true;
  }

  submitEdit(): void {
    this.isEditing = false;
  }

  changeCompletedFilter(value: string): void {
    this.completedFilter = value;
  }

  clearSearch() {
    this.searchString = '';
  }
}
