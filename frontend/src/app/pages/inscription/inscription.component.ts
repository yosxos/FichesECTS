import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  newUser={email: "", password: "", family_name: "", given_name: ""} ;
  error?: string| null =null;
  success?: string | null= null;
  constructor(public authService:AuthService) { }
  public async signUp(){
    try {
    this.error=null;
    this.success=null;
    const user =this.authService.signUp(this.newUser.email, this.newUser.password, this.newUser.family_name, this.newUser.given_name);
    this.success="Check your email for confirmation code";
  }
  catch (error: any)     {
    if(error.code =='UsernameExistsException')
    {
      this.error= "This email already exists";
    }
    if(error.code =='InvalidPasswordException')
    {
      this.error= " Password did not conform with policy";
    }
    this.error= error.message;
    console.log('error signing up:', error);
  }
  }
}
