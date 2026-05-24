import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarDoador } from './modal-atualizar-doador';

describe('ModalAtualizarDoador', () => {
  let component: ModalAtualizarDoador;
  let fixture: ComponentFixture<ModalAtualizarDoador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtualizarDoador],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAtualizarDoador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
