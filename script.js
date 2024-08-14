const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const jumpSound = document.getElementById("jumpSound");
const gameOverSound = document.getElementById("gameOverSound");
const scoreDisplay = document.getElementById("score");

// Variabel untuk menyimpan jumlah poin
let points = 0;
let gameInterval;
let pointInterval; // Menyimpan interval poin

// Fungsi untuk memperbarui tampilan skor
function updateScoreDisplay() {
    scoreDisplay.textContent = `Poin: ${points}`;
}

// Fungsi untuk menambah poin
function addPoints(amount) {
    points += amount;
    updateScoreDisplay(); // Memperbarui tampilan skor setelah menambah poin
    console.log(`Poin ditambahkan: ${amount}. Total poin: ${points}`);
}

// Fungsi untuk melompat
function jump() {
    console.log("Jump function called");
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

// Mulai interval untuk menambah poin setiap 1 milidetik
function startGame() {
    pointInterval = setInterval(function() {
        addPoints(1); // Menambah 1 poin setiap 1 milidetik
    }, 1); // Interval waktu dalam milidetik
}

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
        clearInterval(pointInterval); // Hentikan penambahan poin saat game over
        console.log(`Total poin akhir: ${points}`);
        clearInterval(isAlive);
        cactus.style.animation = 'none'; // Hentikan animasi kaktus
    }
}, 10);

// Mulai permainan dan interval poin
startGame();
