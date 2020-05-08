import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private todosService: TodosService) {}

  setItem(query: string, data: any): void {
    localStorage.setItem(query, JSON.stringify(data));
  }

  getItem(query: string): any {
    return JSON.parse(localStorage.getItem(query));
  }
}
