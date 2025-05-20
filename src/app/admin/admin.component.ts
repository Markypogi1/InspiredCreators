import { Component,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['../home/home.component.css'],
})
export class AdminComponent implements OnInit {
  user: any;
  isDropdownVisible: boolean = false;
  questions: any[] = [];
 
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
    this.loadQuestions();
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
 loadQuestions() {
    const storedQuestions = localStorage.getItem('questions');
    this.questions = storedQuestions ? JSON.parse(storedQuestions) : [];
  }

  // Update the status of a question
  updateStatus(id: number, newStatus: string) {
    const index = this.questions.findIndex(q => q.id === id);
    if (index !== -1) {
      this.questions[index].status = newStatus;
      localStorage.setItem('questions', JSON.stringify(this.questions));
    }
  }

  // Delete a question
  deleteQuestion(id: number) {
    this.questions = this.questions.filter(q => q.id !== id);
    localStorage.setItem('questions', JSON.stringify(this.questions));
  }

  onStatusChange(event: Event, id: number): void {
  const selectElement = event.target as HTMLSelectElement;
  const newStatus = selectElement.value;
  this.updateStatus(id, newStatus);
}

  
}

