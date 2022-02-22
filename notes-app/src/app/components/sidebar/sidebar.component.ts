import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Note } from 'src/app/interfaces';
import { NotesService } from 'src/app/services/notes.service';
import { NgModel } from '@angular/forms';
import { v4 } from 'uuid';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() onChooseNote = new EventEmitter();
  @ViewChild("titleInput") titleInput?: ElementRef;

  notes?: Note[]
  chosenNoteId?: string 
  title?: string
  isActiveInput: boolean = false
  
  constructor(private notesService: NotesService, private ngModel: NgModel) { }

  ngOnInit(): void {
    this.notesService.noteList$.subscribe((notes)=>this.notes=notes)
    this.notesService.getNoteList()
  }

  setValue(): void{
    if(this.title){
      let guid = v4();
      this.notesService.setNoteList([...this.notes!, {
        id: guid,
        title: this.title,
        content: ''
      }])
      this.title=''
      this.swapInputState()
      this.chooseNote(guid)
  }
  }

  showInput():void{
    this.swapInputState()
    setTimeout(() => {
      this.titleInput!.nativeElement.focus();
    }, 0.1);
  }

  swapInputState(): void{
    this.isActiveInput = !this.isActiveInput
  }

  deleteNote(id: string){
    this.notesService.deleteNote(id)
  }

  chooseNote(id: string){
    this.onChooseNote.emit(id)
    this.chosenNoteId=id
  }

  isChosen(id: string): boolean{
    return id === this.chosenNoteId!
  }
}
