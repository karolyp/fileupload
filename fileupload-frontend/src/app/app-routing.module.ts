import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from './auth.guard';
import {NotLoggedInGuard} from './not-logged-in.guard';
import {UploadComponent} from './upload/upload.component';
import {MyFilesComponent} from './my-files/my-files.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/login'
  },
  {
    path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]
  },
  {
    path: 'register', component: RegistrationComponent, canActivate: [NotLoggedInGuard]
  },
  {
    path: 'upload', component: UploadComponent, canActivate: [AuthGuard]
  },
  {
    path: 'my-files', component: MyFilesComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
