import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { countries } from 'src/app/models/countries';
import { userinfo } from 'src/app/models/userinfo';
import { getUserInfo } from 'src/app/state/app.selectors';
import { appState } from 'src/app/state/app.state';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  userinfo$:Observable<any>
  contactForm:FormGroup
  selectedCountry:any
   countryList: countries[] = [
    { id: "TR", name: "Turkey" },
    { id: "US", name: "United States of America" },
    { id: "GB", name: "United Kingdom" },
    { id: "DE", name: "Germany" },
    { id: "SE", name: "Sweden" },
    { id: "KE", name: "Kenya" },
    { id: "BR", name: "Brazil" },
    { id: "ZW", name: "Zimbabwe" }
  ]
  email: string;
  name: string;
  constructor(protected fb: FormBuilder,
    private store: Store<{appStateOBJ:appState}>) { }

  ngOnInit(): void {
    this.userinfo$ = this.store.select(getUserInfo)
    this.userinfo$.subscribe((res:userinfo)=>{
      console.log('data: ', res);
      
      this.email = res.email
      this.name = res.name

      this.contactForm = this.fb.group({
        title: new FormControl("",Validators.required),
        message: new FormControl("",Validators.required),
        name: new FormControl(this.name,Validators.required),
        phone: new FormControl("",Validators.required),
        email: new FormControl(this.email,[Validators.required, Validators.email]),
      })
    })

    

    

  }
  send(){
    console.log('data: ', this.contactForm.value);
    
  }
  selectCountry(){}
}
