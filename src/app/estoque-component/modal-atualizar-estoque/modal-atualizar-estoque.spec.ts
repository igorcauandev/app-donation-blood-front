import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarEstoque } from './modal-atualizar-estoque';

describe('ModalAtualizarEstoque', () => {
  let component: ModalAtualizarEstoque;
  let fixture: ComponentFixture<ModalAtualizarEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtualizarEstoque],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAtualizarEstoque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
