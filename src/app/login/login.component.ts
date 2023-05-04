import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private storage: StorageService,
              private router: Router) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(
        this.form.value.username,
        this.form.value.password
      ).subscribe({
        next: data => {
          this.storage.saveToken(data.token);
          this.router.navigate(['trading']).then(() => {
            window.location.reload();
          });
        },
        error: err => {
          this.snackBar.open(err.error.message, "Close");
        }
      });
    }
  }
}
