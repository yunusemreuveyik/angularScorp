import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { countries } from '../models/countries';
import { languages } from '../models/languages';
import { Store } from '@ngrx/store';
import { appState } from '../state/app.state';
import { changeLanguage, updateUser } from '../state/app.actions';
import { TranslatingService } from '../services/translatingService.service';
import { userinfo } from '../models/userinfo';
import { getLanguage, getUserInfo } from '../state/app.selectors';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../pages/login/login.component';
import { LoginInfoComponent } from '../pages/login-info/login-info.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  selectedLang: string;
  languages: Array<languages> = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "Englsh" },
  ]
  userinfo$: Observable<userinfo>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isUserExist: boolean;
  modalData: any;
  currentRoute: any;
  currentPage$: Observable<any>
  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<{ appStateOBJ: appState }>,
    private translatingService: TranslatingService,
    private dialog: MatDialog,
    private router: Router) {
    this.currentPage$ = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd));
  }

  ngOnInit() {
    this.store.select(getLanguage).subscribe(res => {
      this.selectedLang = res
    })
    this.userinfo$ = this.store.select(getUserInfo)
  }
  openLoginModal() {
    var dialogOBJ = this.dialog.open(LoginComponent, {
      data: this.modalData,
      maxWidth: "unset",
      panelClass: "myDialogCSS",
    })

    dialogOBJ.afterClosed().subscribe((result) => {
      if (result != undefined) {
        console.log(`Dialog result:`, result);

        this.store.dispatch(updateUser({ user: result }))

      }
    });
  }

  openProfileInfoModal() {
    var dialogOBJ = this.dialog.open(LoginInfoComponent, {
      data: this.modalData,
      maxWidth: "unset",
      panelClass: "myDialogCSS",
    })

    dialogOBJ.afterClosed().subscribe((result) => {
      if (result != undefined) {
        console.log(`Dialog result:`, result);
      }
    });
  }

  changeLanguage() {
    this.store.dispatch(changeLanguage({ lang: this.selectedLang }))
    this.store.select(getLanguage).subscribe(res => {
      console.log('data: ', res);
      this.translatingService.setLanguage(res)
    })
  }
  deleteSlash(routeLink: string) {
    var s2 = "";
    if (routeLink != null) {
      s2 = routeLink.substring(1);
    }

    if(s2=="home"){
      s2 = "scorp"
    }

    return s2
  }

}
