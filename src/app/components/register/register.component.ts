import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _authService:AuthService , private _router:Router){}
registerForm:FormGroup= new FormGroup({
name: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
email: new FormControl("",[Validators.required,Validators.email]),
password: new FormControl("",[Validators.required,Validators.pattern(/^\w{6,}$/)]),
rePassword: new FormControl("",[Validators.required,Validators.pattern(/^\w{6,}$/)]),
phone: new FormControl("",[Validators.required,Validators.pattern(/^01[1205][0-9]{8}$/)]),
},{validators:this.hamada})
isLoading:boolean=false;
errorMsg:string="";
handelRegisterForm(){
  this.isLoading=true;
 this._authService.signUp(this.registerForm.value).subscribe({
  next:(res)=>{
    this.isLoading=false;
    console.log(res);
    if(res.message == "success")
    this._router.navigate(['/login']);
  },
  error:(err)=>{
    console.log(err);
    this.isLoading=false;
    this.errorMsg=err.error.message
  }
 })
}
hamada(g:any){
  if(g.get('password').value === g.get('rePassword').value){
   return null
  }
 else{
   g.get('rePassword').setErrors({'mismatch':"not matched"})
   return {'mismatch':"not matched"}
 }
 }
}
