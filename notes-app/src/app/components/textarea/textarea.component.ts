import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Note } from 'src/app/interfaces';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, OnChanges {
  @ViewChild('decorator', { read: ElementRef }) decorator?:ElementRef;
  @ViewChild('input', { read: ElementRef }) input?:ElementRef;
  @Input() noteid?:string
  content?: string
  contentStore?: string
  contentHtml?: string
  note?:Note
  gela: string = '200px'
  showDecorator: boolean = false

  constructor(private notesService: NotesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setNote()
    window.addEventListener('mousedown', 
    (e)=>{

      let target = e.target as HTMLElement
      if(target){
        if(!target.classList.contains('tool')){
          this.showDecorator=false
          window.getSelection()!.removeAllRanges();
        }
      }
    })
  }

  ngOnChanges(): void{
    this.setNote()
  }

  setNote(){
    this.note = this.notesService.getNote(this.noteid!)
    this.content = this.note.content
  }

  mouseUp(event: MouseEvent): void{
    let selectedValue =  window.getSelection()!.toString()
    if(selectedValue){
      let posX,posY;
      posY = event.pageY;
      posX = event.pageX-245;
      this.showDecorator = true
      this.renderer.setStyle(this.decorator!.nativeElement, 'left', posX+'px');
      this.renderer.setStyle(this.decorator!.nativeElement, 'top', posY+'px');
    }
  }

  onContentChange(event: any){
    this.contentStore=event.target!.innerHTML
    this.updateNote()
  }

  updateNote(){
    this.note = {...this.note!, content:this.contentStore!}
    this.notesService.updateNote(this.note)
  }

  onDecorate(command:any){
    let commandValue
    console.log(command, false, '#backColor')
    document.execCommand(command!.command, true, command.value)
    this.contentStore = this.input?.nativeElement.innerHTML
    this.updateNote()
    this.showDecorator= false
  }

  focus(){
    if(this.note!.content==""){
      this.content=" "
    }
  }
}
