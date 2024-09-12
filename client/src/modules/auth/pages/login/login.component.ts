import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginForm } from '../../types';
import { loginSchema } from '../../schema';
import { AuthService } from '../../auth.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SnackBarService } from 'src/services/snackbar/snackbar.service';
import { LocalStorageService } from 'src/services/localstorage/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup(loginSchema);
  hidePassword:boolean = true;
  loading : boolean = false;

  constructor(
    private authService : AuthService,
    private socialAuthService : SocialAuthService,
    private router : Router,
    private route : ActivatedRoute,
    private snackbarService : SnackBarService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Parse the fragment string into an object
        const params = this.parseFragment(fragment);
        this.authService.loginWithGoogle(params['id_token']).subscribe({
          next: (res) => {
            if(res.success) {
              const {authToken} = res.data;
              this.localStorageService.save('authToken', authToken);
              this.localStorageService.save('user', res.data);
              this.router.navigate(['dashboard']).then((navigated) => {
                console.log(navigated);
                if (navigated) {
                  console.log('Navigation to dashboard successful');
                } else {
                  console.error('Navigation to dashboard failed');
                }
              }).catch(error => {
                console.error('Error during navigation:', error);
              });
            } else {
              this.snackbarService.openSnackBar(res.message, 'error');
            }
          }
        })
      }
    });
  }

  private parseFragment(fragment: string): Record<string, string> {
    const params: Record<string, string> = {};
    fragment.split('&').forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    return params;
  }

  signInWithGoogle() {
    let redirectUri = encodeURI(`http://${window.location.host}/auth/login`);
    const requestUri = "https://accounts.google.com/o/oauth2/v2/auth";
    const scope = "email profile openid";
    const responseType = "id_token"
    const clientId = "658459997549-n5l1fv2g625d7ncoviviv1gns2qe9arg.apps.googleusercontent.com";
    const nonce = "fIGNPANmnRGOI5ES4mbeIhWi580K8yvwgILZK9rn5oA";
    const uri = `${requestUri}?scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&nonce=${nonce}&client_id=${clientId}`; 
    window.open(uri, "_self");
  }

  onSubmit(formValue : any) {
    if(this.loginForm.valid) {
      const form : ILoginForm = formValue;
      this.loading = true;
      this.authService.login(form).subscribe({
        next: (res) => {
          if(res.success) {
            const {authToken} = res.data;
            this.localStorageService.save('authToken', authToken);
            this.localStorageService.save('user', res.data);
            this.router.navigate(['dashboard']).then((navigated) => {
              console.log(navigated);
              if (navigated) {
                console.log('Navigation to dashboard successful');
              } else {
                console.error('Navigation to dashboard failed');
              }
            }).catch(error => {
              console.error('Error during navigation:', error);
            });
          } else {
            this.snackbarService.openSnackBar(res.message, 'error');
          }
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.openSnackBar(err.message, 'error');
          this.loading = false;
        }
      })
    }
  }
}
