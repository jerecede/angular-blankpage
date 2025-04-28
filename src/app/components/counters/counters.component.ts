import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { BlankpageService } from '../../services/blankpage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counters',
  imports: [CommonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.scss'
})
export class CountersComponent {
  service = inject(BlankpageService)

  textToCount = input<string>();

  wordsNumber = computed(() => this.countWords(this.textToCount()))
  charsNumber = computed(() => this.countChars(this.textToCount()))

  isMouseOnDiv = signal(false);
  currentStyles = {
    'background-color' : ''
  }

  constructor(){
    effect(() => {
      this.currentStyles = {
        'background-color' : this.isMouseOnDiv() ? 'rgb(209, 209, 209)' : ''
      }
    });
  }

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

  onMouseLeave() {
    this.isMouseOnDiv.set(false);
  }

  onMouseEnter() {
    this.isMouseOnDiv.set(true);
  }
}