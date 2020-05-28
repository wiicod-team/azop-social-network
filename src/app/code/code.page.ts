import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  code={
    "username":'',
    "code":''
  }
  error='';
  codeForm:FormGroup;
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
    code:[
      {
        type:"required",
        message:"Code is required"
      },
      {
        type:"minlength",
        message:"Code must be greater than 6 caracter"
      }
    ]
  }

  constructor(private router:Router, private auth: AuthService) { 
    this.codeForm= new FormGroup({
      username: new FormControl("",Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(13)])),
      code: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]))
    })
  }

  ngOnInit() {
  }

  verificationCode(form){
    console.log(this.codeForm.getRawValue())
    this.auth.confirmSignUp(this.codeForm.getRawValue().username, this.codeForm.getRawValue().code)
    .then(
        data => {
          console.log(data);
          this.error='';
          this.router.navigateByUrl('/login');
        }
      )
      .catch(err => {
        console.log(err);
        if(err.code == "UserNotFoundException"){
          this.error="Invalid Phone number";
        }else{
          this.error=err.message;
        }
      });
  
  }
  
  resend(){
    this.auth.resendSignUp(this.codeForm.getRawValue().username)
      .then(() => {
        console.log('code resent successfully');
        this.error='code resent successfully';
      })
      .catch(e => {
        console.log(e);
        this.error=e.message;
      });
  }

}
