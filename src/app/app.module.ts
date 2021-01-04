import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgCarouselComponent,
    FooterComponent,
    CouponsComponent,
    ContentComponent,
    SidebarComponent,
    MapBoxComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  currentPage: string = 'home' ;
  navLinkshandler(value: string): void{
    this.currentPage = value.trim() ; 
  }
}
