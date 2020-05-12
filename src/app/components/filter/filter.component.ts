import { Component, Output, EventEmitter } from '@angular/core';
import { TodosService } from '../../shared/services/todos.service';
import { ITodo } from '../../shared/interfaces/ITodo';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public completedFilter: string;
  public todos: ITodo[];

  @Output() completedFilterEvent = new EventEmitter<string>();

  constructor(public todosService: TodosService) {}

  onCompletedFilterChange(): void {
    this.completedFilterEvent.emit(this.completedFilter);
  }
}
