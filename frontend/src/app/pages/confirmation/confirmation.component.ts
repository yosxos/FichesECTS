import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(public authService:AuthService) { }
  email: string | null = null;
  password: string | null = null;
  userName:string | null = null;
  error?: string| null =null;
  code?: string | null = null;
  success?: string | null= null;
  public async onConfirmSignUp()
  {
   
      try {
        let username= String(this.email);
        let code =   String(this.code);
        await this.authService.onConfirmSignUp(username,code);
        this.success="You have successfully confirmed your account";
        
      } catch (error: any) {
       
        this.error= error.message;
          console.log('error confirming sign up', error);
      }
  }
}
