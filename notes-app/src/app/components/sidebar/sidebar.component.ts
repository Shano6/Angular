import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("titleInput") titleInput: any;

  notes?: Note[]
  title?: string
  isActiveInput: boolean = false
  
  constructor(private notesService: NotesService, private ngModel: NgModel) { }

  ngOnInit(): void {
    this.notesService.noteList$.subscribe((notes)=>this.notes=notes)
    this.notesService.getNoteList()
  }

  setValue(): void{
    if(this.title)
    this.notesService.setNoteList([...this.notes!, {
      id: v4(),
      title: this.title,
      content: ''
    }])
    this.title=''
    this.swapInputState()
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
}
