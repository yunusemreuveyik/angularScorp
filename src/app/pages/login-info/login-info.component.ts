import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userinfo } from 'src/app/models/userinfo';
import { updateUser } from 'src/app/state/app.actions';
import { getUserInfo } from 'src/app/state/app.selectors';
import { appState } from 'src/app/state/app.state';
import { LoginComponent, dataModel } from '../login/login.component';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent implements OnInit {
  email$: Observable<any>
  constructor(private store: Store<{appStateOBJ:appState}>,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModel) { }

  ngOnInit(): void {
   this.email$ = this.store.select(getUserInfo)
  }

  logout(){
    let user: userinfo = {
      email:"",
      name:"",
      password:"",
      title:""
    }
    this.store.dispatch(updateUser({user: user}))
    this.dialogRef.close();
  }
}
