import { effect, inject, Injectable, Renderer2, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlankpageService {

  idTimeOut = -1;
  isDark = signal(false);

  currentStyles = {
    'background-color' : this.isDark() ? 'black' : 'white',
    'color' : this.isDark() ? 'white' : 'black'
  }

  loadText(text: string, timer: number) {
    if (this.idTimeOut !== -1) {
      window.clearTimeout(this.idTimeOut)
    }
    this.idTimeOut = window.setTimeout(() => {
      this.saveText(text);
    }, timer);
  }

  saveText(text: string) {
    localStorage.setItem("savedText", text)
  }

  getText() {
    const text = localStorage.getItem("savedText");
    return text;
  }

  clearText(){
    localStorage.removeItem("savedText");
  }

  changeMode() {
    this.isDark.set(!this.isDark());
  }

  downloadText() {
    // const text = this.getText();
    // if(text && text !== ''){
    //   const blob = new Blob([text], { type: 'text/plain' });
    //   const url = window.URL.createObjectURL(blob);

    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = 'textfromjere.txt';
    //   link.click();

    //   window.URL.revokeObjectURL(url);
    // }
  }

  constructor() {
    effect(() => {
      this.currentStyles = {
        'background-color' : this.isDark() ? 'black' : 'white',
        'color' : this.isDark() ? 'white' : 'black'
      }
    })
  }
}
