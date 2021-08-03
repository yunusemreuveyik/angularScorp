import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { appState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class TranslatingService {

  constructor(private translate: TranslateService,
    private store: Store<{appStateOBJ:appState}>) {}
     setLanguage(lang:string){
            this.translate.use(lang)
     }
}
