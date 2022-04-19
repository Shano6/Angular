import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces';
import { StateService } from 'src/app/services/state.service';
import { shuffleArr } from 'src/app/helpers/shuffleArr';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question!: Question;
  questionIndex!: number;
  answers!: string[];
  chosenAnswer!: string;
  correctAnswer!: string;
  displayAnswer!: boolean;

  constructor(
    private stateService: StateService,
    private strorageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stateService.state$.subscribe((state) => {
      this.question = state.questions![state.currentQuestion!];
      this.questionIndex = state.currentQuestion!;
      let answers = [...this.question.incorrect_answers];
      this.correctAnswer = this.question.correct_answer;
      answers.push(this.question.correct_answer);
      this.answers = shuffleArr(answers);
    });
  }

  answer(answer: string): void {
    if (!this.chosenAnswer) {
      this.chosenAnswer = answer;
      this.displayAnswer = true;
    }
  }

  nextQuestion(): void {
    if (this.questionIndex === 9) {
      this.finish();
    } else {
      if (this.chosenAnswer === this.correctAnswer)
        this.stateService.addStateCorrectAnswer();
      this.stateService.nextStateQuestion();
      this.displayAnswer = false;
      this.chosenAnswer = '';
    }
  }

  finish(): void {
    this.strorageService.logRecentQuiz(
      this.stateService.state.value.questions!,
      this.stateService.state.value.correctAnswers!
    );
    this.router.navigate(['results']);
  }

  getColor(answer: string): string {
    if (this.displayAnswer) {
      if (
        this.correctAnswer === this.chosenAnswer &&
        this.chosenAnswer === answer
      ) {
        return 'green';
      } else if (
        this.correctAnswer !== this.chosenAnswer &&
        this.chosenAnswer === answer
      ) {
        return 'red';
      } else if (
        this.correctAnswer !== this.chosenAnswer &&
        this.correctAnswer === answer
      ) {
        return 'greenBorder';
      } else {
        return 'none';
      }
    } else {
      return '';
    }
  }
}
