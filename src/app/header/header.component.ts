import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() userStatusBridge: EventEmitter<any> = new EventEmitter<any>();

  title = "Park Finder" ;
  brandLogoUrl = "../../assets/img/logo.png" ;
  constructor() { }

  ngOnInit(): void {
  }

  notifyUserStatus(value: any){
    this.userStatusBridge.emit(value) ;
    //console.log(value) ; 
  }
}
