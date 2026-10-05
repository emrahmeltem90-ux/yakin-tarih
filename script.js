/* ==========================================
   OYUN DURUMU VE LOCALSTORAGE YÖNETİMİ
   ========================================== */
const DEFAULT_STATE = {
  coins: 1945,
  spinsLeft: 1,
  playerName: "Oyuncu",
  totalScore: 10300,
  correctAnswers: 103,
  wrongAnswers: 17,
  highScore: 1000,
  completedLevels: 11,
  perfectLevels: 2,
  stars: 5,
  jokers: 1,
  settings: {
    music: true,
    sfx: true,
    vibration: true,
    theme: "dark"
  },
  achievements: [
    { id: 1, title: "İlk Kan", desc: "İlk doğru cevabını ver", rewardCoins: 50, rewardStars: 0, completed: true },
    { id: 2, title: "Çaylak", desc: "10 doğru cevap yap", rewardCoins: 100, rewardStars: 0, completed: true },
    { id: 3, title: "Usta", desc: "50 doğru cevap yap", rewardCoins: 300, rewardStars: 0, completed: true },
    { id: 4, title: "Efsane", desc: "100 doğru cevap yap", rewardCoins: 500, rewardStars: 5, completed: true },
    { id: 5, title: "Mükemmeliyetçi", desc: "Bir leveli tam puanla bitir", rewardCoins: 200, rewardStars: 0, completed: false }
  ]
};

// Uygulama Durumu (State)
let gameState = loadState();

function loadState() {
  const saved = localStorage.getItem('yakin_tarih_game_state');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
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
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
  }

  const topBar = document.getElementById('top-bar');
  if (screenId === 'screen-landing') {
    topBar.classList.add('hidden');
  } else {
    topBar.classList.remove('hidden');
  }

  // Ekran geçişlerinde ilgili alanları güncelle
  updateUI();
}

/* ==========================================
   UI DOKUNMA VE GÜNCELLEME
   ========================================== */
function updateUI() {
  // Coin miktarları
  const coinElem = document.getElementById('coin-amount');
  if (coinElem) coinElem.innerText = gameState.coins;

  // Çevirme hakkı
  const spinsElem = document.getElementById('spins-left');
  if (spinsElem) spinsElem.innerText = gameState.spinsLeft;

  // Profil alanları
  const nameInput = document.getElementById('player-name');
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = gameState.playerName;
  }

  const welcomeMsg = document.getElementById('welcome-msg');
  if (welcomeMsg) welcomeMsg.innerText = `Hoş geldin, ${gameState.playerName}!`;

  // İstatistikler ve Doğruluk Hesabı
  const totalQuestions = gameState.correctAnswers + gameState.wrongAnswers;
  const accuracy = totalQuestions > 0 ? Math.round((gameState.correctAnswers / totalQuestions) * 100) : 0;
  
  const accuracyElem = document.querySelector('.accuracy-value');
  if (accuracyElem) accuracyElem.innerText = `${accuracy}%`;

  // Ayarlar Toggle Durumları
  const toggles = document.querySelectorAll('.toggle-switch input');
  if (toggles.length >= 3) {
    toggles[0].checked = gameState.settings.music;
    toggles[1].checked = gameState.settings.sfx;
    toggles[2].checked = gameState.settings.vibration;
  }
}

/* ==========================================
   ÇARKFELEK MANTIĞI VE DİLİM ÖDÜLLERİ
   ========================================== */
let canSpin = true;
let currentRotation = 0;

// Çark Dilimleri (Saat yönünde 0-360 derece)
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
  
  // En az 5 tur (1800 derece) + rastgele açı
  const extraDegrees = Math.floor(Math.random() * 360);
  const totalRotation = currentRotation + 1800 + extraDegrees;
  currentRotation = totalRotation;

  wheel.style.transform = `rotate(${totalRotation}deg)`;

  // Çarkın durma anı (4 saniye animation-duration)
  setTimeout(() => {
    canSpin = true;

    // Durduğu açıyı hesaplama (Üst ibre 0 dereceye denk gelir)
    const normalizedDegree = (360 - (totalRotation % 360)) % 360;
    const sliceIndex = Math.floor(normalizedDegree / (360 / WHEEL_SLICES.length));
    const prize = WHEEL_SLICES[sliceIndex];

    applyPrize(prize);
  }, 4000);
}

function applyPrize(prize) {
  if (prize.type === "coin") {
    gameState.coins += prize.amount;
    alert(`Tebrikler! ${prize.amount} Coin kazandın!`);
  } else if (prize.type === "spin") {
    gameState.spinsLeft += prize.amount;
    alert("Tebrikler! 1 Ekstra Çevirme Hakkı Kazandın!");
  } else if (prize.type === "star") {
    gameState.stars += prize.amount;
    alert(`Tebrikler! ${prize.amount} Yıldız kazandın!`);
  } else if (prize.type === "joker") {
    gameState.jokers += prize.amount;
    alert("Tebrikler! 1 Joker kazandın!");
  }

  saveState();
}

/* ==========================================
   PROFİL VE AYARLAR İŞLEMLERİ
   ========================================== */
function saveProfile() {
  const nameInput = document.getElementById('player-name');
  if (nameInput && nameInput.value.trim() !== "") {
    gameState.playerName = nameInput.value.trim();
    saveState();
    alert("Profil ismin başarıyla kaydedildi.");
  }
}

function toggleSetting(settingKey) {
  if (gameState.settings.hasOwnProperty(settingKey)) {
    gameState.settings[settingKey] = !gameState.settings[settingKey];
    saveState();
  }
}

function shareProfile() {
  const shareText = `Yakın Tarih Oyunu - Puanım: ${gameState.totalScore}, Doğruluk: %${Math.round((gameState.correctAnswers / (gameState.correctAnswers + gameState.wrongAnswers)) * 100)}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Yakın Tarih Skorum',
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Profil bilgileri panoya kopyalandı!");
  }
}

function resetData() {
  if (confirm("Tüm oyun ilerlemen sıfırlanacak. Bu işlem geri alınamaz! Emin misin?")) {
    gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    alert("Tüm veriler sıfırlandı.");
  }
}

/* ==========================================
   BAŞLANGIÇ TETİKLEYİCİSİ
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  updateUI();

  // Settings Switch Dinleyicileri
  const toggles = document.querySelectorAll('.toggle-switch input');
  if (toggles.length >= 3) {
    toggles[0].addEventListener('change', () => toggleSetting('music'));
    toggles[1].addEventListener('change', () => toggleSetting('sfx'));
    toggles[2].addEventListener('change', () => toggleSetting('vibration'));
  }

  // Profil Paylaş Butonu Bağlama
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', shareProfile);
  }
});
