import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) { 
    
  }
  
  isAuthenticated(){
    Auth.currentAuthenticatedUser({
      bypassCache: false  
      // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user) => {
      if(user.username!=''){
        console.log('Username: ' + user.username);
        this.router.navigateByUrl('/tabs/tabs/tab1');
      }
    }).catch(err => {
      console.log(err);
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit() {
    this.isAuthenticated();
  }

}
