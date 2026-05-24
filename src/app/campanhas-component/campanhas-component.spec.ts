import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhasComponent } from './campanhas-component';

describe('CampanhasComponent', () => {
  let component: CampanhasComponent;
  let fixture: ComponentFixture<CampanhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampanhasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampanhasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
