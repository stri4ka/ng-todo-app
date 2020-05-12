import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { BASE_URL } from '../constants';
import { ITodo } from '../interfaces/ITodo';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todos = new BehaviorSubject<ITodo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${BASE_URL}`).pipe(
      tap((todos) => {
        const localTodos: ITodo[] =
          JSON.parse(localStorage.getItem('todos')) ?? [];

        todos.forEach((todo) => {
          if (!localTodos.some((t) => t.id === todo.id)) {
            localTodos.push(todo);
          }
        });
        this.todos.next(localTodos);
        localStorage.setItem('todos', JSON.stringify(localTodos));
      }),
      switchMap(() => this.todos)
    );
  }

  onToggle(id: number) {
    const todos = this.todos.value;
    const idx = this.todos.value.findIndex((t) => t.id === id);
    todos[idx].completed = !todos[idx].completed;
    this.todos.next(todos);
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
  }

  addTodo(todo: ITodo) {
    const todos = this.todos.value;
    todos.push(todo);
    this.todos.next(todos);
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
  }

  updateTodo(todo: ITodo) {
    const todos = this.todos.value;
    const idx = this.todos.value.findIndex((t) => t.id === todo.id);
    todos[idx] = { ...todo };
    this.todos.next(todos);
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
  }

  deleteTodo(id: number) {
    this.todos.next(this.todos.value.filter((t) => t.id !== id));
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
  }
}
