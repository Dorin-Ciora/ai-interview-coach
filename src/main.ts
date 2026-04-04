import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthStore } from './app/core/auth/store/auth.store';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const authStore = appRef.injector.get(AuthStore);
    authStore.init();
  })
  .catch((err) => console.error(err));
