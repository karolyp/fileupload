import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoginService} from './_services/login.service';
import {RegistrationService} from './_services/registration.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './_services/token-interceptor.service';
import {AuthService} from './_services/auth.service';
import {NotLoggedInGuard} from './not-logged-in.guard';
import {UploadComponent} from './upload/upload.component';
import {DragNDropDirective} from './drag-n-drop.directive';
import {MyFilesComponent} from './my-files/my-files.component';
import {NgxFilesizeModule} from 'ngx-filesize';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UploadComponent,
    DragNDropDirective,
    MyFilesComponent,
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
    }),
    NgxFilesizeModule
  ],
  providers: [
    LoginService,
    RegistrationService,
    AuthService,
    AuthGuard,
    NotLoggedInGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
