import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { Todo, TodosService } from '../../shared/services/todos.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  minDate: Date;

  @ViewChild('formDir') private formDir: NgForm;
  @ViewChild('inputEl') private inputEl: ElementRef;

  addForm = this.fb.group({
    title: ['', [Validators.maxLength(100), Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private todosService: TodosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  addTodo() {
    const todo: Todo = {
      userId: 1,
      title: this.addForm.get('title').value,
      id: Date.now(),
      completed: false,
      date: new Date(),
    };

    this.todosService.addTodo(todo);
    this.resetForm();
    this.dialogRef.close();
  }

  resetForm(): void {
    this.inputEl.nativeElement.blur();
    this.formDir.resetForm();

    this.addForm.reset();
    this.addForm.updateValueAndValidity();
  }
}
