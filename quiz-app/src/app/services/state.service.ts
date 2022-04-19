import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  private initialState = {
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
  };
  public state = new BehaviorSubject<State>(this.initialState);
  public state$: Observable<State> = this.state.asObservable();

  addStateQuestions(questions: Question[]): void {
    this.state.next({
      ...this.state.value,
      questions: questions,
    });
  }

  nextStateQuestion(): void {
    this.state.next({
      ...this.state.value,
      currentQuestion: this.state.value.currentQuestion! + 1,
    });
  }

  addStateCorrectAnswer(): void {
    this.state.next({
      ...this.state.value,
      correctAnswers: this.state.value.correctAnswers! + 1,
    });
  }

  clearState(): void {
    this.state.next(this.initialState);
  }

  isStateActive(): boolean {
    if (this.state.value.questions) {
      return this.state.value.questions.length >= 1;
    } else {
      return false;
    }
  }
}
