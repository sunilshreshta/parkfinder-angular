import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface navPages {
  id: string;
  name: string;
  title: string;
  path: string;
  iconClass: string;
  isActive: boolean;
  isVisible: boolean ;
  }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() navlinkClicked: EventEmitter<any> = new EventEmitter<any>();

  pages: navPages[]= [
          {id: "pag_home", name: "Home", title: "Park finder", path: "#", iconClass: "fas fa-home", isActive: true, isVisible: true},
          {id: "pag_coupons", name: "Coupons", title: "Park finder - Coupons", path: "#", iconClass: "fas fa-tags", isActive: false, isVisible: true },
          {id: "pag_contact", name: "Contact", title: "Park finder - Contact", path: "#", iconClass: "far fa-life-ring", isActive: false, isVisible: true },
          {id: "pag_profile", name: "Profile", title: "Park finder - My Profile", path: "#", iconClass: "far fa-user", isActive: false, isVisible: false }
        ];

  constructor() { }

  ngOnInit(): void {
  }

  goTo(value: navPages) {
    console.log(value) ;
    this.inActiveAllPages() ;
    value.isActive = true ;
    this.navlinkClicked.emit(value);
  }

  inActiveAllPages(): void{
    this.pages.forEach((item) => {
      item.isActive = false ;
    }) ;
  }



}
