import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule ,  Router} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null; // This will hold user data
  userImage: string = 'assets/Images/Male.png';  // Default profile image for male
  isDropdownVisible: boolean = false; // Flag to show/hide the dropdown menu

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve the logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (loggedInUser && loggedInUser.isLoggedIn) {
      // If user is logged in, store user data
      this.user = loggedInUser;

      // Set the profile picture based on gender (assumes 'gender' is stored in localStorage)
      this.userImage = loggedInUser.gender === 'Female' ? 'assets/Images/Female.png' : 'assets/Images/Male.png';
    } else {
      // If no logged-in user, redirect to login page
      this.router.navigate(['/login']);
    }
  }

  // Toggle visibility of the dropdown menu
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Navigate to the profile page (you can modify this based on your actual routing)
 

  // Handle logout functionality
  logout() {
    // Remove the user from localStorage (or any other session management)
    localStorage.removeItem('loggedInUser');
    
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
