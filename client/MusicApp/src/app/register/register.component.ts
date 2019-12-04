import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log("Worked");
    var email = (<HTMLInputElement>document.getElementById("username")).value;
    var password = (<HTMLInputElement>document.getElementById("pass")).value;

//input sanitation
    if (email!== "undefined") {
          let lastAtPos = email.lastIndexOf('@')
          let lastDotPos = email.lastIndexOf('.');
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
              document.getElementById("error").innerHTML = "Username contains illegal characters";
              return false;
          }
        }
        else{
          document.getElementById("error").innerHTML = "Invalid username!";
          return false;
        }
    const http = new XMLHttpRequest;
    const url = "http://localhost:1234/user/register";
    http.open("POST", url);
    let body = new URLSearchParams();

    body.append("username", email);
    body.append("password", password);
    http.send(body);


  //  http.onreadystatechange = () =>{
    //  if(http.status == 200){
        //this.newService.active = true;
      //  window.location.href = "http://localhost:4200/";
        //document.getElementById("error").innerHTML = "User was signed in";
        //document.getElementById("error").style.color = "green";
//    }
}
}
