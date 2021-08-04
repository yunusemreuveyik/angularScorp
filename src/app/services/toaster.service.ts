import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { toastTypes } from '../models/toastTypes.enum';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  cancelText: string;
  constructor(private _snackBar: MatSnackBar,
    private translate: TranslateService) { 
      this.translate.get("cancelText").subscribe(res=>{
        this.cancelText = res
      })
  }


  openSnackBar(type: toastTypes, duration:number) {
    switch (type) {
      case toastTypes.loginSuccess:
        this.translate.get("toastMessages.loginSuccess").subscribe(message=>{
          this._snackBar.open(message, this.cancelText, {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: duration * 1000
          });
        })
        
        break;
    
      default:
        break;
    }
    
  }
  
}
