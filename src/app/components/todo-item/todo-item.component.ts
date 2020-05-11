import { Component, Input, OnInit } from '@angular/core';
import { TodosService } from '../../shared/services/todos.service';
import { ITodo } from '../../shared/interfaces/ITodo';
import { IForm } from '../../shared/interfaces/IForm';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo;
  searchString = '';
  title = '';
  oldTodo: ITodo;
  isEditing = false;

  constructor(private todosService: TodosService, public dialog: MatDialog) {
    // this.addForm.patchValue({ title: '' });
    // this.dialog.patchValue({ title: this.todo.title });
  }

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

  submitEdit(result: IForm) {
    this.isEditing = false;
    this.todo.title = this.title;
    this.todosService.updateTodo(this.todo);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    // dialogConfig.data = 'title';
    const modal = this.dialog.open(ModalComponent, dialogConfig);

    modal.afterClosed().subscribe((result: IForm) => this.submitEdit(result));
  }

  // openModal(title, dueDate) {
  //   const modal = this.dialog.open(ModalComponent, {
  //     data: {
  //       title,
  //       dueDate,
  //       modalTitle: 'Edit your task',
  //     },
  //   });
  //   modal.afterClosed().subscribe((result: IForm) => this.submitEdit(result));
  // }
}
