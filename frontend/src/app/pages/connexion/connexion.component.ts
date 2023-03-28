import { Component } from '@angular/core';
import { UserI } from 'src/app/modeles/user-i';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  userId: UserI = <UserI>{};

  constructor(public authService:AuthServiceService) { }


  check(mail: string, password: string){
    this.authService.login(mail, password);
  }

}
