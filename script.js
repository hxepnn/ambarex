const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const jumpSound = document.getElementById("jumpSound");
const gameOverSound = document.getElementById("gameOverSound");

// Fungsi untuk melompat
function jump() {
    console.log("Jump function called"); // Menambahkan log untuk debug
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        jumpSound.play();

        setTimeout(function() {
            dino.classList.remove("jump");
        }, 300); // Durasi lompatan
    }
}

// Mengatur kontrol untuk melompat dengan keyboard
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        jump();
    }
});

// Mengatur kontrol untuk melompat dengan sentuhan
document.addEventListener("touchstart", function(event) {
    jump();
    event.preventDefault(); // Mencegah efek sentuh default seperti scroll
});

// Cek apakah dinosaurus bertabrakan dengan kaktus
let isAlive = setInterval(function() {
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();
    
    // Menambahkan log untuk memeriksa posisi dinosaurus dan kaktus
    console.log("Dino Rect:", dinoRect);
    console.log("Cactus Rect:", cactusRect);

    if (
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.bottom > cactusRect.top &&
        dinoRect.top < cactusRect.bottom
    ) {
        gameOverSound.play();
        alert("Game Over!");
        // Matikan game setelah game over
        clearInterval(isAlive);
        cactus.style.animation = 'none'; // Hentikan animasi kaktus
    }
}, 10);