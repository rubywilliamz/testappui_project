import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProviderService } from '../core/api-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  formSubmiited = false;
  constructor(private fb: FormBuilder,
              private apiProvider: ApiProviderService,
              private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

createLoginForm() {
  this.loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required,Validators.minLength(8),
    ])
  })

}
get form() {
  return this.loginForm.controls;
}


  checkLogin() {
    this.formSubmiited = true;
    const params = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,

    }
    const paramEmail = {
      email: this.loginForm.controls['email'].value,
    }
    if (this.loginForm.valid) {

      this.apiProvider.postData(this.apiProvider.emailCheck, paramEmail).subscribe((res: any) => {
        console.log('data', res)
        if (res.message == 'Email Not exist') {
          
         alert(res.message);
        } else {
          this.apiProvider.postData(this.apiProvider.loginUrl, params).subscribe((resp: any) => {
                console.log('response', resp);
                localStorage.clear();
                localStorage.setItem('token', resp.data.token);
                console.log('ttt', resp.data.token)
                // localStorage.setItem('userdata', resp.data.userData)
                this.router.navigate(['/profile']);
             
              })
        }
      
      })
      
    }
  }

}
