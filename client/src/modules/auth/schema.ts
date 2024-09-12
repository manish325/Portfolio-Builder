import { AbstractControl, FormControl, ValidationErrors, Validators } from "@angular/forms";

export const loginSchema = {
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  }
export const registerSchema = {
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl(),
    fullName : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
}

export const passwordMisMatchValidator = (control : AbstractControl) : ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    // console.log(password.value, confirmPassword.value); 
    return password && password !== confirmPassword ? { passwordMismatch: true } : null;
}