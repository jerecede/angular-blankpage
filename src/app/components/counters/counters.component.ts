import { Component, computed, inject, input } from '@angular/core';
import { BlankpageService } from '../../services/blankpage.service';

@Component({
  selector: 'app-counters',
  imports: [],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.scss'
})
export class CountersComponent {
  service = inject(BlankpageService)

  textToCount = input<string>();

  wordsNumber = computed(() => this.countWords(this.textToCount()))
  charsNumber = computed(() => this.countChars(this.textToCount()))

  countWords(text: string | undefined): number {
    if(text){
      const wordsArray = text.trim().split(/\s+/g);
      return wordsArray.length;
    }
    return 0;
  }

  countChars(text: string | undefined): number{
    if(text){
      const textNoSpaces = text.trim().replace(/\s+/g,'');
      return textNoSpaces.length;
    }
    return 0;
  }

}