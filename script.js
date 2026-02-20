/**
 * LÓGICA DEL SISTEMA UNICORNIO
 * Desarrollado para Centro Comercial Unicornio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selección de elementos clave
    const track = document.getElementById('track');
    const dots = document.querySelectorAll('.nav-dot');
    const slides = document.querySelectorAll('.slide-item');
    
    // 2. Variables de estado
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 4000; // 4 segundos exactos
    let autoPlayTimer;

    /**
     * Función para mover el carrusel a una posición específica
     * @param {number} index - Índice de la imagen destino
     */
    const goToSlide = (index) => {
        // Validación de límites
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        // Ejecutar desplazamiento (Cálculo de porcentaje)
        // Como hay 3 imágenes, cada una ocupa 33.333% del track
        const movePercentage = currentIndex * (100 / totalSlides);
        track.style.transform = `translateX(-${movePercentage}%)`;

        // Actualizar indicadores visuales (dots)
        updateDots();
        
        // Log de seguimiento técnico
        console.log(`[Sistema] Navegando a diapositiva: ${currentIndex + 1}`);
    };

    /**
     * Actualiza la clase activa de los puntos de navegación
     */
    const updateDots = () => {
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    /**
     * Inicia el ciclo automático de 4 segundos
     */
    const startAutoPlay = () => {
        // Limpiamos cualquier timer previo para evitar aceleraciones
        stopAutoPlay();
        
        autoPlayTimer = setInterval(() => {
            console.log("[Sistema] Transición automática ejecutada.");
            goToSlide(currentIndex + 1);
        }, slideDuration);
    };

    /**
     * Detiene el ciclo automático
     */
    const stopAutoPlay = () => {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }
    };

    // 3. Event Listeners para interacción humana
    
    // Clic en los puntos de navegación
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const targetPos = parseInt(e.target.getAttribute('data-pos'));
            goToSlide(targetPos);
            
            // Al interactuar el usuario, reiniciamos el temporizador
            startAutoPlay();
        });
    });

    // Pausar el carrusel cuando el mouse está encima
    const viewport = document.getElementById('viewport');
    
    viewport.addEventListener('mouseenter', () => {
        stopAutoPlay();
        console.log("[Sistema] Pausa: Usuario explorando imagen.");
    });

    viewport.addEventListener('mouseleave', () => {
        startAutoPlay();
        console.log("[Sistema] Reanudando bucle de 4s.");
    });

    // 4. Soporte para gestos táctiles básicos (Mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);

    const handleGesture = () => {
        if (touchEndX < touchStartX - 50) {
            // Deslizar a la izquierda -> Siguiente
            goToSlide(currentIndex + 1);
        }
        if (touchEndX > touchStartX + 50) {
            // Deslizar a la derecha -> Anterior
            goToSlide(currentIndex - 1);
        }
        startAutoPlay();
    };

    // 5. Inicialización
    console.log("%c Centro Comercial Unicornio - Sistema de Visualización Cargado ", 
                "background: #ff75c3; color: white; font-weight: bold;");
    startAutoPlay();
});
