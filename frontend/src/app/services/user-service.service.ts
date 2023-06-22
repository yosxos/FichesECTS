import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespI, UserI } from '../modeles/user-i';
import { Auth } from 'aws-amplify';
import { Form } from '@angular/forms';
import { FormationI } from '../modeles/formation-i';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  users: UserI[] = [];
  user: UserI = <UserI>{};
  idToken: string = "";
  constructor(private httpClient: HttpClient) {
    Auth.currentSession().then(data => {
      this.idToken = 'Bearer ' + data.getIdToken().getJwtToken();
    })
      .catch((error) => {
        console.log("token not found");
      });
  }
  async getUserById(id:string) {
    await this.httpClient
      .get<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users', { params: { id: id } })
      .subscribe((userData: any) => {
        if (userData.length === 0) {
          throw new Error('User not found'); // Throw an error if user is not found
        }
        this.user.userId = userData[0].id;
        this.user.name = userData[0].name;
        this.user.prenom = userData[0].prenom;

        this.httpClient
          .get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/admin', { params: { id: this.user.userId } })
          .subscribe((adminData: any[]) => {
            if (adminData.length !== 0) {
              this.user.status = 'admin';

            } else {
              this.httpClient
                .get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation', { params: { id: this.user.userId } })
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

                    this.user.status = responsableObj;
                  }
                  else {
                    this.user.status = 'default';
                  }

                });
            }
          });
      });
    ;
  }
  async GetUsers() {
    this.users = [];
    await this.httpClient
      .get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/users')
      .subscribe((userData: any[]) => {
        if (userData.length === 0) {
          throw new Error('No Users  found'); // Throw an error if user is not found
        }
        for(const user of userData){
          const userObj: UserI = {
            userId: user.id,
            name: user.name,
            prenom: user.prenom,
            status: 'default',
          };
          this.httpClient.get<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/admin', { params: { id: userObj.userId } })
          .subscribe((adminData: any) => {
            if (adminData.length !== 0) {
              userObj.status = 'admin';
              this.users.push(userObj);
            }else {
              this.httpClient.get<any[]>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation', { params: { id: userObj.userId} })
              .subscribe((responsableData: any[]) => {
                if (responsableData.length !== 0) {
                  const responsableObj: RespI = {
                    formations: [],
                  };
                  for (const responsable of responsableData) {
                    this.httpClient.get<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formation', { params: { id: responsable.id_formation } })
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
                  userObj.status = responsableObj;
                  this.users.push(userObj);
                }
                else
                {
                  this.users.push(userObj);
                }
              });
            }


      });
  }

});
}
async addFormationsToResponsable(id: number, formation: FormationI) {
  const url = 'https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation/edit';
  const id_formation = formation.id;
  const body = {
    id_user: id,
    id_formation: id_formation,
  };
  const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
  return this.httpClient.post(url, body, { headers });
}
async deleteFormationsToResponsable(id: number, formation: FormationI) {
  const url = 'https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/responsableFormation/edit';
  const id_formation = formation.id;
  const body = {
    id_user: id,
    id_formation: id_formation,
  };
  const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
  return this.httpClient.request('delete', url, { headers, body });
}

}