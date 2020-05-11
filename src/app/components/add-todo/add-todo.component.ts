import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { TodosService } from '../../shared/services/todos.service';
import { ITodo } from '../../shared/interfaces/ITodo';
import { IForm } from '../../shared/interfaces/IForm';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private todosService: TodosService
  ) {}

  ngOnInit() {}

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    // dialogConfig.data = 'title';
    const modal = this.matDialog.open(ModalComponent, dialogConfig);

    modal.afterClosed().subscribe((result: IForm) => this.addTodo(result));
  }

  addTodo(result: IForm) {
    const todo: ITodo = {
      userId: 1,
      title: result.title,
      id: Date.now(),
      completed: false,
      date: new Date(),
      dueDate: result.dueDate,
    };

    this.todosService.addTodo(todo);
  }
}
