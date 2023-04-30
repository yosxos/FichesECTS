import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiche-ects-project';
}

