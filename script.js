// Set the birthday date (February 17th of the current year)
const birthday = new Date(new Date().getFullYear(), 1, 17); // Month 1 = Feb (0-indexed)

// Password (set to 1702)
const correctPassword = "1702";

// Countdown function
function updateCountdown() {
    const now = new Date();
    const timeLeft = birthday - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('countdown').innerText = "It's time! Enter the password.";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Slideshow variables
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
let slideshowInterval;

// Function to show slides
function showSlides(n) {
    if (slides.length === 0) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[slideIndex].classList.add('active');
}

// Change slide function
function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
    resetSlideshow();
}

// Auto-play slideshow
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 3000); // 3 seconds per slide
}

// Reset slideshow
function resetSlideshow() {
    clearInterval(slideshowInterval);
    startSlideshow();
}

// Unlock button event
document.getElementById('unlock-btn').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === correctPassword) {
        document.getElementById('countdown-container').style.display = 'none';
        document.getElementById('surprise').style.display = 'block';
        
        // Play birthday music
        document.getElementById('bg-music').play();
        
        // Trigger vibration or screen shake
        if (navigator.vibrate) {
            navigator.vibrate(500);
        }
        document.body.classList.add('vibrate');
        
        // Start fireworks with sound
        startFireworks();
        
        // Start slideshow
        showSlides(slideIndex);
        startSlideshow();
    } else {
        alert("Wrong password! Try again.");
    }
});

// Pause slideshow on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => clearInterval(slideshowInterval));
document.querySelector('.slideshow-container').addEventListener('mouseleave', startSlideshow);

// Fireworks with sound
function startFireworks() {
    const sound = new Audio('assets/firework_sound.mp3'); // Your firework sound
    sound.volume = 0.5;
    sound.play(); // Play on unlock
    
    // Visual fireworks with confetti
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } }), 500);
    setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } }), 1000);
    setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }), 1500);
}