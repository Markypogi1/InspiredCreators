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
  showAskForm: boolean = false;
  questionTitle: string = '';
  questionDescription: string = '';
  
  
  /**this for likes */
  questions: any[] = [];
  currentUser: any = null;
  likings: any[] = [];
  views: { [key: string]: number } = {};

  /**show the popular user */
  popularUsers: any[] = [];

  /** this is for questions */
  comments: any[] = [];
  expandedQuestionId: number | null = null;
  newComment: { [key: number]: string } = {};

  /** for mini likes and replies */
  showReplyBoxId: number | null = null;
newMiniReply: { [key: string]: string } = {}; // key is now "questionId-commentId"

//this use for searching
allQuestions: any[] = [];        // Holds all original questions
  searchText: string = '';   

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    // Check login status from localStorage


/**this for likes */
    this.likings = JSON.parse(localStorage.getItem('liking') || '[]');
 
    this.currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    this.comments = JSON.parse(localStorage.getItem('comments') || '[]');


    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.questions = JSON.parse(localStorage.getItem('questions') || '[]');

    const userss = JSON.parse(localStorage.getItem('signupUsers') || '[]');

    const storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    this.allQuestions = storedQuestions.filter((q: any) => q.status === 'Approved');
    this.questions = [...this.allQuestions];

    if (loggedInUser && loggedInUser.isLoggedIn) {
      this.user = loggedInUser;
      this.userImage = loggedInUser.profileImage 
      ? loggedInUser.profileImage 
      : (loggedInUser.gender === 'Female' 
          ? 'assets/Images/Female.png' 
          : 'assets/Images/Male.png');  
          this.popularUsers = userss
       .filter((u: any) => u.followers && u.followers >= 1)
      .sort((a: any, b: any) => b.followers - a.followers)
      .slice(0, 7); // top 7 users
      this.contact.name = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    this.contact.phone = loggedInUser.phone || '';
    this.contact.email = loggedInUser.email || '';
    
    } else {
      this.router.navigate(['/login']);
    }
   // Load approved questions only
  const allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
  this.questions = allQuestions
    .filter((q: any) => q.status === 'Approved')
    .map((q: any) => {
      const id = q.dateAndTimeCreated;
      this.views[id] = this.views[id] || 0;
      return q;
    });

    // Handle fragment scroll on route change (when coming from a link click)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 0);
      }
    });
    /** this for likes  */
   
  }
  /**Code for the questions */
getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day(s) ago`;
  if (hours > 0) return `${hours} hour(s) ago`;
  if (minutes > 0) return `${minutes} minute(s) ago`;
  return `just now`;
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

          if (section === 'FAQ') {
          this.questions.forEach(q => {
            const id = q.dateAndTimeCreated;
            this.views[id] = (this.views[id] || 0) + 1;
          });
        }
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
  viewProfile(user: any) {
    this.router.navigate(['/userprofile', user.username]); // Assuming email as unique ID
  } 
 /* store the questions */
 toggleAskForm() {
  this.showAskForm = !this.showAskForm;
  this.questionTitle = '';
  this.questionDescription = '';
}

submitQuestion() {
  if (!this.questionTitle.trim() || !this.questionDescription.trim()) {
    alert('Please enter both question and description.');
    return;
  }
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  const newQuestion = {
    id: Date.now(),
    firstname: loggedInUser.firstName,
    email: this.currentUser.email,
    lastname: loggedInUser.lastName,
    profile: loggedInUser.profileImage && loggedInUser.profileImage.trim() !== ''
  ? loggedInUser.profileImage
  : loggedInUser.gender === 'Female'
    ? 'assets/Images/Female.png'
    : 'assets/Images/Male.png',
    question: this.questionTitle,
    description: this.questionDescription,
    likes: 0,
    status: 'Pending',
    comments: [],
    dateAndTimeCreated: new Date().toISOString()
  };

  const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
  existingQuestions.push(newQuestion);
  localStorage.setItem('questions', JSON.stringify(existingQuestions));

  alert('Your question has been submitted!');
  
  this.toggleAskForm();
}
/** contact form code*/
contact = {
  name: '',
  phone: '',
  email: '',
  message: ''
};
  submitContact(form: any) {
  if (form.invalid) {
    alert('Please fill out all the fields before submitting.');
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  const newContact = {
    name: this.contact.name,
    phone: this.contact.phone,
    email: this.contact.email,
    message: this.contact.message,
    dateAndTimeCreated: new Date().toISOString(),
    profile: loggedInUser.profileImage
      ? loggedInUser.profileImage
      : (loggedInUser.gender === 'Female'
          ? 'assets/Images/Female.png'
          : 'assets/Images/Male.png')
  };

  const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  alert('Your message has been submitted!');

  // Reset form and model
  form.resetForm();
  this.contact = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };
}

/** likes questions */
 isLiked(q: any): boolean {
  return this.likings.some(
    like => like.questionId === q.id && like.likeBy === this.currentUser.email
  );
}

toggleLike(q: any): void {
  const index = this.likings.findIndex(
    like => like.questionId === q.id && like.likeBy === this.currentUser.email
  );

  if (index === -1) {
    // Like
    q.likes = (q.likes || 0) + 1;
    const newLike = {
      like_id: this.getNextLikeId(),
      questionId: q.id,
      username: q.username,
      likeBy: this.currentUser.email
    };
    this.likings.push(newLike);
  } else {
    // Unlike
    q.likes = Math.max(0, (q.likes || 0) - 1);
    this.likings.splice(index, 1);
  }

  localStorage.setItem('liking', JSON.stringify(this.likings));
  localStorage.setItem('questions', JSON.stringify(this.questions));
}

getNextLikeId(): number {
  const lastId = this.likings.length ? Math.max(...this.likings.map(l => l.like_id || 0)) : 0;
  return lastId + 1;
}



/** code for comments starts here */
toggleComments(questionId: number) {
    this.expandedQuestionId = this.expandedQuestionId === questionId ? null : questionId;
  }

  getComments(questionId: number) {
    return this.comments.filter(c => c.questionId === questionId);
  }

  getCommentsCount(questionId: number) {
    return this.getComments(questionId).length;
  }

  submitComment(questionId: number) {
  const text = this.newComment[questionId]?.trim();
  if (!text) return;

  const comment = {
    commentid: Date.now(),
    questionId,
    commentBy: this.currentUser.username,
    text,
    timestamp: new Date().toISOString()
  };

  this.comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(this.comments));
  this.newComment[questionId] = '';
}

// Get last name from commenter's email or username
getLastName(email: string): string {
  const users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  const user = users.find((u: any) => u.email === email || u.username === email);
  return user ? user.lastName : 'User';
}

// Get user image based on gender or default
getUserImage(email: string): string {
  const users = JSON.parse(localStorage.getItem('signupUsers') || '[]');
  const user = users.find((u: any) => u.email === email || u.username === email);

  if (!user) {
    return 'assets/Images/Male.png'; // Default fallback if user not found
  }

  // If profileImage exists and is not empty, return it
  if (user.profileImage && user.profileImage.trim() !== '') {
    return user.profileImage;
  }

  // Fallback to gender-based avatar
  return user.gender === 'Female'
    ? 'assets/Images/Female.png'
    : 'assets/Images/Male.png';
}


// start mini likes and replies here
toggleReplyBox(commentId: number, questionId: number) {
  const key = `${questionId}-${commentId}`;
  this.showReplyBoxId = this.showReplyBoxId === commentId ? null : commentId;
}
toggleMiniLike(commentid: number, questionid: number) {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  let minilikes = JSON.parse(localStorage.getItem('minilikes') || '[]');

  const index = minilikes.findIndex(
    (like: any) =>
      like.commentid === commentid &&
      like.questionid === questionid &&
      like.likesBy === currentUser.username
  );

  if (index !== -1) {
    minilikes.splice(index, 1);
  } else {
    const newLike = {
      minilikeId: Date.now(),
      commentid: commentid,
      questionid: questionid,
      likesBy: currentUser.username,
    };
    minilikes.push(newLike);
  }

  localStorage.setItem('minilikes', JSON.stringify(minilikes));
}

submitMiniReply(commentid: number, questionid: number) {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const key = `${questionid}-${commentid}`;
  const replyText = this.newMiniReply[key];
  if (!replyText || replyText.trim() === '') return;

  const newReply = {
    repliesId: Date.now(),
    commentid: commentid,
    questionid: questionid,
    commentBy: currentUser.username,
    text: replyText.trim(),
    timestamp: new Date().toISOString(),
  };

  let replies = JSON.parse(localStorage.getItem('minireplies') || '[]');
  replies.push(newReply);
  localStorage.setItem('minireplies', JSON.stringify(replies));
  this.newMiniReply[key] = '';
}

countMiniLikes(commentid: number, questionid: number): number {
  const minilikes = JSON.parse(localStorage.getItem('minilikes') || '[]');
  return minilikes.filter(
    (like: any) => like.commentid === commentid && like.questionid === questionid
  ).length;
}

countMiniReplies(commentid: number, questionid: number): number {
  const replies = JSON.parse(localStorage.getItem('minireplies') || '[]');
  return replies.filter(
    (reply: any) => reply.commentid === commentid && reply.questionid === questionid
  ).length;
}

getMiniReplies(commentid: number, questionid: number): any[] {
  const replies = JSON.parse(localStorage.getItem('minireplies') || '[]');
  return replies.filter(
    (r: any) => r.commentid === commentid && r.questionid === questionid
  );
}

hasMiniLiked(commentid: number, questionid: number): boolean {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const minilikes = JSON.parse(localStorage.getItem('minilikes') || '[]');
  return minilikes.some(
    (like: any) =>
      like.commentid === commentid &&
      like.questionid === questionid &&
      like.likesBy === currentUser.username
  );
}
//searching code starts here 
 onSearchChange() {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.questions = [...this.allQuestions]; // Reset if input is empty
      return;
    }

    this.questions = this.allQuestions.filter((q: any) =>
      q.question?.toLowerCase().includes(keyword) ||
      q.description?.toLowerCase().includes(keyword) ||
      q.lastname?.toLowerCase().includes(keyword)
    );
  }

}