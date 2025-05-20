import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userconcern',
  imports: [CommonModule,RouterModule],
  templateUrl: './userconcern.component.html',
  styleUrls: ['../home/home.component.css'],
})
export class UserconcernComponent {
 user: any;
 contacts: any[] = [];
 isDropdownVisible: boolean = false;
 
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

     const storedContacts = localStorage.getItem('contacts');
    this.contacts = storedContacts ? JSON.parse(storedContacts) : [];
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
