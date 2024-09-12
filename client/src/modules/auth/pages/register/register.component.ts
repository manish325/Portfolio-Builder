import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { passwordMisMatchValidator, registerSchema } from '../../schema';
import { AuthService } from '../../auth.service';
import { SnackBarService } from 'src/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup(registerSchema, {
    validators : passwordMisMatchValidator
  });

  hidePassword : boolean = true;

  constructor(
    private authService : AuthService,
    private snackbarService : SnackBarService,
    private router : Router
  ) {}

  ngOnInit(): void {
      this.registrationForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
        console.log(value);
      })
  }

  onSubmit(formValue : any){
    if(this.registrationForm.valid) {
      formValue.phone = `+91${formValue.phone.toString()}`;
      this.authService.register(formValue).subscribe({
        next : (res) => {
          this.snackbarService.openSnackBar(res.message);
          if(res.success) {
            this.router.navigate(['/auth/login']);
          }
        }, error : (e) => {
          this.snackbarService.openSnackBar(e.error.message);
        }
      })
      ;

    } else {
      console.log('Invalid form');
      console.log(this.registrationForm.valid);
      console.log(this.registrationForm.errors);
    }
  }

}
