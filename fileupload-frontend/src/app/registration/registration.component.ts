import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
}
