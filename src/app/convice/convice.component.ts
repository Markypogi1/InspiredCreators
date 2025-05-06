import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,  Router} from '@angular/router';


@Component({
  selector: 'app-convince',
  imports: [CommonModule,RouterModule], // Add FormsModule here
  templateUrl: './convince.component.html',
  styleUrls: ['./convince.component.css']
})
export class ConviceComponent implements OnInit {
  currentIndex = 0;

  constructor(private router: Router) {}

  images = [
    { src: 'assets/Images/tiktok.png', bgColor: '#5E91D9' },
    { src: 'assets/Images/steve chen.png', bgColor: '#E95F67' },
    { src: 'assets/Images/zuckerberg.png', bgColor: '#2C2F47' }
  ];

  communities = [
    {
      platform: 'TikTok',
      tagline: 'Welcome Inspire Creators!',
      description: '“The Ultimate Community forum for Content Makers!”',
      content: 'Are you a content creator looking to connect, collaborate, and grow? Whether you’re into filmmaking, blogging, photography and podcasting in social media content, InspireCreators is the place for you!',
      features: [
        'Share Your Experiences',
        'Learn from Fellow Creators',
        'Collaborate on Projects',
        'Stay Updated on Industry Trends'
      ],
      footerconvice:'Join our thriving community today and turn your creativity into impact! 🌟',
      joinText: 'Join Now!'
    },
    {
      platform: 'YouTube',
      tagline: 'Welcome Inspire Creators!',
      description: '“The Ultimate Community forum for Content Makers!”',
      content: 'Are you a content creator looking to connect, collaborate, and grow? Whether you’re into filmmaking, blogging, photography and podcasting in social media content, InspireCreators is the place for you!',
      features: [
        'Share Your Experiences',
        'Learn from Fellow Creators',
        'Collaborate on Projects',
        'Stay Updated on Industry Trends'
      ],
      footerconvice:'Join our thriving community today and turn your creativity into impact! 🌟',
      joinText: 'Join Now!'
    },
    {
      platform: 'Facebook',
      tagline: 'Welcome Inspire Creators!',
      description: '“The Ultimate Community forum for Content Makers!”',
      content: 'Are you a content creator looking to connect, collaborate, and grow? Whether you’re into filmmaking, blogging, photography and podcasting in social media content, InspireCreators is the place for you!',
      features: [
        'Share Your Experiences',
        'Learn from Fellow Creators',
        'Collaborate on Projects',
        'Stay Updated on Industry Trends'
      ],
      footerconvice:'Join our thriving community today and turn your creativity into impact! 🌟',
      joinText: 'Join Now!'
    }
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
