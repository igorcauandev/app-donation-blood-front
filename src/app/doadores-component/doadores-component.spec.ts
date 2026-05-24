import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoadoresComponent } from './doadores-component';

describe('DoadoresComponent', () => {
  let component: DoadoresComponent;
  let fixture: ComponentFixture<DoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoadoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoadoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
