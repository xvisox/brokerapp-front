import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.register(
        this.form.value.username,
        this.form.value.password
      ).subscribe({
        next: data => {
          this.snackBar.open(data.message, "Close");
        },
        error: err => {
          this.snackBar.open(err.error.message, "Close");
        }
      });
    }
  }
}
