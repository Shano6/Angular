import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { ApiResoponse, Question, recentQuiz } from '../interfaces';
import { Router } from '@angular/router';
import { shuffleArr } from '../helpers/shuffleArr';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private router: Router
  ) {}

  getQuestions(): void {
    this.http
      .get<ApiResoponse>('https://opentdb.com/api.php?amount=10')
      .subscribe({
        next: (response) => {
          let questions: Question[] = [];
          response.results.forEach((question) => {
            if (question) {
            }
            questions.push({
              question: question.question,
              correct_answer: question.correct_answer,
              incorrect_answers: question.incorrect_answers,
            });
          });
          this.stateService.addStateQuestions(questions);
          this.router.navigate(['quiz']);
        },
        error: () => {
          alert('An error occured while trying to get questions');
        },
      });
  }

  redoQuiz(quiz: recentQuiz): void {
    this.stateService.addStateQuestions(shuffleArr(quiz.questions));
    this.router.navigate(['quiz']);
  }
}
