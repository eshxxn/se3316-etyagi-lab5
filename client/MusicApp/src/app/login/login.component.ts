import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  login(){
    var email = (<HTMLInputElement>document.getElementById("uname")).value;
    var password = (<HTMLInputElement>document.getElementById("psw")).value;
    //input sanitation
        if (email!== "undefined") {
              let lastAtPos = email.lastIndexOf('@')
              let lastDotPos = email.lastIndexOf('.');
              if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                  document.getElementById("error").innerHTML = "Username contains illegal characters";
                  return false;
              }
            }
    const http = new XMLHttpRequest;
    const url = "http://localhost:1234/user/login";
    http.open("POST", url);
    let body = new URLSearchParams();

    body.append("username", email);
    body.append("password", password);
    http.send(body);

    http.onreadystatechange = () =>{
      console.log(http);
      if(http.status == 200){
        //this.newService.active = true;
        window.location.href = "http://localhost:4200/";
        document.getElementById("error").innerHTML = "User was signed in";
        document.getElementById("error").style.color = "green";
    }
    if(http.status == 404){
      console.log("Not found");
    }

  }
}
}
