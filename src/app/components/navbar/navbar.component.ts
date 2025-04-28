import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { BlankpageService } from '../../services/blankpage.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  service = inject(BlankpageService);

  modeToChange() {
  }

  requestDownloadText() {
    this.service.downloadText();
  }

  //-bisogna far pulizia tag
  //-bisogna aggiungere funzionalita toggle

  //non solo trasforma, ma salva anche i tag nella localstorage
  makeItalic() {
    const selection = window.getSelection(); //prende quello che ho selezionato con il mouse

    if (selection && selection.rangeCount > 0) { //verifica se c'è la selezione, e se c'è almeno una selezione attiva
      const range = selection.getRangeAt(0); //il pezzo di dom selezionato
      const commonAncestor = range.commonAncestorContainer; //cerca la selezione nel dom
      const editableDiv = document.querySelector('.blank-container'); //prendo l'elemento div contenteditable
      if (editableDiv && editableDiv.contains(commonAncestor)) { //controlla se ciò che ho selezionato si trova nel div contenteditable
        if (!range.collapsed) { //controlla se ho selezionato qualcosa, che non sia collassato
          const italic = document.createElement('i'); //creo tag i (italic)
          italic.appendChild(range.extractContents()); //estrae il contenuto selezionato (tagliandolo dal DOM). lo sposta dentro il nuovo <i>.
          range.insertNode(italic); //inserisce il tag i dov'era prima
          selection.removeAllRanges(); //toglie la selezione
        }
      }
    }

    const element: HTMLElement | null = document.querySelector('.blank-container');
    if (element) {
      const html = element.innerHTML
      this.service.saveText(html)
    }
  }

  //non solo trasforma, ma salva anche i tag nella localstorage
  makeBold() {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const commonAncestor = range.commonAncestorContainer;
      const editableDiv = document.querySelector('.blank-container');
      if (editableDiv && editableDiv.contains(commonAncestor)) {
        if (!range.collapsed) {
          const italic = document.createElement('b');
          italic.appendChild(range.extractContents());
          range.insertNode(italic);
          selection.removeAllRanges();
        }
      }
    }

    const element: HTMLElement | null = document.querySelector('.blank-container');
    if (element) {
      const html = element.innerHTML
      this.service.saveText(html)
    }
  }
}