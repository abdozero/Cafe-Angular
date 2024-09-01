import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderrComponent } from './orderr.component';

describe('OrderrComponent', () => {
  let component: OrderrComponent;
  let fixture: ComponentFixture<OrderrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
