import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  @Input() couponText: string = '' ;
  @Input() couponLogoUrl: string = '' ;
  constructor() { }

  ngOnInit(): void {
  }

}
