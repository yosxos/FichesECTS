import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsableI, UserI } from '../modeles/user-i';
import { Auth } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userId: UserI = <UserI>{};
  responsable: ResponsableI = <ResponsableI>{};

  constructor(public httpClient: HttpClient, private router: Router) { }


  connected() {
    return this.userId.status ;
  }
  // sign in with email password from aws amplify
  signIn(email: string, password: string) {
    Auth.signIn(email, password)
      .then(user => {
        console.log(user.attributes);
        this.userId.email = user.attributes.email;
        this.UserInDb(user.attributes.family_name, user.attributes.given_name);
      })
      .catch(err => console.log(err));
  }

  // sign out with email password from aws amplify
  signOut() {
    Auth.signOut()
      .then(() => console.log("Successfully signed out."))
      .catch(err => console.log(err));
  }

  //get userId from database and check if user is admin or responsable
  UserInDb(nom: string, prenom: string) {
    this.httpClient.get('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/users', { params: { name: nom, prenom: prenom } })
      .subscribe((userData: any) => {
        console.log(userData)
        const id: number = userData.id;

        this.httpClient.get('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/admin', { params: { id_user: id } })
          .subscribe((adminData: any) => {
            if (adminData.length !== 0) {
              this.userId.status = "admin";
            } else {
              this.httpClient.get('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation', { params: { id_user: id } })
                .subscribe((responsableData: any) => {
                  if (responsableData.length !== 0) {
                    responsableData.forEach((element: { id_user: number, id_formation: number }) => {
                      if (element.id_user === id) {
                        console.log(element.id_formation);
                        this.responsable.list_formation.push(element.id_formation);
                      }
                    });
                    this.userId.status = this.responsable;
                  }
                });
            }
          });
      });
      console.log(this.userId);
  }


  // this.httpClient.get('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/user', { params: { name: nom, prenom: prenom } }).subscribe((data: any) => {
  //  if (data.length == 0) {
  //   this.userId.status = "inconnu";
  //  }
  //else {
  //  this.userId.status = data[0].status;
  // }
  //}


}


