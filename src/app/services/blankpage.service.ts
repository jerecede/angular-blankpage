import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlankpageService {

  saveText(text: string) {
    localStorage.setItem("savedText", text)
  }

  clearText(){
    localStorage.removeItem("savedText");
  }

  getText(){
    return localStorage.getItem("savedText");
  }

  // downloadText() {
  //   const text = this.getText();
  //   if(text){
  //     const blob = new Blob([text], { type: 'text/plain' });
  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'textfromjere.txt';
  //     link.click();

  //     window.URL.revokeObjectURL(url);
  //   }
  // }

  downloadText() {
    const text = this.getText();
    if (text) {
      const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
      const link = document.createElement('a');
      link.href = dataUri;
      link.download = 'blackpage_text.txt';
      link.click();
    }
  }
}
