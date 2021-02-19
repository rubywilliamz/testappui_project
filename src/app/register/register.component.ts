import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProviderService } from '../core/api-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private apiProvider: ApiProviderService,
    private router: Router) { }

  registerForm!: FormGroup;
  formSubmiited = false;
  passwordMatch = false;

  ngOnInit(): void {
    this.createregisterForm();
  }

createregisterForm() {
  this.registerForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required,Validators.minLength(8),
     ]),
     con_password: this.fb.control('', [Validators.required,Validators.minLength(8)]),
     username: this.fb.control('', [Validators.required]),
     phone: this.fb.control('', [Validators.required])
  })

}
get form() {
  return this.registerForm.controls;
}

  checkLogin() {
    this.formSubmiited = true;
    const params = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      username: this.registerForm.controls['username'].value,
      phone: this.registerForm.controls['phone'].value,

    }
   
    if (this.registerForm.valid) { 
      if (this.registerForm.controls['con_password'].value !== (this.registerForm.controls['password'].value)) { 
        this.passwordMatch = true;
          } else {

          
      this.apiProvider.postData(this.apiProvider.registerUrl, params).subscribe((res: any) => {
        
        if (res.message == 'User data fetched successfully' ) {
         
          this.router.navigate(['/login']);
        } else {
          alert(res.message);
        }
       
      }, error => {
        console.log(error.message)
      })
    }
  }
  }
}
