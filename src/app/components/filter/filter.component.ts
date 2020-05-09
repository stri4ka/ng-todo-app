import { Component, Output, EventEmitter } from '@angular/core';
import { Todo, TodosService } from '../../shared/services/todos.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public completedFilter: string;
  public todos: Todo[];

  @Output() completedFilterEvent = new EventEmitter<string>();

  constructor(public todosService: TodosService) {}

  onCompletedFilterChange(): void {
    this.completedFilterEvent.emit(this.completedFilter);
  }
}
