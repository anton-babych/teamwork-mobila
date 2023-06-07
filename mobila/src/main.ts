import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from 'app/routes';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { getEnvironment } from './shared/environments';
import { provideState, provideStore } from '@ngrx/store';
import { ProductEffects, appProductReducer, APP_PRODUCT_FEATURE_KEY } from 'entities/products/model';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

if (getEnvironment().production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),

    //ngrx
    provideStore(),
    provideState(APP_PRODUCT_FEATURE_KEY, appProductReducer),
    provideEffects([ProductEffects]),
    provideStoreDevtools(),
  ],
}).catch((err) => console.error(err));
