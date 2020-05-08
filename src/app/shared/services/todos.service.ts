import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { base_URL } from '../constants';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  date?: any;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${base_URL}`).pipe(
      tap((todos) => {
        todos.forEach((element) => {
          localStorage.setItem('todos', JSON.stringify(todos));
          return (this.todos = todos);
        });
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      this.todos = todos;
      return of(todos);
    } else {
      return this.fetchTodos();
    }
  }

  getTodoItem(id: number) {
    if (!this.todos.length) {
      const storageTodos = JSON.parse(localStorage.getItem('todos'));
      this.todos = storageTodos;
    }

    return this.todos.find((x) => x.id === id);
  }

  onToggle(id: number) {
    const idx = this.todos.findIndex((t) => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  updateTodo(id: number, todo: Todo) {
    const idx = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[idx] = { ...todo };
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // handleToggleComplete(event) {
  //   const idx = this.todos.findIndex((t) => t.id === todo.id);
  //   const updatedTodo = {
  //     ...this.todos[idx],
  //     completed: !this.todos[idx].completed,
  //   };
  //   this.todos = [
  //     ...this.todos.slice(0, idx),
  //     updatedTodo,
  //     ...this.todos.slice(idx + 1),
  //   ];
  // }
}
