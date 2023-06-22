import { Component, OnDestroy } from '@angular/core';
import { UserI, RespI } from 'src/app/modeles/user-i';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { FormationI } from 'src/app/modeles/formation-i';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnDestroy  {
  users: UserI[] = [];
  filteredUsers: UserI[] = [];
  selectedUser: UserI | null = null;
  selectedUserFormations: RespI['formations'] = [];
  formations: FormationI[] = [];
  filtredFormations: FormationI[] = [];
  
  constructor(private userService: UserServiceService, private formationService: FormationGetService) {}

  async ngOnInit() {
    await this.userService.GetUsers();
    this.users = this.userService.users;
    this.filteredUsers = this.users; // Initialize filtered users to all users
    this.formations=this.formationService.listeFormations;

  }

  filterUsers(category: string) {
    if (category === 'admin') {
      this.filteredUsers = this.users.filter(user => user.status === 'admin');
    } else if (category === 'responsable') {
      this.filteredUsers = this.users.filter(user => user.status !== 'default' && user.status !== 'admin');
    } else if (category === 'default') {
      this.filteredUsers = this.users.filter(user => user.status === 'default');
    } else if(category === 'all') {
      this.filteredUsers = this.users;
    }
    this.selectedUser = null; // Clear the selected user when filtering users
  }
  

  selectUser(user: UserI) {
    this.selectedUser = user;
    if (user.status instanceof Object) {
      this.selectedUserFormations = user.status.formations;
      // filter the formation that the user already have
      this.filtredFormations = this.formations.filter(formation => !this.selectedUserFormations.some(f => f.id === formation.id));
    } else {
      this.selectedUserFormations = [];
      this.filtredFormations = this.formations;
    }
  }
  async addFormation(formation: FormationI) {
    if (this.selectedUser) {
      try {
        await (await this.userService.addFormationsToResponsable(this.selectedUser.userId, formation)).toPromise();
        console.log('Formations added successfully');
        this.selectedUserFormations.push(formation);
        this.filtredFormations = this.filtredFormations.filter(f => f.id !== formation.id);
      } catch (error) {
        console.error('Failed to add formations:', error);
      }
    }
  }
  async removeFormation(formation: FormationI) {
    if (this.selectedUser) {
      try {
        await (await this.userService.deleteFormationsToResponsable(this.selectedUser.userId, formation)).toPromise();
        console.log('Formations removed successfully');
        this.selectedUserFormations = this.selectedUserFormations.filter(f => f.id !== formation.id);
        this.filtredFormations.push(formation);
      } catch (error) {
        console.error('Failed to remove formations:', error);
      }
    }
  }
  
  ngOnDestroy() {
    this.users = [];
    this.filteredUsers = [];
    this.selectedUser = null;
    this.selectedUserFormations = [];
    this.formations = [];
    this.filtredFormations = [];
  }
}


