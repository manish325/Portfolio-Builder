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
  hideConfirmPassword : boolean = true;
  loading : boolean = false;

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
      this.loading = true;
      this.authService.register(formValue).subscribe({
        next : (res) => {
          this.snackbarService.openSnackBar(res.message);
          if(res.success) {
            this.router.navigate(['/auth/login']);
          }
          this.loading = false;
        }, error : (e) => {
          this.snackbarService.openSnackBar(e.error.message);
          this.loading = false;
        }
      });
    } else {
      console.log('Invalid form');
      console.log(this.registrationForm.valid);
      console.log(this.registrationForm.errors);
    }
  }

  signInWithGoogle() {
    // Redirect to Google OAuth for registration
    let redirectUri = encodeURI(`http://${window.location.host}/auth/register`);
    const requestUri = "https://accounts.google.com/o/oauth2/v2/auth";
    const scope = "email profile openid";
    const responseType = "id_token"
    const clientId = "658459997549-n5l1fv2g625d7ncoviviv1gns2qe9arg.apps.googleusercontent.com";
    const nonce = "fIGNPANmnRGOI5ES4mbeIhWi580K8yvwgILZK9rn5oA";
    const uri = `${requestUri}?scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&nonce=${nonce}&client_id=${clientId}`; 
    window.open(uri, "_self");
  }

}
