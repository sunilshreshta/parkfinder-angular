import { Component } from '@angular/core';
import { navPages } from './sidebar/sidebar.component' ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'parkfinder-angular';
  currentPage: navPages =   {id: "pag_home", name: "Home", title: "Park finder", path: "#", iconClass: "fas fa-home", isActive: true, isVisible: true} ;

  pageHandler(page: navPages){
    this.currentPage = page ;
    console.log(this.currentPage) ;
  }
}
