import { Component, OnInit, Input } from '@angular/core';
import { couponsInfo } from '../../assets/coupons/coupons';

import { navPages } from '../sidebar/sidebar.component' ;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() currentPage: navPages =  {id: "", name: "", title: "",  path: "#", iconClass: "", isActive: false, isVisible: false} ;

  couponsLists = couponsInfo ;
  constructor() {

  }

  ngOnInit(): void {

  } 

}
