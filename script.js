document.addEventListener('DOMContentLoaded', function() {
    // --- MENU HAMBURGER ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Ferme le menu si un lien est cliqué (utile pour les SPA)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Initialisation de AOS
    AOS.init({
        duration: 800, // Durée de l'animation en ms
        once: true,    // Les animations ne se déclenchent qu'une seule fois au défilement
    });

    // --- GESTION DES VIDÉOS AVEC BOUTON PLAY PERSONNALISÉ ---
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        const videoId = button.dataset.videoId;
        const video = document.getElementById(videoId);
        const videoWrapper = button.closest('.video-player-wrapper');

        if (!video || !videoWrapper) {
            console.error('Vidéo ou wrapper non trouvé pour le bouton play:', videoId);
            return;
        }

        video.controls = false;

        button.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
                videoWrapper.classList.add('playing');
                video.controls = true;
            } else {
                video.pause();
            }
        });

        video.addEventListener('play', () => {
            videoWrapper.classList.add('playing');
            video.controls = true;
        });

        video.addEventListener('pause', () => {
            videoWrapper.classList.remove('playing');
            video.controls = false;
        });

        video.addEventListener('ended', () => {
            videoWrapper.classList.remove('playing');
            video.controls = false;
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});