import { Component } from '@angular/core';
import { UserI, RespI } from 'src/app/modeles/user-i';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { FormationI } from 'src/app/modeles/formation-i';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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

    if (this.selectedUser && this.selectedUser.status instanceof Object) {
      const userFormationsIds = this.selectedUser.status.formations.map(formation => formation.id);
      this.formations = this.formations.filter(formation => !userFormationsIds.includes(formation.id));
    }
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
      this.filtredFormations = this.formations.filter(formation => !this.selectedUserFormations.includes(formation));
    } else {
      this.selectedUserFormations = [];
      this.filtredFormations = this.formations;
    }
  }
  async addFormation(formation:FormationI) {
    if (this.selectedUser) {
      await (await this.userService.addFormationsToResponsable(this.selectedUser!.userId,formation))
        .subscribe(
          response => {
            // Handle success response
            console.log('Formations added successfully');
          },
          error => {
            // Handle error response
            console.error('Failed to add formations:', error);
          }
        );
    };
  }
}


