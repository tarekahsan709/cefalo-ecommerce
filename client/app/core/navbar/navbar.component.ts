import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewChecked {

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

}
