import { Question } from './question';

export interface ApiResoponse {
  result_code: number;
  results: Question[];
}
