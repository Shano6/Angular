import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  correctAnswers!: number;
  totalQuestions!: number;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.correctAnswers = this.stateService.state.value.correctAnswers!;
    this.totalQuestions = this.stateService.state.value.questions!.length;
  }

  home() {
    this.stateService.clearState();
    this.router.navigate(['']);
    location.reload();
  }
}
