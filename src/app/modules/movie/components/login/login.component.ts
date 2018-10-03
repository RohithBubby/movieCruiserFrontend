import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'movie-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid: string;
  password: string;
  rUserid: string;
  rFirstName: string;
  rLastName: string;
  rPassword: string;
  rConfirmPassword: string;
  invalidCred: string;
  invalidReg: string;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(): void {
    if (!this.userid || !this.password) {
      this.invalidCred = "*All fields are mandotory";
    }
    else {
      this.authService.login(this.userid, this.password).subscribe(obj => {
        this.invalidCred = "";
        let token = JSON.parse(JSON.stringify(obj)).token;
        this.authService.setToken(token);
        this.authService.setUserId(this.userid);
        this.router.navigate(['/movies']);
      }, error => {
        this.invalidCred = "*Invalid Credentials";
        console.error("An Error has occured while logging in.", error);
      });
    }
  }

  register() {
    if(!this.rUserid || !this.rFirstName || !this.rLastName || !this.rPassword || !this.rConfirmPassword){
      this.invalidReg = "*All fields are mandotory";
    }
    else if(this.rPassword != this.rConfirmPassword) {
      this.invalidReg = "*Password doest not match";
    }
    else {
    this.authService.register(this.rUserid, this.rPassword, this.rFirstName, this.rLastName).subscribe(() => {
      this.invalidReg = "";
      this.snackBar.open('User registered successfully', '', {
        duration: 1000
      });
    }, error => {
      console.error("An Error has occured while registering the user.", error);
  });
  }
  }

}
