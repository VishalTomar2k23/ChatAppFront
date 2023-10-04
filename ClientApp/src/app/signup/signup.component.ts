import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;
  constructor(private fb : FormBuilder,private auth : AuthService){}
  ngOnInit() {
    this.auth.setShowToolbar(false);
    this.signUpForm = this.fb.group({
      email:['', Validators.required],
      fname:['', Validators.required],
      lname:['', Validators.required],
      contact:['', Validators.required],
      dob:['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  ngOnDestory():void {
    this.auth.setShowToolbar(true);
 }
  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)

      }
    })
  }
  
  onSignUp(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.validateAllFormFields(this.signUpForm);
      alert("Your form valid");
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res =>{
           alert(res.message)

        })
        ,error:(err =>{
          alert(err?.error.message)
        })
      })

    } else { 
     
      this.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid")
    }

    

  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

}
