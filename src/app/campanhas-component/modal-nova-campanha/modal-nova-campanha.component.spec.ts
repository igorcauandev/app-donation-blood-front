import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovaCampanhaComponent } from './modal-nova-campanha.component';

describe('ModalNovaCampanhaComponent', () => {
  let component: ModalNovaCampanhaComponent;
  let fixture: ComponentFixture<ModalNovaCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNovaCampanhaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNovaCampanhaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
