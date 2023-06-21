import { Component } from '@angular/core';
import { UserI } from 'src/app/modeles/user-i';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  signIn: boolean = true;
  userId={email: "", password: ""} ;
  newUser={email: "", password: "", family_name: "", given_name: ""} ;
  constructor(public authService:AuthService) { }

  switch() {
    this.signIn = !this.signIn;
  }
  check(mail: string, password: string){
    this.authService.signIn(mail, password);
  }
  signUp(mail: string, password: string, family_name: string, given_name: string){
    this.authService.signUp(mail, password, family_name, given_name);
  }

  
}
