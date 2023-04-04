import { Component } from '@angular/core';
import { UserI } from 'src/app/modeles/user-i';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  userId={email: "", password: ""} ;

  constructor(public authService:AuthServiceService) { }


  check(mail: string, password: string){
    this.authService.signIn(mail, password);
  }
  
}
