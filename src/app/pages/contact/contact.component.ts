import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { contactRequest } from 'src/app/models/contactRequest';
import { countries } from 'src/app/models/countries';
import { userinfo } from 'src/app/models/userinfo';
import { getLanguage, getUserInfo } from 'src/app/state/app.selectors';
import { appState } from 'src/app/state/app.state';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  userinfo$: Observable<any>
  contactForm: FormGroup
  selectedCountry: any
  countryList: countries[] = [
    { id: "TR", languages: {en: "Turkey", tr:"Türkiye"} },
    { id: "US", languages: {en: "United States of America", tr:"Amerika"} },
    { id: "UK", languages: {en: "United Kingdom", tr:"İngiltere"} },
    { id: "DE", languages: {en: "Germany", tr:"Almanya"} },
    { id: "SW", languages: {en: "Sweden", tr:"İsveç"} },
    { id: "KE", languages: {en: "Kenya", tr:"Kenya"} },
    { id: "BR", languages: {en: "Brazil", tr:"Brezilya"} },
    { id: "ZW", languages: {en: "Zimbabwe", tr:"Zimbabve"} },
  ]
  email: string;
  name: string;
  filteredOptions: any
  siteLanguage: string;
  constructor(protected fb: FormBuilder,
    private store: Store<{ appStateOBJ: appState }>) { }

  ngOnInit(): void {
    this.store.select(getLanguage).subscribe(res=>{
      this.siteLanguage = res
    })
    this.filteredOptions = this.countryList

    this.userinfo$ = this.store.select(getUserInfo)
    this.userinfo$.subscribe((res: userinfo) => {
      console.log('data: ', res);

      this.email = res.email
      this.name = res.name

      this.contactForm = this.fb.group({
        title: new FormControl("", Validators.required),
        message: new FormControl("", Validators.required),
        name: new FormControl(this.name, Validators.required),
        phone: new FormControl("", Validators.required),
        country: new FormControl("", Validators.required),
        email: new FormControl(this.email, [Validators.required, Validators.email]),
      })
      this.contactForm.get("country")!.valueChanges.subscribe(res => {
        console.log(res)
        this.filterData(res)
      })

    })
  }

  private filterData(value: any) {
   if(typeof(value)=="object"){ //bir seçim yaptığımızda string yerine obje geldiği için bozuyodu, bu kontrolü ekledim

   }else{
    const filterValue = value.toLowerCase()
    this.filteredOptions = this.countryList.filter((option:any) => option.languages[this.siteLanguage]?.toLowerCase().includes(filterValue))
   }
  }

  displayFn = (value:any) => {

    if(value==""){
      return undefined
    }else{
      console.log('subject: ', value.languages[this.siteLanguage]);

      return value ? value.languages[this.siteLanguage] : undefined
    }
      
  }
  send() {
    var request: contactRequest = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phonenumber: this.contactForm.value.phone,
      country_code: this.contactForm.value.country.id,
      text: this.contactForm.value.message
    }
    console.log('data: ', request);
  }
}
