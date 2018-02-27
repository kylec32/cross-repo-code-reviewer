import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-control',
  templateUrl: './login-control.component.html',
  styleUrls: ['./login-control.component.css']
})
export class LoginControlComponent implements OnInit {

  username:string = "";
  password:string = "";

  constructor() { }

  ngOnInit() {
  }

  login() {
    alert(this.username + " " + this.password);
  }

}
