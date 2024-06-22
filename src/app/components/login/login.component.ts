import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _authService:AuthService , private _router:Router){}
loginForm:FormGroup= new FormGroup({
email: new FormControl("",[Validators.required,Validators.email]),
password: new FormControl("",[Validators.required,Validators.pattern(/^\w{6,}$/)]),
})
isLoading:boolean=false;
errorMsg:string="";
handelLoginForm(){
  this.isLoading=true;
 this._authService.signIn(this.loginForm.value).subscribe({
  next:(res)=>{
    this.isLoading=false;
    console.log(res);
    if(res.message == "success"){
      localStorage.setItem('_token',res.token)
      this._authService.getToken()
      this._router.navigate(['/home']);
    }
    
  },
  error:(err)=>{
    console.log(err);
    this.isLoading=false;
    this.errorMsg=err.error.message
  }
 })
 
}
showForgetPassword:boolean=true;
showVerification:boolean=false;
showReset:boolean=false;
forgetPasswordForm :FormGroup =new FormGroup({
  email:new FormControl("",[Validators.required ,Validators.email])
})
verificationCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl("",[Validators.required])
})
resetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl("",[Validators.required ,Validators.email]),
  newPassword: new FormControl("",[Validators.required,Validators.pattern(/^\w{6,}$/)])
})
errorMsgForgetForm:string=""
handelForgetPasswordForm(){
  this.isLoading=true
  if(this.forgetPasswordForm.valid)
 {
  this._authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
    next:(res)=>{
      this.isLoading=false;
      console.log(res);
      this.showForgetPassword=false;
      this.showVerification=true;
    },
    error:(err)=>{
      this.isLoading=false;
      console.log(err);
      this.errorMsgForgetForm=err.error.message
    }
  })
 }
 
}
errorMsgVerify:string=""
handelVerificationCodeForm(){
  this.isLoading=true;
  if(this.verificationCodeForm.valid){
    this._authService.verifyCode(this.verificationCodeForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        console.log(res);
        this.showVerification=false;
        this.showReset=true
      },
      error:(err)=>{
        this.isLoading=false;
        console.log(err);
        this.errorMsgVerify=err.error.message
      }
    })
  }

}
errorMsgReset:string=""
handelResetPasswordForm(){
if(this.resetPasswordForm.valid){
  this._authService.resetPassword(this.resetPasswordForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      localStorage.setItem('_token' , res.token)
      this._router.navigate(['/login'])
    },
    error:(err)=>{
      console.log(err);
      this.errorMsgReset=err.error.message
    }
  })
}
}

}
