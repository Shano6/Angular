import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultsComponent } from './components/results/results.component';
import { StateValueGuard } from './state-value.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [StateValueGuard],
  },
  {
    path: 'quiz',
    component: QuestionComponent,
    canActivate: [StateValueGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
