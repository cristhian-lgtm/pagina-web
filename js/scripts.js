/* ========================================
   SCRIPTS PERSONALIZADOS - Hotel La Herradura
   ======================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hotel La Herradura - Sitio web cargado exitosamente');
    initializeApp();
    initializeScrollSpyNavigation();
    initializeFormValidation();
    initializeReservationButtons();
    initializeRoomCarousel();
});

function initializeApp() {
    console.log('Inicializando aplicacion...');
    updateActiveNavLink();
}

function initializeRoomCarousel() {
    const carouselElement = document.getElementById('roomCarousel');
    if (!carouselElement || typeof bootstrap === 'undefined') {
        return;
    }

    new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
        pause: 'hover',
        wrap: true
    });
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
}

function initializeScrollSpyNavigation() {
    console.log('ScrollSpy navigation activado');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });
}

function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const telefonoInput = document.getElementById('telefono');
        const fechaIngresoInput = document.getElementById('fechaIngreso');
        const fechaSalidaInput = document.getElementById('fechaSalida');
        const cantidadPersonasInput = document.getElementById('cantidadPersonas');
        const mensajeInput = document.getElementById('mensaje');

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const fechaIngreso = fechaIngresoInput.value;
        const fechaSalida = fechaSalidaInput.value;
        const cantidadPersonas = cantidadPersonasInput.value;
        const mensaje = mensajeInput.value.trim();

        const soloLetras = /^[A-Za-zÀ-ÿ\s]+$/;
        const soloNumeros = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre || !email || !telefono || !fechaIngreso || !fechaSalida || !cantidadPersonas) {
            const text = 'Por favor, completa todos los campos requeridos.';
            console.error(text);
            showAlert(text, 'danger');
            return;
        }

        if (!soloLetras.test(nombre)) {
            const text = 'Error: el nombre solo puede contener letras.';
            console.error(text);
            showAlert(text, 'danger');
            return;
        }

        if (!emailRegex.test(email)) {
            const text = 'Por favor, ingresa un email valido.';
            console.error(text);
            showAlert(text, 'danger');
            return;
        }

        const telefonoSinEspacios = telefono.replace(/\s+/g, '');
        if (!soloNumeros.test(telefonoSinEspacios)) {
            const text = 'Error: el teléfono solo debe contener números.';
            console.error(text);
            showAlert(text, 'danger');
            return;
        }

        if (new Date(fechaIngreso) >= new Date(fechaSalida)) {
            const text = 'Error: la fecha de salida debe ser posterior a la fecha de ingreso.';
            console.error(text);
            showAlert(text, 'danger');
            return;
        }

        console.log('Formulario valido. Datos:', { nombre, email, telefono: telefonoSinEspacios, fechaIngreso, fechaSalida, cantidadPersonas, mensaje });
        showAlert('Mensaje enviado exitosamente. Nos comunicaremos pronto.', 'success');
        contactForm.reset();
    });
}

function initializeReservationButtons() {
    const reservationButtons = document.querySelectorAll('.card .btn-success');
    reservationButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            if (!card) {
                return;
            }
            const roomTitleElement = card.querySelector('.card-title');
            const roomPriceElement = card.querySelector('.h6');
            const roomTitle = roomTitleElement ? roomTitleElement.textContent.trim() : 'Habitación';
            const roomPrice = roomPriceElement ? roomPriceElement.textContent.trim() : '';
            const msg = 'Has seleccionado: ' + roomTitle + ' ' + roomPrice + '. Redirigiendo a reservacion...';
            console.log('Reservacion iniciada para:', roomTitle, roomPrice);
            showAlert(msg, 'info');
        });
    });
}

function showAlert(message, type) {
    type = type || 'info';
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type + ' alert-dismissible fade show';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>';

    const feedbackContainer = document.getElementById('form-feedback');
    if (feedbackContainer) {
        feedbackContainer.innerHTML = '';
        feedbackContainer.appendChild(alertDiv);
    } else {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.insertBefore(alertDiv, mainElement.firstChild);
        }
    }

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function loadUserPreferences() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

loadUserPreferences();
