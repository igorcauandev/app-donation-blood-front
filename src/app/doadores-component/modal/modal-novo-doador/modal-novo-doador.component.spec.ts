import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoDoadorComponent } from './modal-novo-doador.component';

describe('ModalNovoDoadorComponent', () => {
  let component: ModalNovoDoadorComponent;
  let fixture: ComponentFixture<ModalNovoDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNovoDoadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNovoDoadorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
