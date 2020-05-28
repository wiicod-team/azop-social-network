import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = {
    phone: '',
    password: ''
  };
  error='';
  loginForm:FormGroup;
  validation_messages={
    username:[
      {
        type:"required",
        message:"Phone number is required"
      },
      {
        type:"minlength",
        message:"Phone number must be greater than 9 caracter"
      },
      {
        type:"maxlength",
        message:"Phone number must be less than 13 caracter"
      }
    ],
    password:[
      {
        type:"required",
        message:"Password is required"
      },
      {
        type:"minlength",
        message:"Password must be greater than 6 caracter"
      }
    ]
  }

  constructor(private router: Router, private auth: AuthService) { 
    this.loginForm= new FormGroup({
      username: new FormControl("",Validators.compose([Validators.required, Validators.minLength(9),Validators.maxLength(13)])),
      password: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]))
    })
  }

  ngOnInit() {
  }

  doLogin(form){
    console.log(this.loginForm.getRawValue());
    
    this.auth.signIn(this.loginForm.getRawValue())
    .then(
      async data => {
        console.log(data);
        this.error='';
      }
    )
    .catch(err => {
      console.log(err);
      this.error=err.message;
    });
  }

}
