import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  imports: [],
  template: ``
    
})
export class UserProfileComponent {
user: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    const users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
    this.user = users.find((u: any) => u.username === username);

    if (!this.user) {
      alert('User not found');
      this.router.navigate(['/users']);
    }
  }
}
