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

  getNote(id: string): Note{
    let note = this.noteList.value.filter(note=>note.id===id)
    return note[0]
  }

  updateNote(updatedNote: Note): void{
    let noteArray = this.noteList.value
    let index = noteArray.findIndex((note => note.id === updatedNote.id));
    let newNoteList = [...this.noteList.value]
    newNoteList[index].content = updatedNote.content
    this.setNoteList(newNoteList)
  }

  deleteNote(id: string): void{
    let filteredNotes = this.noteList.value.filter(note=>note.id!==id)
    this.setNoteList(filteredNotes)
  }
}
