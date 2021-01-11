import { Component, OnInit, Output, EventEmitter } from '@angular/core';

type User = {
        username: string,
        email: string,
        name: string,
        surname: string,
        dni: string,
        birthDate: string,
        carPlate: string,
        environmentClass: string
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Output() isUserLogged: EventEmitter<any> = new EventEmitter<any>();

   loggedUser: boolean = false ;
   userLoginInfo : User  = {
                    "username": "sunil_shrestha" ,
                    "email": "sunilazurevm@gmail.com",
                    "name": "Sunil" ,
                    "surname": "Shrestha",
                    "dni": "x8312014k",
                    "birthDate": "1996-02-29",
                    "carPlate": "7673HFF",
                    "environmentClass": "ECO"
                    } ;
  constructor() { }

  ngOnInit(): void {

  }
  login(): void{
      this.loggedUser = true ;
      this.isUserLogged.emit({isUserLogged: true, loggedUserInfo: this.userLoginInfo}) ;
  }
  logout(): void{
      this.loggedUser = false  ;
      this.isUserLogged.emit(false)
  }


}
