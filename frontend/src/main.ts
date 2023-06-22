/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Auth } from '@aws-amplify/auth';
import { AppModule } from './app/app.module';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);
Auth.configure({ ...awsmobile, authenticationFlowType: "USER_PASSWORD_AUTH" });
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
