import { Component } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  identifiant: string | undefined;
  motdepasse: string | undefined;

  onSubmit() {
    // Ajouter le code de connexion ici
    console.log("Nom d'utilisateur : ", this.identifiant);
    console.log("Mot de passe : ", this.motdepasse);
  }
}
