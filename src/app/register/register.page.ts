import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { User } from "../../models";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register={
    username:'',
    email:'',
    phone:'',
    password:''
  }
  error='';
  registerForm:FormGroup;
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
    ],
    email:[
      {
        type:"required",
        message:"Email is required"
      },
      {
        type:"pattern",
        message:"Email invalid "
      }
    ]
  }

  constructor(private router:Router, private auth: AuthService) { 
    this.registerForm= new FormGroup({
      username: new FormControl("",Validators.compose([Validators.required, Validators.minLength(9),Validators.maxLength(13)])),
      password: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
      email: new FormControl("",Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    })
  }

  ngOnInit() {
  }

  
  doRegister(form){
    const credentials={
      username:this.register.username, 
      password:this.register.password, 
      attributes:{
        email:this.register.email
      }
    }
    
    this.auth.signUp(this.registerForm.getRawValue())
    .then(
      async (data) => {
        this.error='';
        this.router.navigateByUrl('/code');
      }
    )
    .catch(err => {
      console.log(err);
      this.error=err.message;
    });
  }

}
