import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetsComponent } from './dets.component';

describe('DetsComponent', () => {
  let component: DetsComponent;
  let fixture: ComponentFixture<DetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
