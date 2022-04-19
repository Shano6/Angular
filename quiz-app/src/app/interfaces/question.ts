export interface Questions {
  response_code: number;
  results: Question[];
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface recentQuiz {
  questions: Question[];
  correctAnswers: number;
  date: Date;
}
