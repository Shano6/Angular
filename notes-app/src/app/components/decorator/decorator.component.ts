import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.scss']
})
export class DecoratorComponent{
  @Output() onDecorate= new EventEmitter();

  decorate(command: string, value?: string){
    this.onDecorate.emit({command: command, value: value})
  }
}
