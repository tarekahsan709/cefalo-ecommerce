import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { RegisterComponent } from './register.component';

class RouterMock {}

class UserServiceMock {}

describe('Component: Register', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [RegisterComponent],
        providers: [
          { provide: Router, useClass: RouterMock },
          { provide: UserService, useClass: UserServiceMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Register');
  });

  it('should display the email and password inputs', () => {
    const [inputEmail, inputPassword] = fixture.debugElement.queryAll(
      By.css('input')
    );
    expect(inputEmail.nativeElement).toBeTruthy();
    expect(inputPassword.nativeElement).toBeTruthy();
    expect(inputEmail.nativeElement.value).toBeFalsy();
    expect(inputPassword.nativeElement.value).toBeFalsy();
  });

  it('should display the register button', () => {
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Register');
    expect(el.disabled).toBeTruthy();
  });
});
