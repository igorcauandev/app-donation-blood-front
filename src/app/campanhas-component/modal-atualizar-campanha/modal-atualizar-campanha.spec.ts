import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarCampanha } from './modal-atualizar-campanha';

describe('ModalAtualizarCampanha', () => {
  let component: ModalAtualizarCampanha;
  let fixture: ComponentFixture<ModalAtualizarCampanha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtualizarCampanha],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAtualizarCampanha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
