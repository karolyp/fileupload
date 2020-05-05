import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../_services/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  loggedIn = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.loginService.loginUser(this.loginForm.value).subscribe(
      res => {
        this.loggedIn = true;
        const snackBarRef = this.snackBar.open('Sikeres bejelentkezés, átirányítás...', 'Bezár', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/my-files']);
        });
      },
      error => {

      }
    );
  }
}
