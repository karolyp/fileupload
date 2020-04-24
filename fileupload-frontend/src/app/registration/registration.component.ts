import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RegistrationService} from '../_services/registration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar, private router: Router) {
  }

  get email() {
    return this.registrationForm.get('email');
  }

  @ViewChild('passwordValidator')
  passwordValidator: any;

  registrationForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    recaptcha: [null, Validators.required]
  });
  registrationInProgress = false;
  registered = false;

  private SNACKBAR_DURATION = 5000;

  ngOnInit(): void {
  }

  stopProgressBar() {
    this.registrationInProgress = false;
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.registrationInProgress = true;
    const email = this.registrationForm.get('email').value;
    const password = this.passwordValidator.passwordFormControl.value;

    this.registrationService.registerUser({email, password}).subscribe(
      res => {
        this.registered = true;
        this.stopProgressBar();
        const snackbarRef = this.snackBar.open('Sikeres regisztráció, átirányítás a bejelentkezéshez...', 'Bezár', { // TODO: i18n
          duration: this.SNACKBAR_DURATION
        });
        snackbarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error => {
        this.stopProgressBar();
        this.registrationForm.get('recaptcha').reset();
        if (error.status === 409) {
          this.snackBar.open('Sikertelen regisztráció, az e-mail cím már regiszrálva van.', 'Bezár', { // TODO: i18n
            duration: this.SNACKBAR_DURATION
          });
        } else {
          this.snackBar.open('Hiba a kiszolgálóval, kérlek próbáld újra.', 'Bezár', { // TODO: i18n
            duration: this.SNACKBAR_DURATION
          });
        }
      },
    );
  }
}
