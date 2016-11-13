import { Component } from '@angular/core';
import { FormGroup,
        FormBuilder,
        FormControl} from '@angular/forms';
import { UserService } from "../../service/user.service";
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: 'client/components/LoginComponent/login.component.html',
    providers: [ UserService ]
})
export class LoginComponent { 
    LoginForm : FormGroup;

    username : FormControl;
    password :FormControl;
    constructor( private LoginFormBuilder :  FormBuilder , private userService :UserService , private router : Router ){
    this.username = new FormControl('');
        this.password = new FormControl('');

        this.LoginForm = this.LoginFormBuilder.group({
            'username' : this.username,
            'password' : this.password
        })
        
    }

    onSubmit() {
    this.userService.login(this.username.value,this.password.value).subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
        location.reload();
        console.log("pass");
      } else {
          console.log(this.username.value);
          console.log(this.password.value);
          
      }
    });
  }


}
