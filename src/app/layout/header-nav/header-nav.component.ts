import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {PageInfoService} from '../../services/page-info.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {RouterLinkActive} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

/*
 * header-nav.component.ts
 *
 * This file provides header-nav component.
 *
 * @author: Peter Cai
 * Revised: 12/11/2020 add setPagetype() function
 * Revised: 01/20/2021 add activeUrl and changed header-nav styled
 * Revised: 01/26/2021 delete setPagetype() function
 */

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  showLoginForm = false;
  activeUrl: string;
  currentUser;
  showxMark = false;
  closeToggle = false;
  openNav:Boolean = this.pageInfoService.getNowNav();


  langs:{};
  
  constructor(
    private pageInfoService: PageInfoService,
    public route:ActivatedRoute,
    public router: Router,
    
  ) {
    console.log(this.openNav);
    this.pageInfoService.getNav().subscribe(navStatus => {
      this.openNav = navStatus;
    });
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeUrl = event.url;
      }
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.currentUser = JSON.parse(currentUser);
      }
    })
  }

  ngOnInit(): void {
    this.langs = {
      give:{CN:'捐赠', EN:'Give'},
      newscenter:{CN:'新闻中心',EN:'Newscenter'},
      connect:{CN:'校友联络',EN:'Connect'},
      community:{CN:'校友社区',EN:'Community'},
      merchandise:{CN:'商品', EN:'Merchandise'},
      membership:{CN:'会员',EN:'Membership'},
      about:{CN:'关于',EN:'About'},
      join:{CN:'加入',EN:'Join'},
      user:{CN:'账户',EN:'User'},
      myinfo:{CN:'我的信息',EN:'My infomation'},
      logout:{CN:'登出',EN:'Log out'},
      welcome:{CN:'欢迎,',EN:'Welcome,'},
      help:{CN:'帮助',EN:'Help'},
    }
  }

  logout(): void  {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.closeToggle = !this.closeToggle
  }

  navigation(path: string): void{
    this.router.navigate([path]);
  }

  toggleMenu():void {
    this.pageInfoService.toggleNav();
  }
}


