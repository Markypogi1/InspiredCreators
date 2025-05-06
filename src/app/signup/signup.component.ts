import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    firstName: '',
    username:'',
    lastName: '',
    phone: '',
    birthday: '',
    email: '',
    password: '',
    gender: ''
  };

  errorMessage = '';
  showPassword = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  selectGender(value: string) {
    this.user.gender = value;
  }
  submitForm() {
    this.errorMessage = '';
    const { firstName, username, lastName, phone, birthday, email, password, gender } = this.user;
  
    // Validation checks
    if (!firstName || !username || !lastName || !phone || !birthday || !email || !password || !gender) {
      this.errorMessage = 'All fields are required.';
      return;
    }
  
    const existingUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  
    // Check if username already exists
    const userExists = existingUsers.some((user: any) => user.username === username);
    if (userExists) {
      this.errorMessage = 'Username already exists.';
      return;
    }
  
    if (!email.endsWith('@gmail.com')) {
      this.errorMessage = 'Email must end with @gmail.com.';
      return;
    }
  
    if (password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }
  
    const phonePattern = /^\d{11}$/;
    if (!phonePattern.test(phone)) {
      this.errorMessage = 'Phone number must be 11 digits and numeric only.';
      return;
    }
  
 
    existingUsers.push(this.user);
  
    
    localStorage.setItem('signupUsers', JSON.stringify(existingUsers));
  
    alert('Registered Successfully!');
    this.router.navigate(['/login']);
  }
}  
