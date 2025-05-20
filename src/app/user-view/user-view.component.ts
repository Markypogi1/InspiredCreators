import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-view',
  imports: [RouterModule,CommonModule],
  templateUrl: './User-View.component.html',
  styleUrls: ['../home/home.component.css'],
})
export class UserViewComponent {
user: any;
  isDropdownVisible: boolean = false;
    signupUsers: any[] = [];
 
  constructor(
    private router: Router,
   
   
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }else{
      this.router.navigate(['/login']);
    }
     const users = localStorage.getItem('signupUsers');
    if (users) {
      this.signupUsers = JSON.parse(users);
    }
  }


  // Toggle visibility of the dropdown menu
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  // Handle logout functionality
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
 
  
}
