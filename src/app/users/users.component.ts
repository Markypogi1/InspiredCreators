import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['../home/home.component.css'],
})
export class UsersComponent {
user: any = null;
  userImage: string = 'assets/Images/Male.png';
  isDropdownVisible: boolean = false;
 users: any[] = []; 
 followedUsers: Set<string> = new Set();

 allUsers: any[] = [];

searchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}
viewProfile(user: any) {
    // For example, navigate to `/profile/:email` (email as unique ID)
    this.router.navigate(['/userprofile', user.username]);
  }

  ngOnInit() {
    // Check login status from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.isLoggedIn) {
      this.user = loggedInUser;
      this.userImage = loggedInUser.profileImage 
      ? loggedInUser.profileImage 
      : (loggedInUser.gender === 'Female' 
          ? 'assets/Images/Female.png' 
          : 'assets/Images/Male.png');  
      this.allUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  this.users = [...this.allUsers];
    } else {
      this.router.navigate(['/login']);
    }

    // Handle fragment scroll on route change (when coming from a link click)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 0);
      }
    });
  }

  // Listen to the scroll event to track section visibility
  @HostListener('window:scroll', [])
  onScroll() {
    const sections = ['welcomehome', 'aboutus', 'contactus', 'FAQ'];
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop;
        const height = element.offsetHeight;

        // If the section is in view, update the URL fragment and highlight the menu item
        if (scrollPosition >= offset - 50 && scrollPosition < offset + height - 50) {
          this.updateActiveMenuItem(section);
          this.updateUrlFragment(section);
        }
      }
    });
  }

  // Update active class for the corresponding menu item based on the scroll position
  updateActiveMenuItem(fragment: string) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      if (item instanceof HTMLElement) {
        if (item.getAttribute('fragment') === fragment) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    });
  }

  // Update the URL fragment when a section comes into view (without reloading the page)
  updateUrlFragment(fragment: string) {
    window.history.pushState(null, '', `/home#${fragment}`);
  }

  // Scroll to the section when a menu item is clicked
  scrollToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.updateUrlFragment(fragment); // Update the URL fragment on click
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

  // following starts here
  toggleFollow(targetUser: any, event: MouseEvent) {
  event.stopPropagation();

  const currentUser = this.user;
  const signupUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  const followings = JSON.parse(localStorage.getItem('followings') || '[]');

  // Prevent self-following
  if (targetUser.username === currentUser.username) {
    alert("You can't follow yourself.");
    return;
  }

  const targetIndex = signupUsers.findIndex((u: any) => u.username === targetUser.username);
  const currentIndex = signupUsers.findIndex((u: any) => u.email === currentUser.email);
  if (targetIndex === -1 || currentIndex === -1) return;

  const existingFollow = followings.find(
    (f: any) =>
      f.followedId === targetUser.email &&
      f.followedBy === currentUser.username
  );

  if (existingFollow) {
    // ❌ Unfollow
    const updatedFollowings = followings.filter(
      (f: any) =>
        !(f.followedId === targetUser.email && f.followedBy === currentUser.username)
    );
    signupUsers[targetIndex].followers = (signupUsers[targetIndex].followers || 1) - 1;
    localStorage.setItem('followings', JSON.stringify(updatedFollowings));
  } else {
    // ✅ Follow
    followings.push({
      followedId: targetUser.email,
      username: targetUser.username,
      followedBy: currentUser.username,
      timestamp: new Date().toISOString(),
    });
    signupUsers[targetIndex].followers = (signupUsers[targetIndex].followers || 0) + 1;
    localStorage.setItem('followings', JSON.stringify(followings));
  }

  // Save signupUsers and refresh UI
  localStorage.setItem('signupUsers', JSON.stringify(signupUsers));
  this.users = signupUsers;
}
isUserFollowed(targetEmail: string): boolean {
  const followings = JSON.parse(localStorage.getItem('followings') || '[]');
  return followings.some(
    (f: any) =>
      f.followedId === targetEmail && f.followedBy === this.user.username
  );
}
// code for fitering
 onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();
  if (!term) {
    this.users = [...this.allUsers];
    return;
  }
  
  this.users = this.allUsers.filter(u => {
    const fullName = (u.firstName + ' ' + u.lastName).toLowerCase();
    const username = u.username.toLowerCase();
    return fullName.includes(term) || username.includes(term) || 'follow'.includes(term);
  });
}
}
