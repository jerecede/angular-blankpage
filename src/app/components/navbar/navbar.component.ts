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

  modeToChange(){
    this.service.changeMode();
  }

  textToDownload(){
    // const element: HTMLElement | null = document.querySelector('.blank-container');
    // if (element) {
    //   const text = element.innerText;
    //   this.service.loadText(text,0);
    //   this.service.downloadText();
    // }
  }
}
