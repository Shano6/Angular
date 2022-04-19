import { Injectable } from '@angular/core';
import { Question } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageData = localStorage.getItem('recentQuiz');

  getRecentQuiz() {
    if (this.storageData) {
      let recentQuiz = JSON.parse(this.storageData);
      return recentQuiz;
    } else {
      localStorage.setItem('recentQuiz', JSON.stringify([]));
      return [];
    }
  }

  logRecentQuiz(questions: Question[], correctAnswers: number): void {
    if (this.storageData) {
      localStorage.setItem(
        'recentQuiz',
        JSON.stringify([
          ...JSON.parse(this.storageData),
          {
            questions: questions,
            correctAnswers: correctAnswers,
            date: new Date(),
          },
        ])
      );
    }
  }
}
