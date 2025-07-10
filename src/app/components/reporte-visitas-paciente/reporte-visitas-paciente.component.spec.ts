import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVisitasPacienteComponent } from './reporte-visitas-paciente.component';

describe('ReporteVisitasPacienteComponent', () => {
  let component: ReporteVisitasPacienteComponent;
  let fixture: ComponentFixture<ReporteVisitasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteVisitasPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVisitasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
