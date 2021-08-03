import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { countries } from '../models/countries';
import { languages } from '../models/languages';
import { Store } from '@ngrx/store';
import { appState } from '../state/app.state';
import { changeLanguage } from '../state/app.actions';
import { TranslatingService } from '../services/translatingService.service';
import { userinfo } from '../models/userinfo';
import { getLanguage } from '../state/app.selectors';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  selectedLang:string;
  languages: Array<languages> = [
    {code: "tr", name:"türkçe"},
    {code: "en", name:"ingilizce"},
  ]
  userinfo$: Observable<userinfo>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isUserExist: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<{appStateOBJ:appState}>,
    private translatingService: TranslatingService) {

    }

    ngOnInit(){
       this.store.select(getLanguage).subscribe(res=>{
         this.selectedLang = res
       })
    }
    changeLanguage(){
       this.store.dispatch(changeLanguage({lang: this.selectedLang}))
      this.store.select(getLanguage).subscribe(res=>{
        console.log('data: ', res);
        this.translatingService.setLanguage(res)
      })
    }

}
