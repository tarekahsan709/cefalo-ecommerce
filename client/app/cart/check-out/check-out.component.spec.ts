import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';
import { CheckOutComponent } from './check-out.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DEFAULT_CART, ICart } from '../../shared/models/cart.model';
import { Observable, of } from 'rxjs';

class RouterMock { }
class CartServiceMock {
  getTotalPrice(): Observable<any> {
    return of();
  }
  getCurrentCart(): ICart {
    return DEFAULT_CART;
  }
}
class ToastrServiceMock {}
class BsModalServiceMock {}

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ CheckOutComponent ],
      providers: [
        FormBuilder,
        { provide: Router, useClass: RouterMock },
        { provide: CartService, useClass: CartServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: BsModalService, useClass: BsModalServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
