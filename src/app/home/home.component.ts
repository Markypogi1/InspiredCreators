import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  userImage: string = 'assets/Images/Male.png';
  isDropdownVisible: boolean = false;
  deferredPrompt: any = null;
  showInstallButton = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    // Check login status from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.isLoggedIn) {
      this.user = loggedInUser;
      this.userImage = loggedInUser.gender === 'Female' ? 'assets/Images/Female.png' : 'assets/Images/Male.png';
    } else {
      this.router.navigate(['/login']);
    }
   window.addEventListener('beforeinstallprompt', (e: any) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  this.deferredPrompt = e;
  console.log('✅ beforeinstallprompt event saved.');
});

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
  gotousers() {
  
    this.router.navigate(['/users']);
  }
  promptInstallApp() {
  if (this.deferredPrompt) {
    this.deferredPrompt.prompt(); // Show the install prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  } else {
    alert('Install prompt not available. Make sure this app is a PWA and run in a supported browser.');
  }
}
}