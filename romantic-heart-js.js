let clickCount = 0;
const maxClicks = 20;
const heartContainer = document.getElementById('heartContainer');
const progressFill = document.getElementById('progressFill');
const clickCountElement = document.getElementById('clickCount');
const loveCard = document.getElementById('loveCard');
const loveAudio = document.getElementById('loveAudio');
const audioStatus = document.getElementById('audioStatus');
const closeBtn = document.getElementById('closeBtn');
const playButton = document.getElementById('playButton');

// Crear brillos de fondo
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// Crear corazones flotantes
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-hearts';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Manejar clics en el corazón
heartContainer.addEventListener('click', function(e) {
    if (clickCount < maxClicks) {
        clickCount++;
        clickCountElement.textContent = clickCount;
        
        // Actualizar barra de progreso
        const progress = (clickCount / maxClicks) * 100;
        progressFill.style.width = progress + '%';
        
        // Crear corazón flotante en la posición del clic
        createFloatingHeart(e.pageX, e.pageY);
        
        // Actualizar estado del corazón
        updateHeartState();
        
        // Vibrar el corazón
        heartContainer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heartContainer.style.transform = 'scale(1)';
        }, 100);
        
        // Completar el corazón
        if (clickCount === maxClicks) {
            setTimeout(() => {
                showLoveCard();
            }, 1000);
        }
    }
});

function updateHeartState() {
    // El corazón ya está completo, solo agregamos efectos de progreso
    if (clickCount === maxClicks) {
        heartContainer.style.animation = 'heartBeat 0.8s ease';
        setTimeout(() => {
            heartContainer.style.animation = '';
        }, 800);
    }
}

function showLoveCard() {
    loveCard.classList.add('show');
    // Crear lluvia de corazones
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart(
                Math.random() * window.innerWidth,
                window.innerHeight + 20
            );
        }, i * 200);
    }
    
    // Intentar reproducir automáticamente el audio
    setTimeout(() => {
        // Preparar el audio para reproducir
        loveAudio.load();
        loveAudio.play().then(() => {
            playButton.innerHTML = '⏸️ Pausar Canción';
            updateAudioStatus('🎵 Reproduciendo tu canción de amor...');
            
            // Manejar cuando termine la canción
            loveAudio.onended = () => {
                playButton.innerHTML = '🎵 ¡Te Dedico esta Canción!';
                updateAudioStatus('🎵 Canción terminada');
            };
            
            // Cambiar función del botón a pausar
            playButton.onclick = () => {
                loveAudio.pause();
                playButton.innerHTML = '🎵 ¡Te Dedico esta Canción!';
                playButton.onclick = playLoveSong;
                updateAudioStatus('⏸️ Audio pausado');
            };
            
        }).catch(error => {
            console.log('Reproducción automática bloqueada. El usuario debe hacer clic:', error);
            // Mostrar mensaje para que el usuario haga clic
            playButton.innerHTML = '🎵 ¡Haz clic para escuchar!';
            playButton.style.animation = 'pulse 1s infinite';
            updateAudioStatus('🎵 Haz clic en el botón para escuchar tu canción');
        });
    }, 1500);
}

function closeLoveCard() {
    loveCard.classList.remove('show');
    // Pausar audio si se está reproduciendo
    if (!loveAudio.paused) {
        loveAudio.pause();
        updateAudioStatus('Audio pausado');
    }
}

function updateAudioStatus(message) {
    audioStatus.textContent = message;
    setTimeout(() => {
        audioStatus.textContent = '';
    }, 3000);
}

function playLoveSong() {
    const originalText = playButton.innerHTML;
    
    // Quitar animación de pulso si existe
    playButton.style.animation = '';
    
    // Cargar y reproducir el audio
    loveAudio.load();
    loveAudio.play().then(() => {
        playButton.innerHTML = '⏸️ Pausar Canción';
        updateAudioStatus('🎵 Reproduciendo "Lost in the Fire"...');
        
        // Manejar cuando termine la canción
        loveAudio.onended = () => {
            playButton.innerHTML = '🎵 ¡Te Dedico esta Canción!';
            playButton.onclick = playLoveSong;
            updateAudioStatus('🎵 Canción terminada');
        };
        
        // Cambiar función del botón a pausar
        playButton.onclick = () => {
            loveAudio.pause();
            playButton.innerHTML = '🎵 ¡Te Dedico esta Canción!';
            playButton.onclick = playLoveSong;
            updateAudioStatus('⏸️ Audio pausado');
        };
        
    }).catch(error => {
        console.log('Error al reproducir audio:', error);
        updateAudioStatus('⚠️ Error al reproducir audio. Verifica el archivo.');
        
        // Intentar con una técnica alternativa
        setTimeout(() => {
            try {
                loveAudio.volume = 1.0;
                loveAudio.currentTime = 0;
                const playPromise = loveAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        playButton.innerHTML = '⏸️ Pausar Canción';
                        updateAudioStatus('🎵 Reproduciendo "Lost in the Fire"...');
                    });
                }
            } catch (e) {
                console.log('Segundo intento fallido:', e);
                updateAudioStatus('🎵 Haz clic aquí para reproducir manualmente');
            }
        }, 500);
    });
    
    // Crear más efectos visuales
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
}

function showFallbackMessage() {
    const originalText = playButton.innerHTML;
    
    playButton.innerHTML = '🎵 ¡Reproduciendo...!';
    playButton.disabled = true;
    updateAudioStatus('🎵 Imagina tu canción favorita aquí...');
    
    setTimeout(() => {
        playButton.innerHTML = '💕 ¡Gracias por escuchar!';
        setTimeout(() => {
            playButton.innerHTML = originalText;
            playButton.disabled = false;
        }, 3000);
    }, 5000);
    
    setTimeout(() => {
        alert('🎵 Para escuchar una canción real, coloca tu archivo de audio en la carpeta del proyecto y actualiza la ruta en el código HTML. 🎵\n\n"Eres la melodía de mi corazón, la letra de mis sueños y el ritmo de mi alma. Te amo infinitamente." 💖');
    }, 1000);
}

// Event listeners
closeBtn.addEventListener('click', closeLoveCard);
playButton.addEventListener('click', playLoveSong);

// Manejar errores de audio
loveAudio.onerror = () => {
    console.log('Error al cargar el archivo de audio');
    updateAudioStatus('⚠️ No se pudo cargar el audio');
};

// Inicializar efectos
createSparkles();

// Efecto de corazones aleatorios cada cierto tiempo
setInterval(() => {
    if (clickCount < maxClicks) {
        createFloatingHeart(
            Math.random() * window.innerWidth,
            window.innerHeight + 20
        );
    }
}, 3000);