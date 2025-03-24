import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-estadisticas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estadisticas-admin.component.html',
  styleUrl: './estadisticas-admin.component.css'
})

export class EstadisticasAdminComponent implements OnInit {

  // Datos simulados para el log de ingresos al sistema
  logIngresos: any[] = [
    { usuario: 'Usuario1', fecha: '2025-03-25', hora: '09:00' },
    { usuario: 'Usuario2', fecha: '2025-03-25', hora: '09:30' },
    { usuario: 'Usuario3', fecha: '2025-03-26', hora: '08:45' }
  ];

  // Gráfico: Turnos por especialidad (Ejemplo: Cardiología, Dermatología, Neurología)
  chartDataEspecialidad: ChartData<'bar'> = {
    labels: ['Cardiología', 'Dermatología', 'Neurología'],
    datasets: [
      {
        label: 'Turnos por especialidad',
        data: [12, 9, 5],
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
        borderWidth: 1
      }
    ]
  };

  // Gráfico: Turnos por día (Ejemplo para 5 días)
  chartDataTurnosPorDia: ChartData<'line'> = {
    labels: ['2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', '2025-03-24'],
    datasets: [
      {
        label: 'Turnos por día',
        data: [3, 5, 2, 6, 4],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  // Datos simulados para turnos solicitados y finalizados por médico
  turnosSolicitadosPorMedico: any[] = [
    { medico: 'Dr. Juan Pérez', solicitados: 8 },
    { medico: 'Dra. Marta López', solicitados: 6 }
  ];

  turnosFinalizadosPorMedico: any[] = [
    { medico: 'Dr. Juan Pérez', finalizados: 7 },
    { medico: 'Dra. Marta López', finalizados: 5 }
  ];

  // Opciones generales para los gráficos
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() { }

  ngOnInit(): void {
    // Aquí se cargarían los datos desde un servicio o backend real
  }

  // Función para descargar el log de ingresos en Excel
  descargarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.logIngresos);
    const workbook = { Sheets: { 'LogIngresos': worksheet }, SheetNames: ['LogIngresos'] };
    XLSX.writeFile(workbook, 'log_ingresos.xlsx');
  }

  // Función para descargar el log de ingresos en PDF (con jsPDF y AutoTable)
  descargarPDF(): void {
    const doc = new jsPDF();
    doc.text("Log de Ingresos", 14, 15);
    (doc as any).autoTable({
      head: [['Usuario', 'Fecha', 'Hora']],
      body: this.logIngresos.map(log => [log.usuario, log.fecha, log.hora]),
      startY: 20
    });
    doc.save("log_ingresos.pdf");
  }
}
