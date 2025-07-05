# Clinica Online

## ¿Qué es Clinica Online?

Clinica Online es una aplicación web desarrollada en Angular para la gestión integral de una clínica médica. Permite administrar pacientes, especialistas, turnos y la historia clínica de manera intuitiva y centralizada.

---

## Estructura de secciones y navegación

La aplicación se organiza en un menú lateral que da acceso a las siguientes secciones principales:

1. **Dashboard**

   * **Descripción:** Vista general con estadísticas clave (número de turnos pendientes, pacientes activos, especialistas disponibles).
   * **Acceso:** Ícono de inicio en la barra lateral.
   * **Contenido:** Tarjetas con conteos, gráficos de turnos mensuales.

2. **Pacientes**

   * **Descripción:** Gestión de pacientes.
   * **Acceso:** Menú lateral > Pacientes.
   * **Contenido:**

     * Listado de pacientes con filtros por nombre, DNI o especialista.
     * Botón para agregar o editar datos de un paciente.
     * Formulario reactivo con campos: Nombre, Apellido, Fecha de nacimiento, DNI, Contacto.

3. **Especialistas**

   * **Descripción:** Información y control de especialistas.
   * **Acceso:** Menú lateral > Especialistas.
   * **Contenido:**

     * Listado de especialistas.
     * Configuración de horarios y especialidades (botones múltiples para seleccionar especialidades).

4. **Turnos**

   * **Descripción:** Solicitud y administración de turnos.
   * **Acceso:** Menú lateral > Turnos.
   * **Contenido:**

     * Selector de especialista, día y horario (botones con selección múltiple).
     * Calendario con fechas disponibles.
     * Listado de turnos programados.

5. **Historia Clínica**

   * **Descripción:** Registro de antecedentes y datos dinámicos.
   * **Acceso:** Desde el perfil de cada paciente > Historia Clínica.
   * **Contenido:**

     * Campos estáticos: Alergias, Medicación habitual.
     * Datos dinámicos: hasta 3 pares clave-valor (reemplazar `alert` por SweetAlert para validaciones).
     * Toggle Sí/No para preguntas específicas.

---

## Pantallas y ejemplos visuales

> *Nota:* Agrega aquí las capturas reales dentro de `docs/screenshots/`.

| Sección              | Captura de pantalla                                              |
| -------------------- | ---------------------------------------------------------------- |
| Dashboard            | ![Dashboard](docs/screenshots/dashboard.png)                     |
| Listado de Pacientes | ![Pacientes](docs/screenshots/pacientes.png)                     |
| Formulario Paciente  | ![Formulario Paciente](docs/screenshots/formulario-paciente.png) |
| Especialistas        | ![Especialistas](docs/screenshots/especialistas.png)             |
| Solicitar Turno      | ![Solicitar Turno](docs/screenshots/solicitar-turno.png)         |
| Historia Clínica     | ![Historia Clínica](docs/screenshots/historia-clinica.png)       |

---

## Detalles de cada sección

A continuación se describen qué componentes y servicios intervienen en cada módulo:

### 1. Dashboard

* **Componentes:** `DashboardComponent`, `CardStatsComponent`, `TurnosChartComponent`.
* **Servicios:** `StatsService` (obtiene totales de turnos, pacientes, especialistas).

### 2. Pacientes

* **Componentes:** `PacientesComponent`, `PacienteDetalleComponent`.
* **Servicios:** `PacienteService` (CRUD contra Firestore).

### 3. Especialistas

* **Componentes:** `EspecialistasComponent`, `EspecialidadSelectorComponent`.
* **Servicios:** `EspecialistaService`.

### 4. Turnos

* **Componentes:** `TurnosComponent`, `SolicitarTurnoComponent`, `TurnoListComponent`.
* **Servicios:** `TurnoService`.

### 5. Historia Clínica

* **Componentes:** `HistoriaClinicaComponent`, `DatoDinamicoComponent`.
* **Servicios:** `HistoriaService`.

---

## Cómo contribuir

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/nachomonllor/Clinica_Online_2025
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:

   ```bash
   ng serve
   ```
4. Crear una rama para tu feature o bugfix:

   ```bash
   git checkout -b feature/nueva-seccion
   ```
5. Generar Pull Request describiendo los cambios.




