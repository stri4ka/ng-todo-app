import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IForm } from '../../shared/interfaces/IForm';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string;
  addForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder
  ) {
    this.addForm = fb.group({
      title: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  save() {
    const result: IForm = {
      title: this.addForm.get('title').value,
    };
    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }
}
