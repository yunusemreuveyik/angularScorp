import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface dataModel {
  forgotPassword: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  titleVar:string
  nameVar:string
  passwordVar:string
  emailVar:string

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModel,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl("",Validators.required),
      name: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",Validators.required),
    })
  }

  login(data:any){
    console.log('data: ', data);
  }

}
