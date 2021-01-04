import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Park Finder" ;
  brandLogoUrl = "../../assets/img/logo.png" ;
  constructor() { }

  ngOnInit(): void {
  }

}
