import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoEstoque } from './modal-novo-estoque';

describe('ModalNovoEstoque', () => {
  let component: ModalNovoEstoque;
  let fixture: ComponentFixture<ModalNovoEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNovoEstoque],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNovoEstoque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
