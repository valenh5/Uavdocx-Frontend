import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
<<<<<<< HEAD

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));

  
=======
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
>>>>>>> abmPrenda
