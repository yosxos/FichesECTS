import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RespI, UserI } from '../modeles/user-i';
import { Auth, Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: UserI = <UserI>{};
  nom: string = "";
  prenom: string = "";
  connectedUser: boolean = false;
  admin: boolean = false;
  resp: RespI = <RespI>{};

  constructor(public httpClient: HttpClient, public router: Router) { }


  connected() {
    //Auth.currentSession().then(data => this.connectedUser = data.isValid())
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return !!localStorage.getItem('admin');
  }


  public async signIn(email: string, password: string) {
    const user = await Auth.signIn(email, password);
    try {
      await this.UserInDb(user.attributes.family_name, user.attributes.given_name);
      localStorage.setItem('token', (await Auth.currentSession()).getIdToken().getJwtToken())
      this.router.navigateByUrl('/intranet')
    } catch (error) {
      console.log(error);
    }
    return user;
  }
  // sign up with email password from aws amplify and add user in database
  public async signUp(email: string, password: string, family_name: string, given_name: string) {
    try {
      const user = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          family_name: family_name,
          given_name: given_name
        },
      });
      this.nom = family_name;
      this.prenom = given_name;
    } catch (error) {
      console.log(error);
    }
    ;

  }
public async onConfirmSignUp(userName: string, code: string) {
  try {
    await Auth.confirmSignUp(userName, code);
    console.log(this.nom, this.prenom);
    const body = { name: this.nom, prenom: this.prenom };
    console.log(body);
    await this.httpClient
      .post(
        'https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users/edit',
        body // Send the 'body' directly as the request body
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/connexion');
        },
        (error: any) => {
          console.log(error);
        }
      );
  } catch (error) {
    console.log(error);
  }
}





  // sign out with email password from aws amplify
  signOut() {
    Auth.signOut()
      .then(() => console.log("Successfully signed out."))
      .catch(err => console.log(err));
    console.log("test", localStorage.removeItem('token'));
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    
    this.router.navigateByUrl('/')
  }

  //get userId from database and check if user is admin or responsable

  async UserInDb(family_name: string, given_name: string) {
    await this.httpClient
      .get<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users', { params: { name: family_name, prenom: given_name } })
      .subscribe((userData: any) => {
        if (userData.length === 0) {
          throw new Error('User not found'); // Throw an error if user is not found
        }
        localStorage.setItem('userId', userData[0].id.toString());
        this.userId.userId = userData[0].id;
        this.userId.name = userData[0].name;
        this.userId.prenom = userData[0].prenom;
        

        this.httpClient
          .get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/admin', { params: { id: this.userId.userId } })
          .subscribe((adminData: any[]) => {
            if (adminData.length !== 0) {
              this.userId.status = 'admin';
              this.admin = true;
              localStorage.setItem('admin', 'true');

            } else {
              this.httpClient
                .get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation', { params: { id: this.userId.userId } })
                .subscribe((responsableData: any[]) => {
                  if (responsableData.length !== 0) {
                    const responsableObj: RespI = {
                      formations: [],
                    };

                    for (const responsable of responsableData) {
                      this.httpClient
                        .get<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formation', { params: { id: responsable.id_formation.toString() } })
                        .subscribe((formationData: any) => {
                          responsableObj.formations.push({
                            id: responsable.id_formation,
                            parcour: formationData[0].parcour,
                            annee: formationData[0].annee,
                            niveau: formationData[0].niveau,
                            code: formationData[0].code,
                          });
                        });
                    }

                    this.userId.status = responsableObj;
                  }
                  else {
                    this.userId.status = 'default';
                  }

                });
            }
          });
      });
  }

}


