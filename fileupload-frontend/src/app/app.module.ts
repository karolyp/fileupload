import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatPasswordStrengthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: http => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
      defaultLanguage: 'hu'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
