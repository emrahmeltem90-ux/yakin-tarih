/* ==========================================
   SORU VERİTABANI (YAKIN TARİH)
   ========================================== */
const QUESTIONS = [
  {
    question: "II. Dünya Savaşı hangi yıl sona ermiştir?",
    options: ["1943", "1945", "1948", "1950"],
    answer: 1
  },
  {
    question: "Türkiye Birleşmiş Milletler'e hangi yıl kurucu üye olarak katılmıştır?",
    options: ["1945", "1952", "1960", "1923"],
    answer: 0
  },
  {
    question: "Soğuk Savaş döneminde ABD ile SSCB arasındaki ilk büyük kriz hangisidir?",
    options: ["Kore Savaşı", "Berlin Ablakası", "Küba Füze Krizi", "Vietnam Savaşı"],
    answer: 1
  },
  {
    question: "Kıbrıs Barış Harekâtı hangi yıl gerçekleştirilmiştir?",
    options: ["1967", "1971", "1974", "1980"],
    answer: 2
  },
  {
    question: "Berlin Duvarı hangi yıl yıkılmıştır?",
    options: ["1985", "1989", "1991", "1995"],
    answer: 1
  }
];

/* ==========================================
   OYUN DURUMU (LOCALSTORAGE)
   ========================================== */
const DEFAULT_STATE = {
  coins: 100,
  spinsLeft: 1,
  playerName: "Oyuncu",
  totalScore: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  highScore: 0,
  settings: {
    music: true,
    sfx: true,
    vibration: true
  }
};

let gameState = loadState();

function loadState() {
  const saved = localStorage.getItem('yakin_tarih_game_state');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return { ...DEFAULT_STATE }; }
  }
  return { ...DEFAULT_STATE };
}

function saveState() {
  localStorage.setItem('yakin_tarih_game_state', JSON.stringify(gameState));
  updateUI();
}

/* ==========================================
   SAYFA GEZİNTİSİ (NAVIGATION)
   ========================================== */
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.add('hidden'));

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) targetScreen.classList.remove('hidden');

  const topBar = document.getElementById('top-bar');
  if (screenId === 'screen-landing') {
    topBar.classList.add('hidden');
  } else {
    topBar.classList.remove('hidden');
  }

  updateUI();
}

/* ==========================================
   SORU (QUIZ) MOTORU
   ========================================== */
let currentQuestionIndex = 0;
let currentQuizScore = 0;
let canAnswer = true;

function startQuiz() {
  currentQuestionIndex = 0;
  currentQuizScore = 0;
  showScreen('screen-quiz');
  loadQuestion();
}

function loadQuestion() {
  canAnswer = true;
  const q = QUESTIONS[currentQuestionIndex];

  document.getElementById('quiz-progress').innerText = `Soru ${currentQuestionIndex + 1}/${QUESTIONS.length}`;
  document.getElementById('quiz-score-display').innerText = `Puan: ${currentQuizScore}`;
  document.getElementById('question-text').innerText = q.question;
  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('next-btn').classList.add('hidden');

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(idx, btn);
    container.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, selectedBtn) {
  if (!canAnswer) return;
  canAnswer = false;

  const q = QUESTIONS[currentQuestionIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('quiz-feedback');

  if (selectedIndex === q.answer) {
    selectedBtn.classList.add('correct');
    currentQuizScore += 100;
    gameState.correctAnswers++;
    gameState.totalScore += 100;
    gameState.coins += 10;
    feedback.innerText = "Doğru Cevap! (+100 Puan, +10 Coin)";
    feedback.className = "quiz-feedback correct-text";
  } else {
    selectedBtn.classList.add('wrong');
    allBtns[q.answer].classList.add('correct');
    gameState.wrongAnswers++;
    feedback.innerText = "Yanlış Cevap!";
    feedback.className = "quiz-feedback wrong-text";
  }

  if (gameState.totalScore > gameState.highScore) {
    gameState.highScore = gameState.totalScore;
  }

  saveState();
  feedback.classList.remove('hidden');

  const nextBtn = document.getElementById('next-btn');
  if (currentQuestionIndex < QUESTIONS.length - 1) {
    nextBtn.innerText = "SONRAKİ SORU →";
  } else {
    nextBtn.innerText = "TESTİ BITIR ★";
  }
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  if (currentQuestionIndex < QUESTIONS.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    alert(`Tebrikler! Testi tamamladın. Toplam Puanın: ${currentQuizScore}`);
    showScreen('screen-main-menu');
  }
}

/* ==========================================
   ÇARKFELEK MANTIĞI
   ========================================== */
let canSpin = true;
let currentRotation = 0;

const WHEEL_SLICES = [
  { name: "250 🪙", type: "coin", amount: 250 },
  { name: "TEKRAR", type: "spin", amount: 1 },
  { name: "10 🪙", type: "coin", amount: 10 },
  { name: "25 🪙", type: "coin", amount: 25 },
  { name: "50 🪙", type: "coin", amount: 50 },
  { name: "5 ⭐", type: "star", amount: 5 },
  { name: "100 🪙", type: "coin", amount: 100 },
  { name: "JOKER", type: "joker", amount: 1 }
];

function spinWheel() {
  if (!canSpin) return;

  if (gameState.spinsLeft <= 0) {
    alert("Bugünlük ücretsiz çevirme hakkın bitti!");
    return;
  }

  canSpin = false;
  gameState.spinsLeft--;
  saveState();

  const wheel = document.getElementById('wheel');
  const extraDegrees = Math.floor(Math.random() * 360);
  const totalRotation = currentRotation + 1800 + extraDegrees;
  currentRotation = totalRotation;

  wheel.style.transform = `rotate(${totalRotation}deg)`;

  setTimeout(() => {
    canSpin = true;
    const normalizedDegree = (360 - (totalRotation % 360)) % 360;
    const sliceIndex = Math.floor(normalizedDegree / (360 / WHEEL_SLICES.length));
    const prize = WHEEL_SLICES[sliceIndex];

    if (prize.type === "coin") gameState.coins += prize.amount;
    else if (prize.type === "spin") gameState.spinsLeft += prize.amount;

    alert(`Tebrikler! Ödülün: ${prize.name}`);
    saveState();
  }, 4000);
}

/* ==========================================
   ARAYÜZ GÜNCELLEME VE PROFİL
   ========================================== */
function updateUI() {
  const coinElem = document.getElementById('coin-amount');
  if (coinElem) coinElem.innerText = gameState.coins;

  const spinsElem = document.getElementById('spins-left');
  if (spinsElem) spinsElem.innerText = gameState.spinsLeft;

  const welcomeMsg = document.getElementById('welcome-msg');
  if (welcomeMsg) welcomeMsg.innerText = `Hoş geldin, ${gameState.playerName}!`;

  const nameInput = document.getElementById('player-name');
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = gameState.playerName;
  }

  const total = gameState.correctAnswers + gameState.wrongAnswers;
  const accuracy = total > 0 ? Math.round((gameState.correctAnswers / total) * 100) : 0;

  const accElem = document.querySelector('.accuracy-value');
  if (accElem) accElem.innerText = `${accuracy}%`;

  const statScore = document.getElementById('stat-score');
  if (statScore) statScore.innerText = gameState.totalScore;

  const statCorrect = document.getElementById('stat-correct');
  if (statCorrect) statCorrect.innerText = gameState.correctAnswers;

  const statWrong = document.getElementById('stat-wrong');
  if (statWrong) statWrong.innerText = gameState.wrongAnswers;

  const statHigh = document.getElementById('stat-highscore');
  if (statHigh) statHigh.innerText = gameState.highScore;
}

function saveProfile() {
  const nameInput = document.getElementById('player-name');
  if (nameInput && nameInput.value.trim() !== "") {
    gameState.playerName = nameInput.value.trim();
    saveState();
    alert("Profil ismin başarıyla kaydedildi.");
  }
}

function shareProfile() {
  const shareText = `Yakın Tarih Oyunu Skorun: ${gameState.totalScore} Puan!`;
  if (navigator.share) {
    navigator.share({ title: 'Skorum', text: shareText, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Profil bilgileri panoya kopyalandı!");
  }
}

function resetData() {
  if (confirm("Tüm oyun verilerin sıfırlanacak. Emin misin?")) {
    gameState = { ...DEFAULT_STATE };
    saveState();
    alert("Sıfırlandı.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});
