document.addEventListener('DOMContentLoaded', () => {
    // Initialisation d'AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Durée de l'animation en ms
        once: true, // N'animer qu'une seule fois l'élément
        mirror: false, // Ne pas répéter l'animation lors du défilement vers le haut
    });

    // Gestion du menu hamburger (unifié pour toutes les tailles d'écran)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change l'icône du hamburger (nécessite Font Awesome)
        const icon = hamburgerMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Icône de fermeture (X)
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Icône de menu (barres)
        }
    });

    // Fermer le menu si un lien est cliqué
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburgerMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Gestion de la lecture vidéo
    document.querySelectorAll('.video-player-wrapper').forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playButton = wrapper.querySelector('.play-button');

        // Afficher/cacher le bouton play selon l'état de la vidéo
        const updatePlayButton = () => {
            if (video.paused || video.ended) {
                playButton.style.display = 'flex'; // Affiche le bouton
                wrapper.classList.remove('playing');
            } else {
                playButton.style.display = 'none'; // Cache le bouton
                wrapper.classList.add('playing');
            }
        };

        // Met à jour au chargement et après des événements de la vidéo
        video.addEventListener('play', updatePlayButton);
        video.addEventListener('pause', updatePlayButton);
        video.addEventListener('ended', updatePlayButton);
        video.addEventListener('canplay', updatePlayButton); // Quand la vidéo est prête à être jouée

        // Déclencher la mise à jour une fois au chargement initial
        updatePlayButton();

        playButton.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Contrôle la lecture/pause en cliquant sur la vidéo elle-même
        video.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});