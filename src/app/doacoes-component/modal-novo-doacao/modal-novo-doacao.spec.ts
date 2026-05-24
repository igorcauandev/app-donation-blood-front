import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoDoacao } from './modal-novo-doacao';

describe('ModalNovoDoacao', () => {
  let component: ModalNovoDoacao;
  let fixture: ComponentFixture<ModalNovoDoacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNovoDoacao],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNovoDoacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
