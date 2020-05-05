import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar) {
    iconRegistry.addSvgIcon('gugli', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/btn_google_dark_normal_ios.svg'));
  }

  get isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    const token = localStorage.getItem('token');
    if (token) {
      const snackbarRef = this.snackBar.open('Kilépés folyamatban...', 'Bezár', { // TODO: i18n
        duration: 2000
      });
      snackbarRef.afterDismissed().subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
    }
  }
}
