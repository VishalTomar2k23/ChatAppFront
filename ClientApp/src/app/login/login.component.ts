import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  providers:[AuthService,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  message!: string;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  loginObj!: { UserName: string; Password: string; Role: string; };
  constructor(
    private fb: FormBuilder,
    private auth:AuthService
  ) {}
  
  ngOnInit() {
    this.auth.setShowToolbar(false);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
     // Role:['', Validators.required],
    });
  }
  ngOnDestory():void {
     this.auth.setShowToolbar(true);
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
              alert(res.message);
      },
      
      });

     
    } else { 
     
      
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }
  private validateAllFormFields(formGroup: FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field =>
   {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)

      }
    })
  } 
}