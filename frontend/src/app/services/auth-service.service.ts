import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/user-i';

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
}
