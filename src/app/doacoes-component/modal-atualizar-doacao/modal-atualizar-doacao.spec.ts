import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarDoacao } from './modal-atualizar-doacao';

describe('ModalAtualizarDoacao', () => {
  let component: ModalAtualizarDoacao;
  let fixture: ComponentFixture<ModalAtualizarDoacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtualizarDoacao],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAtualizarDoacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
