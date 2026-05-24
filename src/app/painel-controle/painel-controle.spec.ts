import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelControle } from './painel-controle';

describe('PainelControle', () => {
  let component: PainelControle;
  let fixture: ComponentFixture<PainelControle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelControle],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelControle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
