import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LogoutComponent } from './logout.component';
import { CartService } from '../../shared/services/cart.service';


class AuthServiceMock {
  logout(): boolean {
    return true;
  }
}
class CartServiceMock {
  clearCart(): void {
  }
}

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ LogoutComponent ],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: CartService, useClass: CartServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
