import { Component, effect, inject, output, signal } from '@angular/core';
import { Event } from '@angular/router';
import { BlankpageService } from '../../services/blankpage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blank',
  imports: [CommonModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

  service = inject(BlankpageService);

  textEvent = output<string>();

  idTimeOut = -1;
  timerToAutoSave = 20000 //millisecond

  isNeverTouched = true;

  currentText = '';

  isMouseOnDiv = signal(false);

  currentStyles = {
    'border' : ''
  }

  constructor(){
    effect(() => {
      this.currentStyles = {
        'border' : this.isMouseOnDiv() ? 'solid black 1px' : ''
      }
    });
  }

  saveTextTimeout(text: string, timer: number) {
    
  }

  //-invia il testo in output per i contatori
  //-garantisce che quando non c'è nessun carattere dentro div contenteditable(solo spazi, o tab, o accapo) si trasformi automaticamente in ""
  //-se non scrivi per 20sec(timerToAutoSave) fa blur e quindi salva automaticamente
  dispatchText() {
    const element: HTMLElement | null = document.querySelector('.blank-container');
    if (element) {
      this.currentText = element.innerText;
      if (this.currentText) {
        if (this.currentText.trim() === "") {
          this.currentText = "";
          element.innerText = this.currentText;
        }
        this.textEvent.emit(this.currentText);

        if (this.idTimeOut !== -1) {
          window.clearTimeout(this.idTimeOut)
        }
        this.idTimeOut = window.setTimeout(() => {
          this.onMouseLeave();
        }, this.timerToAutoSave);
      }
    }
  }

  //-in base al mouse, fa comparire o somparire il bordo
  //-qunado esce dal div con il mouse fa blur forzato
  onMouseLeave() {
    const element: HTMLElement | null = document.querySelector('.blank-container');
    element?.blur();
    this.isMouseOnDiv.set(false);
  }

  //-in base al mouse, fa comparire o somparire il bordo
  onMouseEnter() {
    this.isMouseOnDiv.set(true);
  }

  //-quando fa blur(unfocus) salva automaticamente (salva se almeno hai ffatto una modifica)
  onBlur(){
    if(!this.isNeverTouched){
      const element: HTMLElement | null = document.querySelector('.blank-container');
      if(element){
        const html = element.innerHTML
        this.service.saveText(html)
      }
    }
  }
}
