import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/user-i';
import { Auth } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userId: UserI = <UserI>{};

  constructor(public httpClient: HttpClient, private router: Router ) { }

  login(username: string, password: string) {
    this.httpClient.get<UserI>('assets/id/userId.json').subscribe(
      (data) => {
        this.userId = data;
        if (this.userId.email == username && this.userId.password == password) {
          this.userId.status = "actif";
          this.router.navigateByUrl('/intranet');
        }
      }
    )
  }
  // sign in with email password from aws amplify
  signIn(email: string, password: string) {
    Auth.signIn(email, password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }
  // sign out with email password from aws amplify
  signOut() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }


}
