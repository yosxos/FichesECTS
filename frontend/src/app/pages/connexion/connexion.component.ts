import { Component } from '@angular/core';
import { UserI } from 'src/app/modeles/user-i';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  userId={email: "", password: ""} ;
  error?: string| null =null;

  constructor(public authService:AuthService) { }

  public async check(){
    try {
      await this.authService.signIn(this.userId.email, this.userId.password);
    } catch (error: any)     {
      if(error.code =='UserNotConfirmedException')
      {
        this.error= "Validate your email Id";
      }
      if(error.code =='UserNotFoundException')
      {
        this.error= error.message;
      }
      this.error= error.message;
      console.log(error);
   }

  }


}
