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
    var email = (<HTMLInputElement>document.getElementById("uname")).value;
    var password = (<HTMLInputElement>document.getElementById("psw")).value;

    const http = new XMLHttpRequest;
    const url = "http://localhost:1234/user/register";
    http.open("POST", url);
    let body = new URLSearchParams();

    body.append("uname", email);
    body.append("psw", password);
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
