import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.scss'],
})
export class DecoratorComponent {
  @Output() decorate = new EventEmitter();

  onDecorate(command: string, value?: string) {
    this.decorate.emit({ command, value });
  }
}
