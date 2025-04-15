import { Component, inject, output } from '@angular/core';
import { Event } from '@angular/router';
import { BlankpageService } from '../../services/blankpage.service';

@Component({
  selector: 'app-blank',
  imports: [],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

  service = inject(BlankpageService);

  textEvent = output<string>()

  readText() {
    const element: HTMLElement | null = document.querySelector('.blank-container');
    if (element) {
      const text = element.innerText;
      console.log('dentro div: <' + text + '>');
      if(text){
        this.service.loadText(text,0);
        this.textEvent.emit(text);
      }
    }
  }
}
