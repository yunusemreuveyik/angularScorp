import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { countries } from '../models/countries';
import { languages } from '../models/languages';
import { Store } from '@ngrx/store';
import { appState } from '../state/app.state';
import { changeLanguage } from '../state/app.actions';
import { TranslatingService } from '../services/translatingService.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  selectedLang:any="tr";
  languages: Array<languages> = [
    {code: "tr", name:"türkçe"},
    {code: "en", name:"ingilizce"},
  ]
 countryList : Array<countries> = [
    { id: "TR", name: "Turkey" },
    { id: "US", name: "United States of America" },
    { id: "GB", name: "United Kingdom" },
    { id: "DE", name: "Germany" },
    { id: "SE", name: "Sweden" },
    { id: "KE", name: "Kenya" },
    { id: "BR", name: "Brazil" },
    { id: "ZW", name: "Zimbabwe" }
  ]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<{appStateOBJ:appState}>,
    private translatingService: TranslatingService) {}

    changeLanguage(){
       this.store.dispatch(changeLanguage({lang: this.selectedLang}))
      this.store.select("appStateOBJ").subscribe(res=>{
        console.log('data: ', res.language);
        this.translatingService.setLanguage(res.language)
      })
    }

}
