
// Función para mostrar un modal
function mostrarModal(formulario) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('contenidoModal');
    
    // Lógica para cargar contenido dinámicamente (por ahora un mensaje temporal)
    switch (formulario) {
        case 'crearUsuario':
            contenido.innerHTML = '<h2>Crear Usuario</h2><p>(Aquí irá el formulario de creación de usuario)</p>';
            break;
        case 'verUsuarios':
            contenido.innerHTML = '<h2>Ver Usuarios</h2><p>(Aquí irá la tabla de usuarios registrados)</p>';
            break;
        case 'crearCliente':
            contenido.innerHTML = '<h2>Registrar Cliente</h2><p>(Aquí irá el formulario de registro de clientes)</p>';
            break;
        case 'verClientes':
            contenido.innerHTML = '<h2>Ver Clientes</h2><p>(Aquí irá la tabla de clientes registrados)</p>';
            break;
        case 'crearCotizacion':
            contenido.innerHTML = '<h2>Crear Cotización</h2><p>(Aquí irá el formulario para crear cotizaciones)</p>';
            break;
        case 'verCotizaciones':
            contenido.innerHTML = '<h2>Ver Cotizaciones</h2><p>(Aquí irá la lista de cotizaciones)</p>';
            break;
        case 'agendarVisita':
            contenido.innerHTML = '<h2>Agendar Visita</h2><p>(Aquí irá el formulario para agendar visitas)</p>';
            break;
        case 'verAgenda':
            contenido.innerHTML = '<h2>Ver Agenda</h2><p>(Aquí irá la visualización de agenda)</p>';
            break;
        case 'crearProyecto':
            contenido.innerHTML = '<h2>Crear Proyecto</h2><p>(Aquí irá el formulario de creación de proyectos)</p>';
            break;
        case 'verProyectos':
            contenido.innerHTML = '<h2>Ver Proyectos</h2><p>(Aquí irá la lista de proyectos)</p>';
            break;
        case 'registroInventarioGeneral':
            contenido.innerHTML = '<h2>Registro de Inventario General</h2><p>(Formulario para registrar inventario general)</p>';
            break;
        case 'registroFinancieroGeneral':
            contenido.innerHTML = '<h2>Registro Financiero General</h2><p>(Formulario para registrar movimientos financieros generales)</p>';
            break;
        case 'registroProyectoActividad':
            contenido.innerHTML = '<h2>Registro por Proyecto/Actividad</h2><p>(Formulario para registrar movimientos por proyecto o actividad)</p>';
            break;
        case 'crearFactura':
            contenido.innerHTML = '<h2>Crear Factura</h2><p>(Formulario para crear facturación)</p>';
            break;
        case 'verFacturas':
            contenido.innerHTML = '<h2>Ver Facturación</h2><p>(Tabla de facturación)</p>';
            break;
        case 'registrarGarantia':
            contenido.innerHTML = '<h2>Registrar Garantía</h2><p>(Formulario para registrar garantías)</p>';
            break;
        case 'verGarantias':
            contenido.innerHTML = '<h2>Ver Garantías</h2><p>(Tabla de garantías registradas)</p>';
            break;
        case 'registroImpuestos':
            contenido.innerHTML = '<h2>Registro de Impuestos</h2><p>(Formulario para registrar impuestos)</p>';
            break;
        case 'verImpuestos':
            contenido.innerHTML = '<h2>Ver Impuestos</h2><p>(Visualización de impuestos registrados)</p>';
            break;
        case 'visualizarInventario':
            contenido.innerHTML = '<h2>Visualizar Inventario</h2><p>(Listado actual de inventario disponible)</p>';
            break;
        case 'verReportesMovimientos':
            contenido.innerHTML = '<h2>Ver Reportes de Movimientos</h2><p>(Reportes financieros e inventarios)</p>';
            break;
        case 'verEstadosFinancieros':
            contenido.innerHTML = '<h2>Ver Estados Financieros</h2><p>(Resumen de estados financieros)</p>';
            break;
        case 'parametrosGenerales':
            contenido.innerHTML = '<h2>Parámetros Generales</h2><p>(Configuraciones generales del sistema)</p>';
            break;
        case 'rolesSeguridad':
            contenido.innerHTML = '<h2>Roles y Seguridad</h2><p>(Gestión de roles y políticas de seguridad)</p>';
            break;
        default:
            contenido.innerHTML = '<h2>Funcionalidad en desarrollo</h2>';
    }

    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Función de ejemplo para cerrar sesión
function cerrarSesion() {
    alert('Sesión cerrada exitosamente.');
    // Aquí puedes agregar redirección o limpieza de sesión si quieres
}
