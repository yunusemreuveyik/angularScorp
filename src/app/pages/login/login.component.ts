import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { languages } from 'src/app/models/languages';
import { TranslatingService } from 'src/app/services/translatingService.service';
import { changeLanguage } from 'src/app/state/app.actions';
import { getLanguage } from 'src/app/state/app.selectors';
import { appState } from 'src/app/state/app.state';

export interface dataModel {
  forgotPassword: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit  {
  form: FormGroup;
  email:any
  password:any
  title:any
  name:any
  selectedLang:any
  

  languages: Array<languages> = [
    {code: "tr", name:"türkçe"},
    {code: "en", name:"ingilizce"},
  ]

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataModel,
    protected fb: FormBuilder,
    private store: Store<{appStateOBJ:appState}>,
    private translatingService: TranslatingService,) {
     }

  ngOnInit(): void {
    // super.ngOnInit()
    this.form = this.fb.group({
      title: new FormControl("",Validators.required),
      name: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",Validators.required),
    })

    this.store.select(getLanguage).subscribe(res=>{
      this.selectedLang = res
    })
  }

  onSubmit(){
    console.log("form data: ",this.form.value)
     this.dialogRef.close(this.form.value);
  }

  changeLanguage(){
    this.store.dispatch(changeLanguage({lang: this.selectedLang}))
   this.store.select(getLanguage).subscribe(res=>{
     console.log('data: ', res);
     this.translatingService.setLanguage(res)
   })
 }

}
