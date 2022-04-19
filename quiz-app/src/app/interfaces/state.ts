import { Question } from './question';

export interface State {
  questions?: Question[];
  currentQuestion?: number;
  correctAnswers?: number;
}
