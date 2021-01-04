import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert-component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = null;
  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    setTimeout(() => {
      /* this.content = '<p>Hello There!</p>' */
      const alertElement = createCustomElement(AlertComponent,{injector});
      customElements.define('my-alert-element', alertElement);
      this.content = domSanitizer.bypassSecurityTrustHtml
        ("<my-alert-element message='Rendered Dynamcially'></my-alert-element>");
    }, 1000)
  }
}
