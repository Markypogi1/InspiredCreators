import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule ,  Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.errorMessage = ''; // Reset error message
  
    if (!this.username || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }
 // Check for admin credentials
if (this.username === 'admin' && this.password === 'admin123') {
  const adminUser = {
    username: 'admin',
    password: 'admin123',
    firstName: 'Marky',
    lastName: 'Calbang',
    role: 'admin',
    isLoggedIn: true,
    image: 'assets/Images/Male.png' // Path to the admin's profile image
  };
  localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
  this.router.navigate(['/admin']);
  return;
}

    // Retrieve users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  
    // Check if the username and password match any user
    const user = existingUsers.find(
      (user: any) => user.username === this.username && user.password === this.password
    );
  
    if (user) {
      // If user is found, set isLoggedIn flag and store user data in localStorage
      user.isLoggedIn = true;
      localStorage.setItem('loggedInUser', JSON.stringify(user));  // Store the logged-in user's data
  
      // Redirect to the home page
      this.router.navigate(['/home']);
    } else {
      // If credentials don't match, show an error message
      this.errorMessage = 'Incorrect username or password.';
    }
  }
  
}
