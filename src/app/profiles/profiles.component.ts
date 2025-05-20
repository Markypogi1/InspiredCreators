import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-profiles',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './Profilesettings.component.html',
  styleUrls: ['../home/home.component.css'],
})
export class ProfilesComponent {
user: any = null;
  userImage: string = 'assets/Images/Male.png';
  isDropdownVisible: boolean = false;
 users: any[] = []; 
  selectedFileBase64: string = '';
 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}
viewProfile(user: any) {
    // For example, navigate to `/profile/:email` (email as unique ID)
    this.router.navigate(['/profile', user.username]);
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
       this.users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
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
  // handle password 
 handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string;
        this.userImage = this.selectedFileBase64;
      };
      reader.readAsDataURL(file);
    }
  }

 updateProfile() {
  const currentEmail = this.user.email.trim();
  const updatedUser = { ...this.user };

  // ✅ Phone Validation
  if (!/^\d{11}$/.test(updatedUser.phone)) {
    alert('Phone number must be exactly 11 digits.');
    return;
  }

  // ✅ Username Uniqueness
  const isUsernameTaken = this.users.some(
    (u: any) => u.username === updatedUser.username && u.email !== currentEmail
  );
  if (isUsernameTaken) {
    alert('Username already taken.');
    return;
  }

  // ✅ Attach Profile Image if selected
  if (this.selectedFileBase64) {
    updatedUser.profileImage = this.selectedFileBase64;
  }

  // ✅ Update users array
  const userIndex = this.users.findIndex((u: any) => u.email === currentEmail);
  if (userIndex !== -1) {
    this.users[userIndex] = updatedUser;
    localStorage.setItem('signupUsers', JSON.stringify(this.users));
    this.user = updatedUser;
    localStorage.setItem('loggedInUser', JSON.stringify({ ...updatedUser, isLoggedIn: true }));

    // ✅ Update questions if any
    const questions = JSON.parse(localStorage.getItem('questions') || '[]');
    const updatedQuestions = questions.map((q: any) => {
      if (q.email === currentEmail || q.username === updatedUser.username) {
        return {
          ...q,
          profile: updatedUser.profileImage && updatedUser.profileImage.trim() !== ''
            ? updatedUser.profileImage
            : updatedUser.gender === 'Female'
              ? 'assets/Images/Female.png'
              : 'assets/Images/Male.png',
          firstname: updatedUser.firstName,  // ✅ Update firstName
          lastname: updatedUser.lastName    // ✅ Update lastName
        };
      }
      return q;
    });
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    alert('Profile updated successfully!');
  } else {
    alert('User not found.');
  }
}
}





