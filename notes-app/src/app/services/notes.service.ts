import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  private noteList = new BehaviorSubject<Note[]>([]);
  public noteList$: Observable<Note[]> = this.noteList.asObservable();

  getNoteList(): void {
    const localNotes = localStorage.getItem('notes');
    this.setNoteList(localNotes? JSON.parse(localNotes):[])
  }

  setNoteList(noteList: any): void {
    this.noteList.next(noteList);
    localStorage.setItem('notes', JSON.stringify(noteList))
  }

  deleteNote(id: string){
    let filteredNotes = this.noteList.value.filter(note=>note.id!==id)
    this.setNoteList(filteredNotes)
  }
}
