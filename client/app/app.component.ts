import { AfterViewChecked, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {

  constructor() { }

  ngAfterViewChecked(): void {
  }

}
