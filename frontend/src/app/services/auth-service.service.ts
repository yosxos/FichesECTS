import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsableI, UserI } from '../modeles/user-i';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: UserI = <UserI>{};
  connectedUser: boolean= false;
  responsable: ResponsableI = <ResponsableI>{list_formation:[]};

  constructor(public httpClient: HttpClient, public router: Router) { }


  connected() {
    
    //Auth.currentSession().then(data => this.connectedUser = data.isValid())
    return !!localStorage.getItem('token');
  }

async signIn(email: string, password: string) {
  try {
    const user = await Auth.signIn(email, password);
    this.userId.email = user.attributes.email;
    await this.UserInDb(user.attributes.family_name, user.attributes.given_name);
    localStorage.setItem('token', (await Auth.currentSession()).getIdToken().getJwtToken())
    this.router.navigateByUrl('/intranet')
  } catch (error) {
    console.log(error);
  }
}
// sign up with email password from aws amplify and add user in database
  async signUp(email: string, password: string, family_name: string, given_name: string) {
    try {
      // const user = await Auth.signUp({
      //   username: email,
      //   password: password,
      //   attributes: {
      //     email: email,
      //     family_name: family_name,
      //     given_name: given_name
      //   }
      // });
      //console.log({ user });
      this.httpClient.post<{name:string,prenom:string}>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users', { params :{name: family_name, prenom: given_name }})
        .subscribe((data: any) => {
          console.log(data);
        });
      this.router.navigateByUrl('/login')
    } catch (error) {
      console.log(error);
    }
  }


  // sign out with email password from aws amplify
  signOut() {
    Auth.signOut()
      .then(() => console.log("Successfully signed out."))
      .catch(err => console.log(err));
      console.log("test",localStorage.removeItem('token'));
       
      this.router.navigateByUrl('/')
  }

  //get userId from database and check if user is admin or responsable
  async UserInDb(family_name: string, given_name: string) {
    await this.httpClient.get<{id:number,name:string,prenom:string}[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users', { params: { name: family_name, prenom: given_name } })
      .subscribe((userData:{id:number,name:string,prenom:string}[]) => {
        console.log("userData", userData);
        const id: number = userData[0].id;
        console.log("id", id);
        this.httpClient.get('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/admin', { params: { id: id } })
          .subscribe((adminData: any) => {
            console.log(adminData)
            if (adminData.length !== 0) {
              this.userId.status = "admin";
            } else {
              this.httpClient.get('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation', { params: { id_user: id } })
                .subscribe((responsableData: any) => {
                  console.log('responsable',responsableData)
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
}


