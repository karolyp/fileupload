import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistrationService} from '../_services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    recaptcha: [null, Validators.required]
  });
  registrationInProgress = false;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.registrationForm.get('email');
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onStrengthChanged($event: number) {
    console.log($event);
  }

  onSubmit() {
    // const snackBarRef = this.snackBar.open('Message archived');
    this.registrationInProgress = true;
    this.registrationService.registerUser(this.registrationForm.value)
      .subscribe(res => {
        this.registrationInProgress = false;
      });
  }
}
