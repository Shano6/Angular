import { Component, OnInit } from '@angular/core';
import { recentQuiz } from 'src/app/interfaces';
import { QuestionService } from 'src/app/services/question.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  recentQuizzes!: recentQuiz[];

  constructor(
    private questionService: QuestionService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.recentQuizzes = this.storageService.getRecentQuiz();
    console.log(this.recentQuizzes);
  }

  startQuiz() {
    this.questionService.getQuestions();
  }

  redoQuiz(quiz: recentQuiz) {
    this.questionService.redoQuiz(quiz);
  }
}
