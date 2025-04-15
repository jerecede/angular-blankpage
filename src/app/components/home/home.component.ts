import { Component } from '@angular/core';
import { BlankComponent } from "../blank/blank.component";
import { CountersComponent } from "../counters/counters.component";
import { NotesComponent } from "../notes/notes.component";

@Component({
  selector: 'app-home',
  imports: [BlankComponent, CountersComponent, NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  textRealTime?: string;

  setTextRealTime(text: string) {
    this.textRealTime = text;
  }

}
