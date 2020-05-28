import { Injectable } from '@angular/core';
import { Attribute } from '@angular/compiler';
import {Auth} from "aws-amplify";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  signUp(credentials:{username:string, password:string, attributes?:{email?:string}}){
    return Auth.signUp(credentials)
  }
  signIn(credentials:{username:string, password:string}){
    return Auth.signIn(credentials)
  }
  resendSignUp(username:string){
    return Auth.resendSignUp(username)
  }
  confirmSignUp(username: string, code: string){
    return Auth.confirmSignUp(username,code,{forceAliasCreation: true})
  }
  signOut(){
    return Auth.signOut({ global: true })
  }
  currentAuthenticatedUser(){
    return Auth.currentAuthenticatedUser({bypassCache: false })
  }
}
