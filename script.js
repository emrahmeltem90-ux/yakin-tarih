// ==========================================
// YAKIN TARİH - TAM OYUN MANTIĞI (V8 - PAUSE FIX)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

// ==========================================
// YAPAY ZEKA (API) AYARLARI
// ==========================================

function apiAnahtariniAl() {
    return localStorage.getItem('yt_api_key') || '';
}

// API Anahtarını Kaydetme Butonu
document.addEventListener('DOMContentLoaded', () => {
    const apiKaydetBtn = document.getElementById('api-kaydet-btn');
    if (apiKaydetBtn) {
        apiKaydetBtn.addEventListener('click', () => {
            const input = document.getElementById('api-key-input');
            if (input && input.value.trim()) {
                localStorage.setItem('yt_api_key', input.value.trim());
                if (typeof sesCal === 'function') sesCal(sesTiklama);
                if (typeof titret === 'function') titret();
                if (typeof ozelOdul === 'function') ozelOdul('Kaydedildi!', 'API anahtarın güvenle kaydedildi.', '🔑');
            } else {
                if (typeof ozelUyari === 'function') ozelUyari('Hata', 'Lütfen bir API anahtarı gir.', '⚠️');
            }
        });
    }

    // API anahtarını input'a yükle
    const apiInput = document.getElementById('api-key-input');
    if (apiInput && apiAnahtariniAl()) {
        apiInput.value = apiAnahtariniAl();
    }
});
    
// ==========================================
// 1. SABİT VERİLER
// ==========================================

const GUNUN_BILGILERI = [
    "II. Dünya Savaşı sırasında Coca-Cola şurubu Almanya'ya ithal edilemeyince alternatif olarak Fanta icat edilmiştir.",
    "Kuzey Kore, 1974 yılında İsveç'ten aldığı 1.000 adet Volvo otomobilin parasını hâlâ ödememiştir.",
    "ABD ordusunun Soğuk Savaş yıllarında yanlışlıkla denizlere düşürdüğü ve hâlâ bulunamayan en az 6 adet kayıp nükleer bombası vardır.",
    "Müttefikler, II. Dünya Savaşı'nda düşmanı kandırmak için şişme tanklardan oluşan 'Hayalet Ordu' adında gizli bir birlik kurmuştur.",
    "1932 yılında Avustralya ordusu, ekinlere zarar veren 20.000 devekuşuna karşı savaş ilan etmiş ve savaşı devekuşları kazanmıştır!"
];

const BASARIMLAR = [
    { id: 'ilk_kan', ikon: '🩸', baslik: 'İlk Kan', aciklama: 'İlk doğru cevabını ver', odul: 50, tip: 'dogru', hedef: 1 },
    { id: 'caylak', ikon: '🥉', baslik: 'Çaylak', aciklama: '10 doğru cevap yap', odul: 100, tip: 'dogru', hedef: 10 },
    { id: 'usta', ikon: '🥈', baslik: 'Usta', aciklama: '50 doğru cevap yap', odul: 300, tip: 'dogru', hedef: 50 },
    { id: 'efsane', ikon: '🥇', baslik: 'Efsane', aciklama: '100 doğru cevap yap', odul: 500, tip: 'dogru', hedef: 100 },
    { id: 'tarihci', ikon: '📜', baslik: 'Tarihçi', aciklama: '250 doğru cevap yap', odul: 1000, tip: 'dogru', hedef: 250 },
    { id: 'profesor', ikon: '🎓', baslik: 'Profesör', aciklama: '500 doğru cevap yap', odul: 2500, tip: 'dogru', hedef: 500 },
    { id: 'ilk_adim', ikon: '👣', baslik: 'İlk Adım', aciklama: 'İlk seviyeyi bitir', odul: 50, tip: 'seviye', hedef: 1 },
    { id: 'koleksiyoner', ikon: '📚', baslik: 'Koleksiyoner', aciklama: '5 seviye tamamla', odul: 250, tip: 'seviye', hedef: 5 },
    { id: 'avci', ikon: '🎯', baslik: 'Avcı', aciklama: '10 seviye tamamla', odul: 500, tip: 'seviye', hedef: 10 },
    { id: 'fatih', ikon: '⚔️', baslik: 'Fatih', aciklama: '25 seviye tamamla', odul: 1500, tip: 'seviye', hedef: 25 },
    { id: 'imparator', ikon: '👑', baslik: 'İmparator', aciklama: '40 seviye tamamla', odul: 3000, tip: 'seviye', hedef: 40 },
    { id: 'mukemmel', ikon: '💎', baslik: 'Mükemmeliyetçi', aciklama: 'Bir seviyeyi 3 yıldızla bitir', odul: 200, tip: 'mukemmel', hedef: 1 },
    { id: 'mukemmel_5', ikon: '💠', baslik: 'Kusursuz', aciklama: '5 seviyeyi 3 yıldızla bitir', odul: 750, tip: 'mukemmel', hedef: 5 },
    { id: 'mukemmel_15', ikon: '🔷', baslik: 'Mükemmel Usta', aciklama: '15 seviyeyi 3 yıldızla bitir', odul: 2000, tip: 'mukemmel', hedef: 15 },
    { id: 'zengin', ikon: '💰', baslik: 'Zengin', aciklama: '1000 coin topla', odul: 500, tip: 'coin', hedef: 1000 },
    { id: 'hazine', ikon: '💎', baslik: 'Hazine Avcısı', aciklama: '5000 coin topla', odul: 1500, tip: 'coin', hedef: 5000 },
    { id: 'kral', ikon: '🏦', baslik: 'Coin Kralı', aciklama: '10000 coin topla', odul: 3000, tip: 'coin', hedef: 10000 },
    { id: 'carkci', ikon: '🎡', baslik: 'Çarkçı', aciklama: '10 kez çarkı çevir', odul: 150, tip: 'cark', hedef: 10 },
    { id: 'cark_usta', ikon: '🎰', baslik: 'Çark Ustası', aciklama: '50 kez çarkı çevir', odul: 500, tip: 'cark', hedef: 50 },
    { id: 'alev', ikon: '🔥', baslik: 'Alev', aciklama: '5 seri yap', odul: 100, tip: 'streak', hedef: 5 },
    { id: 'yangin', ikon: '🔥🔥', baslik: 'Yangın', aciklama: '10 seri yap', odul: 250, tip: 'streak', hedef: 10 },
    { id: 'volkan', ikon: '🌋', baslik: 'Volkan', aciklama: '20 seri yap', odul: 750, tip: 'streak', hedef: 20 },
    { id: 'keskin', ikon: '🎯', baslik: 'Keskin Nişancı', aciklama: '50 seri yap', odul: 2000, tip: 'streak', hedef: 50, nadir: true },
    { id: 'seviye_5', ikon: '⚡', baslik: 'Yükseliş', aciklama: 'Oyuncu seviyesi 5 ol', odul: 250, tip: 'oyuncuseviye', hedef: 5 },
    { id: 'seviye_10', ikon: '⚡⚡', baslik: 'Şimşek', aciklama: 'Oyuncu seviyesi 10 ol', odul: 750, tip: 'oyuncuseviye', hedef: 10 },
    { id: 'seviye_25', ikon: '🌟', baslik: 'Yıldız', aciklama: 'Oyuncu seviyesi 25 ol', odul: 2000, tip: 'oyuncuseviye', hedef: 25 },
    { id: 'seviye_50', ikon: '✨', baslik: 'Süpernova', aciklama: 'Oyuncu seviyesi 50 ol', odul: 5000, tip: 'oyuncuseviye', hedef: 50, nadir: true },
    { id: 'sandik_5', ikon: '🎁', baslik: 'Sandık Avcısı', aciklama: '5 sandık aç', odul: 300, tip: 'sandik', hedef: 5 },
    { id: 'sandik_30', ikon: '🎁🎁', baslik: 'Sandık Kralı', aciklama: '30 sandık aç', odul: 1500, tip: 'sandik', hedef: 30 },
    { id: 'ww2_usta', ikon: '🎖️', baslik: 'II. Dünya Savaşı Ustası', aciklama: 'II. Dünya Savaşı kategorisinde 10 seviye bitir', odul: 500, tip: 'kat1', hedef: 10 },
    { id: 'soguk_usta', ikon: '❄️', baslik: 'Soğuk Savaş Ustası', aciklama: 'Soğuk Savaş kategorisinde 10 seviye bitir', odul: 500, tip: 'kat2', hedef: 10 },
    { id: 'darbe_usta', ikon: '⚔️', baslik: 'Darbe Ustası', aciklama: 'Türkiye\'de Darbeler kategorisinde 10 seviye bitir', odul: 500, tip: 'kat3', hedef: 10 },
    { id: 'modern_usta', ikon: '🏙️', baslik: 'Modern Tarih Ustası', aciklama: '1980 Sonrası kategorisinde 10 seviye bitir', odul: 500, tip: 'kat4', hedef: 10 },
    { id: 'yuzyil_usta', ikon: '🚀', baslik: '21. Yüzyıl Ustası', aciklama: '21. Yüzyıl kategorisinde 10 seviye bitir', odul: 500, tip: 'kat5', hedef: 10 },
    { id: 'gece_kusu', ikon: '🦉', baslik: 'Gece Kuşu', aciklama: 'Gece 00:00-05:00 arası oyna', odul: 200, tip: 'gece', hedef: 1, nadir: true },
    { id: 'sabah_kusu', ikon: '🐦', baslik: 'Sabah Kuşu', aciklama: 'Sabah 05:00-08:00 arası oyna', odul: 200, tip: 'sabah', hedef: 1, nadir: true },
    { id: 'joker_kullanmaz', ikon: '🚫', baslik: 'Jokersiz', aciklama: 'Joker kullanmadan seviye bitir', odul: 300, tip: 'jokersiz', hedef: 1 },
    { id: 'hatasiz', ikon: '💯', baslik: 'Hatasız', aciklama: 'Hiç yanlış yapmadan seviye bitir', odul: 400, tip: 'hatasiz', hedef: 1 },
    { id: 'hizli', ikon: '⚡', baslik: 'Şimşek Hızı', aciklama: 'Bir soruyu 3 saniyede doğru cevapla', odul: 150, tip: 'hizli', hedef: 1 },
    { id: 'hizli_50', ikon: '🌀', baslik: 'Rüzgar', aciklama: '50 soruyu 3 saniyede doğru cevapla', odul: 1000, tip: 'hizli', hedef: 50, nadir: true },
    { id: 'gunluk_7', ikon: '📅', baslik: 'Haftalık', aciklama: '7 gün üst üste oyna', odul: 500, tip: 'gunlukgiris', hedef: 7 },
    { id: 'gunluk_30', ikon: '🗓️', baslik: 'Aylık', aciklama: '30 gün üst üste oyna', odul: 3000, tip: 'gunlukgiris', hedef: 30, nadir: true }
];

const GOREVLER = [
    { id: 'g1', ikon: '🎮', baslik: '3 Oyun Oyna', aciklama: 'Bugün 3 oyun tamamla', odul: 50, tip: 'oyun', hedef: 3 },
    { id: 'g2', ikon: '✅', baslik: '10 Doğru Cevap', aciklama: 'Bugün 10 doğru yap', odul: 100, tip: 'dogru', hedef: 10 },
    { id: 'g3', ikon: '⭐', baslik: '1 Seviye Bitir', aciklama: 'Bugün bir seviyeyi tamamla', odul: 75, tip: 'seviye', hedef: 1 },
    { id: 'g4', ikon: '🔥', baslik: '20 Doğru Cevap', aciklama: 'Bugün 20 doğru yap', odul: 150, tip: 'dogru', hedef: 20 },
    { id: 'g5', ikon: '🏆', baslik: '3 Seviye Bitir', aciklama: 'Bugün 3 seviye tamamla', odul: 200, tip: 'seviye', hedef: 3 },
    { id: 'g6', ikon: '🎡', baslik: 'Çarkı Çevir', aciklama: 'Bugün çarkıfeleği çevir', odul: 50, tip: 'cark', hedef: 1 },
    { id: 'g7', ikon: '🎁', baslik: 'Günlük Ödül Al', aciklama: 'Bugünkü ödülünü al', odul: 30, tip: 'odul', hedef: 1 },
    { id: 'g8', ikon: '🔥', baslik: '5 Seri Yap', aciklama: 'Bugün 5 seri yap', odul: 100, tip: 'streak', hedef: 5 }
];

const CARK_DILIMLERI = [
    { isim: "250🪙", tip: "coin", miktar: 250 },
    { isim: "TEKRAR", tip: "spin", miktar: 1 },
    { isim: "10🪙", tip: "coin", miktar: 10 },
    { isim: "25🪙", tip: "coin", miktar: 25 },
    { isim: "50🪙", tip: "coin", miktar: 50 },
    { isim: "5⭐", tip: "yildiz", miktar: 5 },
    { isim: "100🪙", tip: "coin", miktar: 100 },
    { isim: "JOKER", tip: "joker", miktar: 1 }
];

const SANDIK_ODULLERI = [
    { tip: 'coin', miktar: 50, isim: '50 Coin', ikon: '🪙' },
    { tip: 'coin', miktar: 100, isim: '100 Coin', ikon: '🪙' },
    { tip: 'coin', miktar: 150, isim: '150 Coin', ikon: '🪙' },
    { tip: 'coin', miktar: 200, isim: '200 Coin', ikon: '🪙' },
    { tip: 'coin', miktar: 300, isim: '300 Coin', ikon: '💰' },
    { tip: 'coin', miktar: 500, isim: '500 Coin (NADİR!)', ikon: '💰', nadir: true },
    { tip: 'joker', miktar: 1, isim: '1 Joker', ikon: '🌙' },
    { tip: 'joker', miktar: 3, isim: '3 Joker', ikon: '🌙' },
    { tip: 'yildiz', miktar: 1, isim: '1 Yıldız', ikon: '⭐' },
    { tip: 'yildiz', miktar: 3, isim: '3 Yıldız', ikon: '⭐' },
    { tip: 'xp', miktar: 50, isim: '50 XP', ikon: '⚡' },
    { tip: 'xp', miktar: 100, isim: '100 XP', ikon: '⚡' }
];

const UNVANLAR = [
    { minSeviye: 1, unvan: 'Çaylak' },
    { minSeviye: 5, unvan: 'Araştırmacı' },
    { minSeviye: 10, unvan: 'Tarihçi' },
    { minSeviye: 20, unvan: 'Akademisyen' },
    { minSeviye: 30, unvan: 'Profesör' },
    { minSeviye: 50, unvan: 'Efsane' },
    { minSeviye: 75, unvan: 'Yaşayan Tarih' },
    { minSeviye: 100, unvan: 'Ölümsüz' }
];

const KATEGORI_ISIMLERI = {
    '1': 'II. Dünya Savaşı',
    '2': 'Soğuk Savaş',
    '3': 'Türkiye\'de Darbeler',
    '4': '1980 Sonrası',
    '5': '21. Yüzyıl'
};

const MARKET_URUNLERI = {
    'joker1': { baslik: '1 Joker', fiyat: 10, para: 'yildiz', tip: 'joker', miktar: 1 },
    'coin500': { baslik: '500 Coin', fiyat: 25, para: 'yildiz', tip: 'coin', miktar: 500 },
    'joker3': { baslik: '3 Joker Paketi', fiyat: 50, para: 'yildiz', tip: 'joker', miktar: 3 },
    'avatar_ozel': { baslik: 'Özel Avatar', fiyat: 100, para: 'yildiz', tip: 'avatar_ozel', miktar: 1 },
    'coin_to_yildiz_1': { baslik: '1 Yıldız', fiyat: 500, para: 'coin', tip: 'yildiz', miktar: 1 },
    'coin_to_yildiz_3': { baslik: '3 Yıldız', fiyat: 1400, para: 'coin', tip: 'yildiz', miktar: 3 },
    'extra_cark': { baslik: 'Ekstra Çark Hakkı', fiyat: 300, para: 'coin', tip: 'spin', miktar: 1 },
    'can_paketi': { baslik: 'Can Paketi (3 Can)', fiyat: 250, para: 'coin', tip: 'can_paketi', miktar: 3 }
};

// ==========================================
// 2. OYUN DURUMU
// ==========================================

let tumKategoriSorulari = [];
let sorular = [];
let mevcutSoruIndex = 0;
let skor = 0;
let secilenKategoriId = null;
let mevcutSeviyeNo = 1;

let toplamCoin = parseInt(localStorage.getItem('yt_coin')) || 100;
let ciftSansAktif = false;
let sesAcik = true;
let muzikAcik = true;
let titreşimAcik = true;
let soruSuresi = parseInt(localStorage.getItem('yt_soru_suresi')) || 30;

let oyuncuXP = parseInt(localStorage.getItem('yt_xp')) || 0;
let mevcutStreak = 0;
let enUzunStreak = parseInt(localStorage.getItem('yt_en_uzun_streak')) || 0;
let kombo = 0;
let soruBaslangicZamani = 0;
let jokerKullanildi = false;
let enHizliCevap = parseFloat(localStorage.getItem('yt_en_hizli')) || 999;
let toplamDogruSayisi = parseInt(localStorage.getItem('yt_toplam_dogru')) || 0;
let toplamYanlisSayisi = parseInt(localStorage.getItem('yt_toplam_yanlis')) || 0;
let toplamHizliDogru = parseInt(localStorage.getItem('yt_hizli_dogru')) || 0;
let toplamSandik = parseInt(localStorage.getItem('yt_sandik')) || 0;

let mevcutCan = 3;
let seriKorumaKullanildi = false;

let sureInterval = null;
let kalanSure = 0;
let oyunDuraklatildi = false;
let soruCevaplandi = false;

const bugun = new Date().toDateString();
let gorevDurum = JSON.parse(localStorage.getItem('yt_gorevler') || '{}');
if (gorevDurum.tarih !== bugun) {
    gorevDurum = { tarih: bugun, oyun: 0, dogru: 0, seviye: 0, cark: 0, odul: 0, mukemmel: 0, streak: 0 };
    localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
}

let carkCevirme = parseInt(localStorage.getItem('yt_cark_cevirme')) || 0;
let carkHakki = parseInt(localStorage.getItem('yt_cark_hakki')) || 1;
const carkTarih = localStorage.getItem('yt_cark_tarih');
if (carkTarih !== bugun) {
    carkHakki = 1;
    localStorage.setItem('yt_cark_hakki', '1');
    localStorage.setItem('yt_cark_tarih', bugun);
}

let sandikHakki = parseInt(localStorage.getItem('yt_sandik_hakki')) || 1;
const sandikTarih = localStorage.getItem('yt_sandik_tarih');
if (sandikTarih !== bugun) {
    sandikHakki = 1;
    localStorage.setItem('yt_sandik_hakki', '1');
    localStorage.setItem('yt_sandik_tarih', bugun);
}

let gunlukGiris = parseInt(localStorage.getItem('yt_gunluk_giris')) || 0;
const sonGiris = localStorage.getItem('yt_son_giris');
const dun = new Date(Date.now() - 86400000).toDateString();
if (sonGiris === bugun) {
    // bugün
} else if (sonGiris === dun) {
    gunlukGiris++;
    localStorage.setItem('yt_gunluk_giris', gunlukGiris);
    localStorage.setItem('yt_son_giris', bugun);
} else {
    gunlukGiris = 1;
    localStorage.setItem('yt_gunluk_giris', 1);
    localStorage.setItem('yt_son_giris', bugun);
}

let haftalikVeri = JSON.parse(localStorage.getItem('yt_haftalik') || '[]');
if (haftalikVeri.length === 0 || haftalikVeri[0].tarih !== bugun) {
    if (haftalikVeri.length >= 7) haftalikVeri.shift();
    haftalikVeri.push({ tarih: bugun, skor: 0 });
    localStorage.setItem('yt_haftalik', JSON.stringify(haftalikVeri));
}

// ==========================================
// 3. DOM ELEMANLARI
// ==========================================

const sesDogru = document.getElementById('ses-dogru');
const sesYanlis = document.getElementById('ses-yanlis');
const sesTiklama = document.getElementById('ses-tiklama');
const sesCark = document.getElementById('ses-cark');
const muzikArkaplan = document.getElementById('muzik-arkaplan');

const ekranAcilis = document.getElementById('ekran-acilis');
const ekranAnaMenu = document.getElementById('ekran-anamenu');
const ekranBaslangic = document.getElementById('ekran-baslangic');
const ekranSeviye = document.getElementById('ekran-seviye');
const ekranSoru = document.getElementById('ekran-soru');
const ekranPause = document.getElementById('ekran-pause');
const ekranCanBitti = document.getElementById('ekran-canbitti');
const ekranSonuc = document.getElementById('ekran-sonuc');
const ekranProfil = document.getElementById('ekran-profil');
const ekranMarket = document.getElementById('ekran-market');
const ekranBasarimlar = document.getElementById('ekran-basarimlar');
const ekranLiderlik = document.getElementById('ekran-liderlik');
const ekranSandik = document.getElementById('ekran-sandik');
const ekranCarkifelek = document.getElementById('ekran-carkifelek');
const ekranAyarlar = document.getElementById('ekran-ayarlar');
const ekranGorevler = document.getElementById('ekran-gorevler');

function tumEkranlariGizle() {
    document.querySelectorAll('.ekran').forEach(e => e.classList.remove('aktif'));
}

function ekranGoster(ekran) {
    tumEkranlariGizle();
    ekran.classList.add('aktif');
    ekonomiyiGuncelle();
}

// ==========================================
// 4. SES VE TİTREŞİM
// ==========================================

function sesCal(ses) {
    if (sesAcik && ses) {
        try {
            ses.currentTime = 0;
            ses.play().catch(() => {});
        } catch (e) {}
    }
}

function titret(sure = 30) {
    if (titreşimAcik && navigator.vibrate) {
        navigator.vibrate(sure);
    }
}

// ==========================================
// 5. KONFETİ
// ==========================================

function konfetiPatlat() {
    const katman = document.getElementById('konfeti-katman');
    if (!katman) return;
    const renkler = ['#d4af37', '#f5d77f', '#ffd700', '#8b2626', '#3a7d44', '#5a3a7a', '#2a4a7a'];
    for (let i = 0; i < 60; i++) {
        const parca = document.createElement('div');
        parca.className = 'konfeti-parca';
        parca.style.left = Math.random() * 100 + '%';
        parca.style.background = renkler[Math.floor(Math.random() * renkler.length)];
        parca.style.animationDuration = (2 + Math.random() * 2) + 's';
        parca.style.animationDelay = Math.random() * 0.5 + 's';
        parca.style.transform = `rotate(${Math.random() * 360}deg)`;
        if (Math.random() > 0.5) parca.style.borderRadius = '50%';
        katman.appendChild(parca);
        setTimeout(() => parca.remove(), 5000);
    }
}

// ==========================================
// 6. XP VE SEVİYE
// ==========================================

function xpToSeviye(xp) {
    let seviye = 1;
    while (50 * (seviye + 1) * seviye <= xp) seviye++;
    return seviye;
}

function seviyeIcinGerekenXP(seviye) {
    return 50 * (seviye - 1) * seviye;
}

function seviyeIlerleme(xp) {
    const seviye = xpToSeviye(xp);
    const mevcutEsik = seviyeIcinGerekenXP(seviye);
    const sonrakiEsik = seviyeIcinGerekenXP(seviye + 1);
    const ilerleme = xp - mevcutEsik;
    const gereken = sonrakiEsik - mevcutEsik;
    return { seviye, ilerleme, gereken, yuzde: (ilerleme / gereken) * 100 };
}

function unvanAl(seviye) {
    let unvan = UNVANLAR[0].unvan;
    for (const u of UNVANLAR) {
        if (seviye >= u.minSeviye) unvan = u.unvan;
    }
    return unvan;
}

function xpEkle(miktar) {
    const eskiSeviye = xpToSeviye(oyuncuXP);
    oyuncuXP += miktar;
    localStorage.setItem('yt_xp', oyuncuXP);
    const yeniSeviye = xpToSeviye(oyuncuXP);
    if (yeniSeviye > eskiSeviye) seviyeAtlamaGoster(yeniSeviye);
    return miktar;
}

function seviyeAtlamaGoster(yeniSeviye) {
    const unvan = unvanAl(yeniSeviye);
    const overlay = document.createElement('div');
    overlay.className = 'seviye-atlama-overlay';
    overlay.innerHTML = `
        <div class="seviye-atlama-kart">
            <span class="seviye-atlama-ikon">⚡</span>
            <div class="seviye-atlama-baslik">SEVİYE ATLADIN!</div>
            <div class="seviye-atlama-unvan">Seviye ${yeniSeviye} — ${unvan}</div>
            <button class="modal-btn">DEVAM</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('aktif'), 10);
    sesCal(sesCark);
    titret(200);
    konfetiPatlat();
    const kapat = () => {
        overlay.classList.remove('aktif');
        setTimeout(() => overlay.remove(), 500);
    };
    overlay.querySelector('.modal-btn').addEventListener('click', kapat);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) kapat(); });
}

// ==========================================
// 7. UYARI SİSTEMİ
// ==========================================

function ozelUyari(baslik, mesaj, ikon = '📜') {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-kart">
            <span class="modal-ikon">${ikon}</span>
            <div class="modal-baslik">${baslik}</div>
            <div class="modal-mesaj">${mesaj}</div>
            <button class="modal-btn">TAMAM</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('aktif'), 10);
    const kapat = () => {
        overlay.classList.remove('aktif');
        setTimeout(() => overlay.remove(), 300);
    };
    overlay.querySelector('.modal-btn').addEventListener('click', kapat);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) kapat(); });
}

function ozelOdul(baslik, mesaj, ikon = '🎉') {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-kart odul-kart">
            <span class="modal-ikon">${ikon}</span>
            <div class="modal-baslik">${baslik}</div>
            <div class="modal-mesaj">${mesaj}</div>
            <button class="modal-btn">HARİKA!</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('aktif'), 10);
    const kapat = () => {
        overlay.classList.remove('aktif');
        setTimeout(() => overlay.remove(), 300);
    };
    overlay.querySelector('.modal-btn').addEventListener('click', kapat);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) kapat(); });
}

// ==========================================
// 8. EKONOMİ
// ==========================================

function toplamYildizHesapla() {
    let toplam = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('yt_yildiz_')) {
            toplam += parseInt(localStorage.getItem(key)) || 0;
        }
    }
    return toplam;
}

function yildizHarca(miktar) {
    let kalan = miktar;
    for (let i = 0; i < localStorage.length && kalan > 0; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('yt_yildiz_kat_')) {
            let val = parseInt(localStorage.getItem(key)) || 0;
            while (val > 0 && kalan > 0) {
                val--;
                kalan--;
            }
            localStorage.setItem(key, val);
        }
    }
}

function yildizEkle(miktar) {
    const key = 'yt_bonus_yildiz';
    const mevcut = parseInt(localStorage.getItem(key)) || 0;
    localStorage.setItem(key, mevcut + miktar);
}

function ekonomiyiGuncelle() {
    localStorage.setItem('yt_coin', toplamCoin);
    const yildiz = toplamYildizHesapla();
    ['menu-coin', 'toplam-coin', 'seviye-coin', 'soru-coin', 'profil-coin',
     'basarim-coin', 'cark-coin', 'ayar-coin', 'gorev-coin', 'sandik-coin',
     'market-coin'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = toplamCoin;
    });
    ['menu-yildiz', 'toplam-yildiz', 'seviye-yildiz', 'market-yildiz'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = yildiz;
    });
    const el = document.getElementById('menu-xp');
    if (el) el.textContent = oyuncuXP;
    const seviyeBilgi = seviyeIlerleme(oyuncuXP);
    const menuSeviye = document.getElementById('menu-seviye');
    const menuUnvan = document.getElementById('menu-unvan');
    const menuXPBar = document.getElementById('menu-xp-bar');
    if (menuSeviye) menuSeviye.textContent = 'Sv. ' + seviyeBilgi.seviye;
    if (menuUnvan) menuUnvan.textContent = unvanAl(seviyeBilgi.seviye);
    if (menuXPBar) menuXPBar.style.width = seviyeBilgi.yuzde + '%';

    const isim = localStorage.getItem('yt_oyuncu') || 'Oyuncu';
    const avatar = localStorage.getItem('yt_avatar') || '🎖️';
    const miniIsim = document.getElementById('profil-mini-isim');
    const miniSeviye = document.getElementById('profil-mini-seviye');
    const miniAvatar = document.getElementById('profil-avatar-ust');
    if (miniIsim) miniIsim.textContent = isim;
    if (miniSeviye) miniSeviye.textContent = 'Sv. ' + seviyeBilgi.seviye;
    if (miniAvatar) miniAvatar.textContent = avatar;

    const liderlikRekor = document.getElementById('liderlik-rekor');
    if (liderlikRekor) liderlikRekor.textContent = parseInt(localStorage.getItem('yt_highscore')) || 0;
    const sandikHakEl = document.getElementById('sandik-hak');
    if (sandikHakEl) sandikHakEl.textContent = sandikHakki;
}

// ==========================================
// 9. CAN SİSTEMİ
// ==========================================

function canlariGuncelle() {
    const gosterge = document.getElementById('can-gosterge');
    if (!gosterge) return;
    const ikonlar = gosterge.querySelectorAll('.can-ikon');
    ikonlar.forEach((ikon, i) => {
        if (i < mevcutCan) ikon.classList.remove('kayip');
        else ikon.classList.add('kayip');
    });
}

function canAzalt() {
    mevcutCan--;
    canlariGuncelle();
    if (mevcutCan <= 0) {
        setTimeout(() => canBittiGoster(), 800);
    }
}

function canBittiGoster() {
    sureDurdur();
    document.getElementById('canbitti-skor').textContent = skor;
    ekranGoster(ekranCanBitti);
    sesCal(sesYanlis);
    titret(300);
}

// ==========================================
// 10. SÜRE SİSTEMİ
// ==========================================

function sureBaslat() {
    sureDurdur();
    if (soruSuresi === 0) {
        document.getElementById('sure-bar-wrapper').classList.add('gizli-sure');
        return;
    }
    document.getElementById('sure-bar-wrapper').classList.remove('gizli-sure');
    kalanSure = soruSuresi;
    sureGuncelle();
    sureInterval = setInterval(() => {
        if (oyunDuraklatildi) return;
        kalanSure--;
        sureGuncelle();
        if (kalanSure <= 0) {
            sureDurdur();
            sureBitti();
        }
    }, 1000);
}

function sureDurdur() {
    if (sureInterval) {
        clearInterval(sureInterval);
        sureInterval = null;
    }
}

function sureGuncelle() {
    const dolgu = document.getElementById('sure-bar-dolgu');
    const sayi = document.getElementById('sure-sayi');
    if (!dolgu || !sayi) return;
    const yuzde = (kalanSure / soruSuresi) * 100;
    dolgu.style.width = yuzde + '%';
    sayi.textContent = kalanSure;
    dolgu.classList.remove('orta', 'dusuk');
    if (yuzde <= 25) dolgu.classList.add('dusuk');
    else if (yuzde <= 50) dolgu.classList.add('orta');
}

function sureBitti() {
    if (soruCevaplandi) return;
    soruCevaplandi = true;
    const soru = sorular[mevcutSoruIndex];
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    tumButonlar.forEach(btn => btn.disabled = true);
    if (tumButonlar[soru.dogruCevap]) tumButonlar[soru.dogruCevap].classList.add('dogru');
    sesCal(sesYanlis);
    titret(150);
    mevcutStreak = 0;
    kombo = 0;
    document.getElementById('streak-sayi').textContent = '0';
    document.getElementById('streak-bar').classList.remove('aktif');
    document.getElementById('kombo-gosterge').classList.remove('aktif');
    toplamYanlisSayisi++;
    localStorage.setItem('yt_toplam_yanlis', toplamYanlisSayisi);
    ozelUyari('Süre Doldu!', 'Süre içinde cevap veremedin.', '⏰');
    canAzalt();
    if (mevcutCan <= 0) return;
    setTimeout(() => {
        mevcutSoruIndex++;
        soruGoster();
    }, 2500);
}

// ==========================================
// 11. AÇILIŞ VE ANA MENÜ
// ==========================================

document.getElementById('basla-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    ekranAcilis.style.opacity = '0';
    setTimeout(() => {
        ekranAcilis.classList.remove('aktif');
        ekranGoster(ekranAnaMenu);
        if (muzikAcik) {
            muzikArkaplan.volume = 0.2;
            muzikArkaplan.play().catch(() => {});
        }
        basarimlariKontrolEt();
    }, 500);
});

document.getElementById('btn-oyuna-basla').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    kategoriKilitleriniGuncelle();
    ekranGoster(ekranBaslangic);
});

document.getElementById('profil-simge').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    profiliGuncelle();
    ekranGoster(ekranProfil);
});

document.getElementById('btn-devam-et').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    const kayit = localStorage.getItem('yt_devam');
    if (kayit) {
        try {
            const data = JSON.parse(kayit);
            secilenKategoriId = data.kategori;
            mevcutSeviyeNo = data.seviye;
            kategoriSorulariniYukle(secilenKategoriId).then(ok => {
                if (ok) seviyeBaslat(mevcutSeviyeNo);
            });
        } catch (e) {
            ekranGoster(ekranBaslangic);
        }
    }
});

document.getElementById('btn-yildiz-market').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    marketGuncelle();
    ekranGoster(ekranMarket);
});

document.getElementById('btn-gizli-sandik').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    document.getElementById('sandik-hak').textContent = sandikHakki;
    const kutu = document.getElementById('sandik-kutu');
    kutu.classList.remove('acildi');
    kutu.querySelector('.sandik-emoji').textContent = '🎁';
    const sBtn = document.getElementById('sandik-btn');
    sBtn.textContent = 'SANDIĞI AÇ';
    sBtn.disabled = false;
    ekranGoster(ekranSandik);
});

document.getElementById('btn-gunluk-odul').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    const sonAlinan = localStorage.getItem('yt_gunluk_odul');
    if (sonAlinan === bugun) {
        ozelUyari('Ödül Zaten Alındı', 'Bugünkü ödülünü zaten aldın.\nYarın tekrar gel! 🎁', '⏰');
    } else {
        toplamCoin += 50;
        localStorage.setItem('yt_gunluk_odul', bugun);
        gorevDurum.odul = (gorevDurum.odul || 0) + 1;
        localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
        ekonomiyiGuncelle();
        ozelOdul('Tebrikler!', '+50 Coin! 🪙', '🎁');
    }
});

document.getElementById('btn-gunluk-gorevler').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    gorevleriOlustur();
    ekranGoster(ekranGorevler);
});

document.getElementById('btn-basarimlar').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    basarimlariOlustur();
    ekranGoster(ekranBasarimlar);
});

document.getElementById('btn-liderlik').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    liderlikOlustur();
    ekranGoster(ekranLiderlik);
});

document.getElementById('btn-carkifelek').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    document.getElementById('spins-left').textContent = carkHakki;
    ekranGoster(ekranCarkifelek);
});

document.getElementById('btn-davet').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    const davetMesaji = "📜 Yakın Tarih oyununu oyna! II. Dünya Savaşı'ndan günümüze bilgi yarışması. Sen de gel! " + window.location.href;
    if (navigator.share) {
        navigator.share({ title: 'Yakın Tarih', text: davetMesaji })
            .then(() => {
                toplamCoin += 50;
                ekonomiyiGuncelle();
                ozelOdul('Teşekkürler!', '+50 Coin! 🪙', '🎁');
            }).catch(() => {});
    } else {
        navigator.clipboard.writeText(davetMesaji).then(() => {
            toplamCoin += 50;
            ekonomiyiGuncelle();
            ozelOdul('Link Kopyalandı!', '+50 Coin senin! 🪙', '📤');
        }).catch(() => {
            ozelUyari('Davet Linki', davetMesaji, '🔗');
        });
    }
});

document.getElementById('btn-ayarlar').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    ayarSuresiniGuncelle();
    ekranGoster(ekranAyarlar);
});

document.getElementById('btn-nasil-oynanir').addEventListener('click', () => {
    sesCal(sesTiklama); titret();
    ozelUyari(
        'Nasıl Oynanır?',
        '1. Kategori ve Seviye seçerek başla.\n' +
        '2. 3 canın var. Yanlış cevap = 1 can gider.\n' +
        '3. Canlar biterse oyun biter.\n' +
        '4. Doğru cevap 10 puan + 10 coin + XP.\n' +
        '5. Üst üste doğru = SERİ (bonus coin).\n' +
        '6. Hızlı cevap = KOMBO (bonus coin).\n' +
        '7. Seri bozulacakken 150 coin ile KORU.\n' +
        '8. Coin ve yıldızını markette harca!\n' +
        '9. Kategoriler yıldızla açılır.',
        '📖'
    );
});

// ==========================================
// 12. KATEGORİ KİLİTLERİ
// ==========================================

function kategoriKilitleriniGuncelle() {
    const mevcutYildiz = toplamYildizHesapla();
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        const gerekli = parseInt(btn.dataset.yildiz) || 0;
        if (gerekli > mevcutYildiz) {
            btn.classList.add('kilitli');
        } else {
            btn.classList.remove('kilitli');
        }
    });
}

document.querySelectorAll('.kategori-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        sesCal(sesTiklama); titret();
        const katId = btn.dataset.kategori;
        const gerekli = parseInt(btn.dataset.yildiz) || 0;
        const mevcutYildiz = toplamYildizHesapla();
        if (gerekli > mevcutYildiz) {
            return ozelUyari('Kategori Kilitli', `Bu kategoriyi açmak için ${gerekli} ⭐ gerekiyor.\nŞu an: ${mevcutYildiz} ⭐`, '🔒');
        }
        secilenKategoriId = katId;
        const kategoriAdi = btn.textContent.replace(/\d+⭐/g, '').trim();
        const ok = await kategoriSorulariniYukle(secilenKategoriId);
        if (ok) {
            document.getElementById('seviye-kategori-baslik').textContent = kategoriAdi;
            seviyeKartlariniOlustur();
            ekranGoster(ekranSeviye);
        }
    });
});

async function kategoriSorulariniYukle(kategoriId) {
    try {
        const response = await fetch(`sorular/sorular_${kategoriId}.json`);
        if (!response.ok) throw new Error('Dosya okunamadı');
        tumKategoriSorulari = await response.json();
        return true;
    } catch (err) {
        ozelUyari('Hata', 'Sorular yüklenirken hata oluştu!', '⚠️');
        return false;
    }
}

function seviyeKartlariniOlustur() {
    const liste = document.getElementById('seviye-listesi');
    liste.innerHTML = '';
    const toplamSeviye = Math.ceil(tumKategoriSorulari.length / 10);

    for (let i = 1; i <= toplamSeviye; i++) {
        const kart = document.createElement('div');
        kart.className = 'seviye-kart';
        const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${i}`;
        const kazanilan = parseInt(localStorage.getItem(yildizKey)) || 0;
        const oncekiKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${i - 1}`;
        const onceki = parseInt(localStorage.getItem(oncekiKey)) || 0;

        const gerekliYildiz = (i === 11) ? 15 : 0;
        const mevcutYildiz = toplamYildizHesapla();
        const yildizKilitli = gerekliYildiz > 0 && mevcutYildiz < gerekliYildiz;

        if ((i === 1 || onceki > 0) && !yildizKilitli) {
            let yildizMetni = '⭐'.repeat(kazanilan) + '☆'.repeat(3 - kazanilan);
            kart.innerHTML = `<span class="baslik">Seviye ${i}</span><span class="yildizlar">${yildizMetni}</span>`;
            kart.addEventListener('click', () => seviyeBaslat(i));
        } else {
            kart.classList.add('kilitli');
            if (yildizKilitli) {
                kart.innerHTML = `<span class="baslik">⭐ Seviye ${i}</span><span class="yildizlar" style="font-size:0.65rem;">${gerekliYildiz} yıldız gerekli</span>`;
                kart.addEventListener('click', () => {
                    sesCal(sesTiklama);
                    ozelUyari('Yıldız Kilitli', `Bu seviye için ${gerekliYildiz} yıldız gerekiyor.\nŞu an: ${mevcutYildiz} ⭐`, '🔒');
                });
            } else {
                kart.innerHTML = `<span class="baslik">🔒 Seviye ${i}</span><span class="yildizlar" style="font-size:0.7rem;">Önceki seviyeyi geç</span>`;
                kart.addEventListener('click', () => {
                    sesCal(sesTiklama);
                    ozelUyari('Seviye Kilitli', `Seviye ${i - 1}'i geçmelisin!`, '🔒');
                });
            }
        }
        liste.appendChild(kart);
    }
}

function seviyeBaslat(seviyeNo) {
    sesCal(sesTiklama); titret();
    mevcutSeviyeNo = seviyeNo;
    const baslangic = (seviyeNo - 1) * 10;
    const seviyeSorulari = tumKategoriSorulari.slice(baslangic, baslangic + 10);
    sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);
    mevcutSoruIndex = 0;
    skor = 0;
    ciftSansAktif = false;
    mevcutStreak = 0;
    kombo = 0;
    jokerKullanildi = false;
    oyunDuraklatildi = false;
    mevcutCan = 3;
    seriKorumaKullanildi = false;

    document.getElementById('joker-5050').disabled = false;
    document.getElementById('joker-cift').disabled = false;
    document.getElementById('joker-dogru').disabled = false;
    document.getElementById('streak-sayi').textContent = '0';
    document.getElementById('kombo-gosterge').textContent = 'KOMBO x0';
    document.getElementById('streak-bar').classList.remove('aktif');
    document.getElementById('kombo-gosterge').classList.remove('aktif');
    document.getElementById('seri-koruma-bar').style.display = 'none';
    ekranSoru.classList.remove('pause-aktif');
    canlariGuncelle();

    ekranGoster(ekranSoru);
    soruGoster();
}

// ==========================================
// 13. SORU VE CEVAP
// ==========================================

function soruGoster() {
    if (mevcutSoruIndex >= sorular.length) {
        seviyeyiBitir();
        return;
    }
    ciftSansAktif = false;
    soruCevaplandi = false;
    const soru = sorular[mevcutSoruIndex];
    document.getElementById('soru-sayaci').textContent = `Soru ${mevcutSoruIndex + 1}/${sorular.length}`;
    document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
    document.getElementById('soru-coin').textContent = toplamCoin;
    document.getElementById('soru-metni').textContent = soru.soru;
    document.getElementById('aciklama-kutu').classList.add('gizli');
    document.getElementById('seri-koruma-bar').style.display = 'none';
    const seceneklerDiv = document.getElementById('secenekler');
    seceneklerDiv.innerHTML = '';
    soru.secenekler.forEach((secenek, index) => {
        const btn = document.createElement('button');
        btn.className = 'secenek-btn';
        btn.dataset.index = index;
        btn.textContent = `${String.fromCharCode(65 + index)}) ${secenek}`;
        btn.addEventListener('click', () => cevapKontrol(index, btn));
        seceneklerDiv.appendChild(btn);
    });
    soruBaslangicZamani = Date.now();
    sureBaslat();
}

function cevapKontrol(secilenIndex, secilenBtn) {
    if (soruCevaplandi) return;
    soruCevaplandi = true;
    sureDurdur();
    const soru = sorular[mevcutSoruIndex];
    const dogruIndex = soru.dogruCevap;
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    const gecenSure = (Date.now() - soruBaslangicZamani) / 1000;

    if (secilenIndex === dogruIndex) {
        secilenBtn.classList.add('dogru');
        skor += 10;
        if (gecenSure < enHizliCevap) {
            enHizliCevap = gecenSure;
            localStorage.setItem('yt_en_hizli', enHizliCevap.toFixed(2));
        }
        let kazanilanCoin = 10;
        let kazanilanXP = 15;
        mevcutStreak++;
        if (mevcutStreak > enUzunStreak) {
            enUzunStreak = mevcutStreak;
            localStorage.setItem('yt_en_uzun_streak', enUzunStreak);
        }
        let streakBonus = 0;
        if (mevcutStreak >= 3 && mevcutStreak < 5) streakBonus = 5;
        else if (mevcutStreak >= 5 && mevcutStreak < 10) streakBonus = 15;
        else if (mevcutStreak >= 10) streakBonus = 50;
        let komboBonus = 0;
        if (gecenSure <= 3) { komboBonus = 20; kombo++; }
        else if (gecenSure <= 7) { komboBonus = 10; kombo++; }
        else if (gecenSure <= 12) { komboBonus = 5; kombo++; }
        else { kombo = 0; }
        kazanilanCoin += streakBonus + komboBonus;
        kazanilanXP += Math.floor(streakBonus / 2) + Math.floor(komboBonus / 2);
        toplamCoin += kazanilanCoin;
        xpEkle(kazanilanXP);
        if (gecenSure <= 3) {
            toplamHizliDogru++;
            localStorage.setItem('yt_hizli_dogru', toplamHizliDogru);
        }
        toplamDogruSayisi++;
        localStorage.setItem('yt_toplam_dogru', toplamDogruSayisi);
        gorevDurum.dogru = (gorevDurum.dogru || 0) + 1;
        gorevDurum.streak = Math.max(gorevDurum.streak || 0, mevcutStreak);
        localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
        const sonKayit = haftalikVeri[haftalikVeri.length - 1];
        if (sonKayit && sonKayit.tarih === bugun) {
            sonKayit.skor += 10;
            localStorage.setItem('yt_haftalik', JSON.stringify(haftalikVeri));
        }
        sesCal(sesDogru);
        titret(50);
        if (mevcutStreak >= 5 || kombo >= 3) konfetiPatlat();
        ekonomiyiGuncelle();
        document.getElementById('streak-sayi').textContent = mevcutStreak;
        if (mevcutStreak >= 3) document.getElementById('streak-bar').classList.add('aktif');
        if (kombo >= 3) {
            document.getElementById('kombo-gosterge').textContent = `KOMBO x${kombo}`;
            document.getElementById('kombo-gosterge').classList.add('aktif');
        }
        if (streakBonus > 0 || komboBonus > 0) {
            let bonusMesaj = [];
            if (streakBonus > 0) bonusMesaj.push(`🔥 ${mevcutStreak} SERİ: +${streakBonus}`);
            if (komboBonus > 0) bonusMesaj.push(`⚡ HIZLI: +${komboBonus}`);
            const bonusDiv = document.createElement('div');
            bonusDiv.style.cssText = 'position:fixed;top:100px;left:50%;transform:translateX(-50%);background:rgba(255,215,0,0.95);color:#000;padding:10px 20px;border-radius:20px;font-weight:bold;z-index:9999;box-shadow:0 4px 20px rgba(255,215,0,0.6);font-size:0.9rem;text-align:center;';
            bonusDiv.innerHTML = bonusMesaj.join('<br>');
            document.body.appendChild(bonusDiv);
            setTimeout(() => {
                bonusDiv.style.transition = 'opacity 0.5s';
                bonusDiv.style.opacity = '0';
                setTimeout(() => bonusDiv.remove(), 500);
            }, 1500);
        }
        tumButonlar.forEach(btn => btn.disabled = true);
        sonrakiSoru(soru);
    } else {
        if (ciftSansAktif) {
            ciftSansAktif = false;
            secilenBtn.classList.add('yanlis');
            secilenBtn.disabled = true;
            sesCal(sesYanlis);
            titret(100);
            ozelUyari('Yanlış Cevap', '2. Şans hakkın var. Bir daha dene!', '🔄');
            return;
        }
        if (mevcutStreak >= 3 && !seriKorumaKullanildi && toplamCoin >= 150) {
            document.getElementById('seri-koruma-bar').style.display = 'block';
            secilenBtn.classList.add('yanlis');
            tumButonlar.forEach(btn => btn.disabled = true);
            sesCal(sesYanlis);
            titret(100);
            const seriBtn = document.getElementById('seri-koru-btn');
            const yeniBtn = seriBtn.cloneNode(true);
            seriBtn.parentNode.replaceChild(yeniBtn, seriBtn);
            yeniBtn.addEventListener('click', () => {
                toplamCoin -= 150;
                seriKorumaKullanildi = true;
                ekonomiyiGuncelle();
                document.getElementById('seri-koruma-bar').style.display = 'none';
                ozelOdul('Seri Korundu!', '🔥 Serin devam ediyor!', '🛡️');
                soruCevaplandi = false;
                tumButonlar.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('yanlis', 'dogru');
                });
                mevcutStreak = 3;
                sureBaslat();
            });
            setTimeout(() => {
                if (!seriKorumaKullanildi && document.getElementById('seri-koruma-bar').style.display !== 'none') {
                    document.getElementById('seri-koruma-bar').style.display = 'none';
                    seriKorumaKullanildi = true;
                    mevcutStreak = 0;
                    kombo = 0;
                    document.getElementById('streak-sayi').textContent = '0';
                    document.getElementById('streak-bar').classList.remove('aktif');
                    document.getElementById('kombo-gosterge').classList.remove('aktif');
                    if (tumButonlar[dogruIndex]) tumButonlar[dogruIndex].classList.add('dogru');
                    toplamYanlisSayisi++;
                    localStorage.setItem('yt_toplam_yanlis', toplamYanlisSayisi);
                    canAzalt();
                    if (mevcutCan > 0) setTimeout(() => { mevcutSoruIndex++; soruGoster(); }, 2200);
                }
            }, 6000);
            return;
        }
        secilenBtn.classList.add('yanlis');
        if (tumButonlar[dogruIndex]) tumButonlar[dogruIndex].classList.add('dogru');
        sesCal(sesYanlis);
        titret(100);
        mevcutStreak = 0;
        kombo = 0;
        document.getElementById('streak-sayi').textContent = '0';
        document.getElementById('streak-bar').classList.remove('aktif');
        document.getElementById('kombo-gosterge').classList.remove('aktif');
        toplamYanlisSayisi++;
        localStorage.setItem('yt_toplam_yanlis', toplamYanlisSayisi);
        tumButonlar.forEach(btn => btn.disabled = true);
        canAzalt();
        if (mevcutCan > 0) sonrakiSoru(soru);
    }
}

function sonrakiSoru(soru) {
    if (soru.aciklama) {
        document.getElementById('aciklama-metni').textContent = '💡 ' + soru.aciklama;
        document.getElementById('aciklama-kutu').classList.remove('gizli');
    }
    setTimeout(() => {
        mevcutSoruIndex++;
        soruGoster();
    }, 2200);
}

// ==========================================
// 14. PAUSE
// ==========================================

document.getElementById('pause-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    oyunDuraklatildi = true;
    pauseSesButonGuncelle();
    ekranSoru.classList.add('pause-aktif');
    ekranPause.classList.add('aktif');
});

document.getElementById('pause-devam').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    oyunDuraklatildi = false;
    ekranPause.classList.remove('aktif');
    ekranSoru.classList.remove('pause-aktif');
});

document.getElementById('pause-yeniden').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    oyunDuraklatildi = false;
    ekranPause.classList.remove('aktif');
    ekranSoru.classList.remove('pause-aktif');
    seviyeBaslat(mevcutSeviyeNo);
});

document.getElementById('pause-can-al').addEventListener('click', () => {
    if (toplamCoin < 100) return ozelUyari('Yetersiz Coin', 'Can almak için 100 coin gerekli!', '🪙');
    if (mevcutCan >= 3) return ozelUyari('Canlar Dolu', 'Zaten 3 canın var!', '❤️');
    toplamCoin -= 100;
    mevcutCan++;
    ekonomiyiGuncelle();
    canlariGuncelle();
    sesCal(sesTiklama);
    titret();
    ozelOdul('Can Kazandın!', `❤️ ${mevcutCan} canın var!`, '❤️');
});

document.getElementById('pause-ana-menu').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    oyunDuraklatildi = false;
    sureDurdur();
    ekranPause.classList.remove('aktif');
    ekranSoru.classList.remove('pause-aktif');
    ekranGoster(ekranAnaMenu);
});

document.getElementById('pause-ses').addEventListener('click', () => {
    sesAcik = !sesAcik;
    sesCal(sesTiklama);
    titret();
    pauseSesButonGuncelle();
});

function pauseSesButonGuncelle() {
    const btn = document.getElementById('pause-ses');
    if (btn) btn.textContent = sesAcik ? '🔊 SES: AÇIK' : '🔇 SES: KAPALI';
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden && ekranSoru.classList.contains('aktif')) {
        oyunDuraklatildi = true;
        pauseSesButonGuncelle();
        ekranSoru.classList.add('pause-aktif');
        ekranPause.classList.add('aktif');
    }
});

// ==========================================
// 15. CAN BİTTİ EKRANI
// ==========================================

document.getElementById('canbitti-can-al').addEventListener('click', () => {
    if (toplamCoin < 100) {
        ozelUyari('Yetersiz Coin', 'Devam etmek için 100 coin gerekli.', '🪙');
        return;
    }
    toplamCoin -= 100;
    mevcutCan = 1;
    ekonomiyiGuncelle();
    canlariGuncelle();
    sesCal(sesTiklama);
    titret();
    ekranGoster(ekranSoru);
    soruCevaplandi = false;
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    tumButonlar.forEach(btn => { btn.disabled = false; btn.classList.remove('yanlis', 'dogru', 'gizli-secenek'); });
    sureBaslat();
});

document.getElementById('canbitti-tekrar').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    seviyeBaslat(mevcutSeviyeNo);
});

document.getElementById('canbitti-ana-menu').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    sureDurdur();
    ekranGoster(ekranAnaMenu);
});

// ==========================================
// 16. JOKERLER
// ==========================================

document.getElementById('joker-5050').addEventListener('click', () => {
    if (toplamCoin < 30) return ozelUyari('Yetersiz Coin', 'Bu joker için 30 Coin gerekli!', '🪙');
    toplamCoin -= 30;
    jokerKullanildi = true;
    ekonomiyiGuncelle();
    document.getElementById('joker-5050').disabled = true;
    const soru = sorular[mevcutSoruIndex];
    const dogruIndex = soru.dogruCevap;
    const tumButonlar = Array.from(document.querySelectorAll('.secenek-btn'));
    const yanlislar = tumButonlar.map((_, i) => i).filter(i => i !== dogruIndex);
    yanlislar.sort(() => Math.random() - 0.5);
    yanlislar.slice(0, 2).forEach(i => tumButonlar[i].classList.add('gizli-secenek'));
});

document.getElementById('joker-cift').addEventListener('click', () => {
    if (toplamCoin < 50) return ozelUyari('Yetersiz Coin', 'Bu joker için 50 Coin gerekli!', '🪙');
    toplamCoin -= 50;
    jokerKullanildi = true;
    ekonomiyiGuncelle();
    ciftSansAktif = true;
    document.getElementById('joker-cift').disabled = true;
    ozelUyari('Joker Aktif', '2. Şans Jokeri Aktif!', '🔄');
});

document.getElementById('joker-dogru').addEventListener('click', () => {
    if (toplamCoin < 80) return ozelUyari('Yetersiz Coin', 'Bu joker için 80 Coin gerekli!', '🪙');
    toplamCoin -= 80;
    jokerKullanildi = true;
    ekonomiyiGuncelle();
    document.getElementById('joker-dogru').disabled = true;
    const soru = sorular[mevcutSoruIndex];
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    cevapKontrol(soru.dogruCevap, tumButonlar[soru.dogruCevap]);
});

// ==========================================
// 17. SEVİYE BİTİŞİ
// ==========================================

function seviyeyiBitir() {
    sureDurdur();
    ekranGoster(ekranSonuc);
    if (muzikAcik) muzikArkaplan.pause();
    sesCal(sesCark);

    const maxSkor = sorular.length * 10;
    const yuzde = (skor / maxSkor) * 100;
    let yildiz = 0, bonus = 0, xpBonus = 0, mesaj = '', unvan = '';

    if (yuzde >= 90) { yildiz = 3; bonus = 50; xpBonus = 100; unvan = '🏆 Tarih Üstadı'; mesaj = 'Mükemmel! 3 Yıldız!'; }
    else if (yuzde >= 70) { yildiz = 2; bonus = 30; xpBonus = 70; unvan = '🎖️ Savaş Stratejisti'; mesaj = 'Harika! 2 Yıldız!'; }
    else if (yuzde >= 50) { yildiz = 1; bonus = 15; xpBonus = 50; unvan = '📜 Tarih Çaylağı'; mesaj = 'Tebrikler! 1 Yıldız!'; }
    else { yildiz = 0; bonus = 0; xpBonus = 20; unvan = '📖 Acemi Öğrenci'; mesaj = 'Yıldız kazanamadın. Tekrar dene!'; }

    toplamCoin += bonus;
    xpEkle(xpBonus);
    const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${mevcutSeviyeNo}`;
    const eski = parseInt(localStorage.getItem(yildizKey)) || 0;
    if (yildiz > eski) localStorage.setItem(yildizKey, yildiz);

    gorevDurum.seviye = (gorevDurum.seviye || 0) + 1;
    gorevDurum.oyun = (gorevDurum.oyun || 0) + 1;
    if (yildiz === 3) gorevDurum.mukemmel = (gorevDurum.mukemmel || 0) + 1;
    localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));

    localStorage.setItem('yt_devam', JSON.stringify({
        kategori: secilenKategoriId,
        seviye: mevcutSeviyeNo
    }));
    document.getElementById('btn-devam-et').classList.remove('hidden');

    const eskiHigh = parseInt(localStorage.getItem('yt_highscore')) || 0;
    if (skor > eskiHigh) localStorage.setItem('yt_highscore', skor);

    if (!jokerKullanildi) localStorage.setItem('yt_jokersiz_sayac', (parseInt(localStorage.getItem('yt_jokersiz_sayac')) || 0) + 1);
    if (yuzde === 100) localStorage.setItem('yt_hatasiz_sayac', (parseInt(localStorage.getItem('yt_hatasiz_sayac')) || 0) + 1);

    let kategoriSeviyeSayisi = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(`yt_yildiz_kat_${secilenKategoriId}_`) && parseInt(localStorage.getItem(k)) > 0) kategoriSeviyeSayisi++;
    }
    localStorage.setItem(`yt_kat_${secilenKategoriId}_tamamlanan`, kategoriSeviyeSayisi);

    ekonomiyiGuncelle();
    document.getElementById('kazanilan-yildizlar').textContent = '⭐'.repeat(yildiz) + '☆'.repeat(3 - yildiz);
    document.getElementById('unvan-rozet').textContent = unvan;
    document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
    document.getElementById('kazanilan-coin-metni').textContent = `+${bonus} Bonus Coin! 🪙`;
    document.getElementById('kazanilan-xp-metni').textContent = `+${xpBonus} XP!`;
    document.getElementById('sonuc-mesaj').textContent = mesaj;

    if (yildiz >= 2) konfetiPatlat();
    basarimlariKontrolEt();
}

// ==========================================
// 18. MARKET
// ==========================================

document.querySelectorAll('.market-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret(15);
        document.querySelectorAll('.market-tab').forEach(t => t.classList.remove('aktif'));
        tab.classList.add('aktif');
        const hedef = tab.dataset.tab;
        if (hedef === 'yildiz') {
            document.getElementById('market-yildiz-listesi').classList.remove('gizli');
            document.getElementById('market-coin-listesi').classList.add('gizli');
        } else {
            document.getElementById('market-yildiz-listesi').classList.add('gizli');
            document.getElementById('market-coin-listesi').classList.remove('gizli');
        }
    });
});

function marketGuncelle() {
    const yildiz = toplamYildizHesapla();
    document.querySelectorAll('.market-btn').forEach(btn => {
        const id = btn.dataset.id;
        const urun = MARKET_URUNLERI[id];
        if (!urun) return;
        const bakiye = urun.para === 'yildiz' ? yildiz : toplamCoin;
        if (id === 'avatar_ozel' && localStorage.getItem('yt_avatar_ozel') === '1') {
            btn.disabled = true;
            btn.textContent = 'SAHİPSİN ✓';
        } else if (bakiye < urun.fiyat) {
            btn.disabled = true;
            btn.textContent = 'YETERSİZ';
        } else {
            btn.disabled = false;
            btn.textContent = 'AL';
        }
    });
}

document.querySelectorAll('.market-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret();
        const id = btn.dataset.id;
        const urun = MARKET_URUNLERI[id];
        if (!urun) return;
        if (urun.para === 'yildiz') {
            const yildiz = toplamYildizHesapla();
            if (yildiz < urun.fiyat) return ozelUyari('Yetersiz Yıldız', `${urun.fiyat} ⭐ gerekiyor.`, '⭐');
            yildizHarca(urun.fiyat);
        } else {
            if (toplamCoin < urun.fiyat) return ozelUyari('Yetersiz Coin', `${urun.fiyat} 🪙 gerekiyor.`, '🪙');
            toplamCoin -= urun.fiyat;
        }
        if (urun.tip === 'coin') {
            toplamCoin += urun.miktar;
            ozelOdul('Satın Alma Başarılı!', `+${urun.miktar} 🪙`, '💰');
        } else if (urun.tip === 'joker') {
            const mevcut = parseInt(localStorage.getItem('yt_joker')) || 0;
            localStorage.setItem('yt_joker', mevcut + urun.miktar);
            ozelOdul('Satın Alma Başarılı!', `+${urun.miktar} 🌙 joker`, '🌙');
        } else if (urun.tip === 'yildiz') {
            yildizEkle(urun.miktar);
            ozelOdul('Satın Alma Başarılı!', `+${urun.miktar} ⭐`, '⭐');
        } else if (urun.tip === 'spin') {
            carkHakki += urun.miktar;
            localStorage.setItem('yt_cark_hakki', carkHakki);
            ozelOdul('Satın Alma Başarılı!', `+${urun.miktar} çark hakkı`, '🎡');
        } else if (urun.tip === 'can_paketi') {
            mevcutCan = Math.min(3, mevcutCan + urun.miktar);
            ozelOdul('Can Paketi Alındı!', `❤️ ${mevcutCan} canın var!`, '❤️');
        } else if (urun.tip === 'avatar_ozel') {
            localStorage.setItem('yt_avatar_ozel', '1');
            ozelOdul('Özel Avatar Açıldı!', '👑 Profil sayfasından seç!', '👑');
        }
        marketGuncelle();
        ekonomiyiGuncelle();
    });
});

// ==========================================
// 19. AYARLAR
// ==========================================

function ayarSuresiniGuncelle() {
    document.querySelectorAll('.sure-btn').forEach(btn => {
        if (parseInt(btn.dataset.sure) === soruSuresi) btn.classList.add('aktif');
        else btn.classList.remove('aktif');
    });
}

document.querySelectorAll('.sure-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret();
        soruSuresi = parseInt(btn.dataset.sure);
        localStorage.setItem('yt_soru_suresi', soruSuresi);
        ayarSuresiniGuncelle();
    });
});

document.getElementById('toggle-music').addEventListener('change', (e) => {
    muzikAcik = e.target.checked;
    if (muzikAcik) muzikArkaplan.play().catch(() => {});
    else muzikArkaplan.pause();
});

document.getElementById('toggle-sfx').addEventListener('change', (e) => { sesAcik = e.target.checked; });
document.getElementById('toggle-vibration').addEventListener('change', (e) => { titreşimAcik = e.target.checked; });

document.getElementById('sifirla-btn').addEventListener('click', () => {
    const eskiBtn = document.getElementById('sifirla-btn');
    if (eskiBtn.dataset.onay === '1') {
        localStorage.clear();
        location.reload();
    } else {
        ozelUyari('Emin misin?', 'TÜM veriler silinecek!', '⚠️');
        eskiBtn.textContent = 'ONAYLA';
        eskiBtn.style.background = 'linear-gradient(180deg, #ff0000, #8b0000)';
        eskiBtn.dataset.onay = '1';
    }
});

// ==========================================
// 20. GİZLİ SANDIK
// ==========================================

document.getElementById('sandik-btn').addEventListener('click', () => {
    if (sandikHakki <= 0) return ozelUyari('Hakkın Bitti', 'Bugünkü sandık hakkın bitti.', '⏰');
    sandikHakki--;
    localStorage.setItem('yt_sandik_hakki', sandikHakki);
    document.getElementById('sandik-hak').textContent = sandikHakki;
    document.getElementById('sandik-btn').disabled = true;
    const kutu = document.getElementById('sandik-kutu');
    kutu.classList.add('acildi');
    sesCal(sesCark);
    titret(200);
    setTimeout(() => {
        const agirlikli = SANDIK_ODULLERI.flatMap(o => {
            const agirlik = o.nadir ? 1 : 10;
            return Array(agirlik).fill(o);
        });
        const odul = agirlikli[Math.floor(Math.random() * agirlikli.length)];
        if (odul.tip === 'coin') toplamCoin += odul.miktar;
        else if (odul.tip === 'xp') xpEkle(odul.miktar);
        else if (odul.tip === 'joker') {
            const mevcut = parseInt(localStorage.getItem('yt_joker')) || 0;
            localStorage.setItem('yt_joker', mevcut + odul.miktar);
        } else if (odul.tip === 'yildiz') {
            yildizEkle(odul.miktar);
        }
        toplamSandik++;
        localStorage.setItem('yt_sandik', toplamSandik);
        ekonomiyiGuncelle();
        kutu.querySelector('.sandik-emoji').textContent = odul.ikon;
        kutu.classList.remove('acildi');
        ozelOdul('Sandıktan Çıkan!', `${odul.ikon} ${odul.isim}`, '🎁');
        document.getElementById('sandik-btn').textContent = 'YARIN TEKRAR GEL';
        if (odul.nadir) konfetiPatlat();
    }, 800);
});

// ==========================================
// 21. ÇARKIFELEK
// ==========================================

let carkDonuyor = false;
let carkAci = 0;

document.getElementById('spin-btn').addEventListener('click', () => {
    if (carkDonuyor) return;
    if (carkHakki <= 0) return ozelUyari('Hakkın Bitti', 'Bugünlük çevirme hakkın bitti.', '⏰');
    carkDonuyor = true;
    carkHakki--;
    carkCevirme++;
    localStorage.setItem('yt_cark_hakki', carkHakki);
    localStorage.setItem('yt_cark_cevirme', carkCevirme);
    document.getElementById('spins-left').textContent = carkHakki;
    sesCal(sesTiklama);
    gorevDurum.cark = (gorevDurum.cark || 0) + 1;
    localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
    const cark = document.getElementById('cark');
    const ekstra = Math.floor(Math.random() * 360);
    const toplam = carkAci + 1800 + ekstra;
    carkAci = toplam;
    cark.style.transform = `rotate(${toplam}deg)`;
    setTimeout(() => {
        carkDonuyor = false;
        const normalize = (360 - (toplam % 360)) % 360;
        const index = Math.floor(normalize / (360 / CARK_DILIMLERI.length));
        const odul = CARK_DILIMLERI[index];
        if (odul.tip === 'coin') toplamCoin += odul.miktar;
        else if (odul.tip === 'spin') carkHakki += odul.miktar;
        else if (odul.tip === 'yildiz') yildizEkle(odul.miktar);
        else if (odul.tip === 'joker') {
            const mevcut = parseInt(localStorage.getItem('yt_joker')) || 0;
            localStorage.setItem('yt_joker', mevcut + odul.miktar);
        }
        localStorage.setItem('yt_cark_hakki', carkHakki);
        document.getElementById('spins-left').textContent = carkHakki;
        xpEkle(20);
        ekonomiyiGuncelle();
        sesCal(sesCark);
        titret(100);
        ozelOdul('Tebrikler!', `Kazandığın ödül:\n${odul.isim}`, '🎡');
        if (odul.tip === 'yildiz') konfetiPatlat();
        basarimlariKontrolEt();
    }, 4200);
});

document.getElementById('extra-spin-btn').addEventListener('click', () => {
    if (toplamCoin < 300) return ozelUyari('Yetersiz Coin', 'Ekstra çark hakkı için 300 coin gerekli!', '🪙');
    toplamCoin -= 300;
    carkHakki++;
    localStorage.setItem('yt_cark_hakki', carkHakki);
    document.getElementById('spins-left').textContent = carkHakki;
    ekonomiyiGuncelle();
    sesCal(sesTiklama);
    titret();
    ozelOdul('Ekstra Çark Hakkı!', '+1 çevirme hakkı kazandın!', '🎡');
});

// ==========================================
// 22. BAŞARIMLAR
// ==========================================

function basarimlariOlustur() {
    const liste = document.getElementById('basarim-listesi');
    liste.innerHTML = '';
    BASARIMLAR.forEach(b => {
        const tamam = localStorage.getItem(`yt_basarim_${b.id}`) === '1';
        const kart = document.createElement('div');
        kart.className = 'basarim-kart' + (tamam ? ' tamamlandi' : '') + (b.nadir ? ' nadir' : '');
        kart.innerHTML = `
            <div class="basarim-ikon">${b.ikon}</div>
            <div class="basarim-icerik">
                <div class="basarim-baslik">${b.baslik}${b.nadir ? ' 💎' : ''}</div>
                <div class="basarim-aciklama">${b.aciklama}</div>
                <div class="basarim-odul">Ödül: ${b.odul} 🪙</div>
            </div>
            <div class="basarim-check">${tamam ? '✅' : '⬜'}</div>
        `;
        liste.appendChild(kart);
    });
}

function basarimlariKontrolEt() {
    const seviyeBilgi = seviyeIlerleme(oyuncuXP);
    BASARIMLAR.forEach(b => {
        if (localStorage.getItem(`yt_basarim_${b.id}`) === '1') return;
        let deger = 0;
        if (b.tip === 'dogru') deger = toplamDogruSayisi;
        else if (b.tip === 'coin') deger = toplamCoin;
        else if (b.tip === 'cark') deger = carkCevirme;
        else if (b.tip === 'streak') deger = enUzunStreak;
        else if (b.tip === 'oyuncuseviye') deger = seviyeBilgi.seviye;
        else if (b.tip === 'sandik') deger = toplamSandik;
        else if (b.tip === 'seviye') {
            let toplam = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k.startsWith('yt_yildiz_') && parseInt(localStorage.getItem(k)) > 0) toplam++;
            }
            deger = toplam;
        }
        else if (b.tip === 'mukemmel') deger = gorevDurum.mukemmel || 0;
        else if (b.tip === 'hizli') deger = toplamHizliDogru;
        else if (b.tip === 'gunlukgiris') deger = gunlukGiris;
        else if (b.tip === 'jokersiz') deger = parseInt(localStorage.getItem('yt_jokersiz_sayac')) || 0;
        else if (b.tip === 'hatasiz') deger = parseInt(localStorage.getItem('yt_hatasiz_sayac')) || 0;
        else if (b.tip.startsWith('kat')) {
            const katNo = b.tip.replace('kat', '');
            deger = parseInt(localStorage.getItem(`yt_kat_${katNo}_tamamlanan`)) || 0;
        }
        else if (b.tip === 'gece') {
            const saat = new Date().getHours();
            deger = (saat >= 0 && saat < 5) ? 1 : 0;
        }
        else if (b.tip === 'sabah') {
            const saat = new Date().getHours();
            deger = (saat >= 5 && saat < 8) ? 1 : 0;
        }
        if (deger >= b.hedef) {
            localStorage.setItem(`yt_basarim_${b.id}`, '1');
            toplamCoin += b.odul;
            xpEkle(50);
            ekonomiyiGuncelle();
            setTimeout(() => {
                ozelOdul('Başarım Kazandın!', `${b.ikon} ${b.baslik}\n+${b.odul} Coin!`, '🏆');
                if (b.nadir) konfetiPatlat();
            }, 800);
        }
    });
}

// ==========================================
// 23. LİDERLİK
// ==========================================

function liderlikOlustur() {
    const liste = document.getElementById('liderlik-listesi');
    liste.innerHTML = '';
    const rekorlar = JSON.parse(localStorage.getItem('yt_rekorlar') || '[]');
    const mevcutRekor = parseInt(localStorage.getItem('yt_highscore')) || 0;
    const isim = localStorage.getItem('yt_oyuncu') || 'Sen';
    const tumRekorlar = [...rekorlar];
    if (mevcutRekor > 0 && !tumRekorlar.find(r => r.isim === isim && r.puan === mevcutRekor)) {
        tumRekorlar.push({ isim: isim, puan: mevcutRekor, tarih: new Date().toLocaleDateString('tr-TR') });
    }
    tumRekorlar.sort((a, b) => b.puan - a.puan);
    const top10 = tumRekorlar.slice(0, 10);
    if (top10.length === 0) {
        liste.innerHTML = '<p style="color:#a6917b;padding:20px;">Henüz rekor yok. İlk rekoru sen kır!</p>';
        return;
    }
    top10.forEach((r, i) => {
        const satir = document.createElement('div');
        satir.className = 'liderlik-satir' + (i === 0 ? ' birinci' : i === 1 ? ' ikinci' : i === 2 ? ' ucuncu' : '');
        const madalya = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        satir.innerHTML = `
            <div class="liderlik-sira">${madalya} ${i + 1}</div>
            <div class="liderlik-isim">${r.isim}</div>
            <div class="liderlik-puan">${r.puan} puan</div>
        `;
        liste.appendChild(satir);
    });
}

// ==========================================
// 24. GÜNLÜK GÖREVLER
// ==========================================

function gorevleriOlustur() {
    const liste = document.getElementById('gorev-listesi');
    liste.innerHTML = '';
    GOREVLER.forEach(g => {
        const mevcut = gorevDurum[g.tip] || 0;
        const tamam = mevcut >= g.hedef;
        const yuzde = Math.min(100, (mevcut / g.hedef) * 100);
        const alindi = localStorage.getItem(`yt_gorev_alindi_${g.id}_${bugun}`) === '1';
        if (tamam && !alindi) {
            toplamCoin += g.odul;
            xpEkle(30);
            localStorage.setItem(`yt_gorev_alindi_${g.id}_${bugun}`, '1');
            ekonomiyiGuncelle();
            setTimeout(() => {
                ozelOdul('Görev Tamamlandı!', `${g.baslik}\n+${g.odul} Coin!`, g.ikon);
            }, 300);
        }
        const kart = document.createElement('div');
        kart.className = 'gorev-kart' + (tamam ? ' tamamlandi' : '');
        kart.innerHTML = `
            <div class="gorev-ikon">${g.ikon}</div>
            <div class="gorev-icerik">
                <div class="gorev-baslik">${g.baslik}</div>
                <div class="gorev-aciklama">${g.aciklama} (${mevcut}/${g.hedef})</div>
                <div class="gorev-progress-bar">
                    <div class="gorev-progress-fill" style="width:${yuzde}%"></div>
                </div>
                <div class="gorev-odul">Ödül: ${g.odul} 🪙 ${tamam ? '✅' : ''}</div>
            </div>
        `;
        liste.appendChild(kart);
    });
}

// ==========================================
// 25. PROFİL
// ==========================================

function profiliGuncelle() {
    const isim = localStorage.getItem('yt_oyuncu') || 'Oyuncu';
    const playerNameInput = document.getElementById('player-name');
    if (playerNameInput && document.activeElement !== playerNameInput) {
        playerNameInput.value = isim;
    }
    const seciliAvatar = localStorage.getItem('yt_avatar') || '🎖️';
    document.querySelectorAll('.avatar-btn').forEach(btn => {
        if (btn.dataset.avatar === seciliAvatar) btn.classList.add('secili');
        else btn.classList.remove('secili');
    });
    const seviyeBilgi = seviyeIlerleme(oyuncuXP);
    const profilUnvan = document.getElementById('profil-unvan');
    const profilSeviye = document.getElementById('profil-seviye');
    const profilXPBar = document.getElementById('profil-xp-bar');
    const profilXPYazi = document.getElementById('profil-xp-yazi');
    if (profilUnvan) profilUnvan.textContent = '🎖️ ' + unvanAl(seviyeBilgi.seviye);
    if (profilSeviye) profilSeviye.textContent = 'Sv. ' + seviyeBilgi.seviye;
    if (profilXPBar) profilXPBar.style.width = seviyeBilgi.yuzde + '%';
    if (profilXPYazi) profilXPYazi.textContent = `${seviyeBilgi.ilerleme} / ${seviyeBilgi.gereken} XP`;

    const total = toplamDogruSayisi + toplamYanlisSayisi;
    const dogruluk = total > 0 ? Math.round((toplamDogruSayisi / total) * 100) : 0;
    const el = (id) => document.getElementById(id);
    if (el('stat-score')) el('stat-score').textContent = toplamCoin;
    if (el('stat-correct')) el('stat-correct').textContent = toplamDogruSayisi;
    if (el('stat-wrong')) el('stat-wrong').textContent = toplamYanlisSayisi;
    if (el('stat-highscore')) el('stat-highscore').textContent = parseInt(localStorage.getItem('yt_highscore')) || 0;
    if (el('dogruluk-value')) el('dogruluk-value').textContent = dogruluk + '%';
    if (el('stat-streak')) el('stat-streak').textContent = enUzunStreak;
    let tamamlanan = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('yt_yildiz_') && parseInt(localStorage.getItem(k)) > 0) tamamlanan++;
    }
    if (el('stat-levels')) el('stat-levels').textContent = tamamlanan;
    kategoriIstatistikleriniGuncelle();
    if (el('rekor-skor')) el('rekor-skor').textContent = parseInt(localStorage.getItem('yt_highscore')) || 0;
    if (el('rekor-streak')) el('rekor-streak').textContent = enUzunStreak;
    if (el('rekor-hiz')) el('rekor-hiz').textContent = enHizliCevap < 999 ? enHizliCevap.toFixed(1) + ' sn' : '-';
    if (el('rekor-coin')) el('rekor-coin').textContent = toplamCoin;
    if (el('rekor-yildiz')) el('rekor-yildiz').textContent = toplamYildizHesapla();
    vitriniGuncelle();
    grafigiGuncelle();
}

function kategoriIstatistikleriniGuncelle() {
    const liste = document.getElementById('kategori-istatistik-listesi');
    if (!liste) return;
    liste.innerHTML = '';
    Object.keys(KATEGORI_ISIMLERI).forEach(katId => {
        const isim = KATEGORI_ISIMLERI[katId];
        let seviyeSayisi = 0;
        let toplamYildiz = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k.startsWith(`yt_yildiz_kat_${katId}_`)) {
                const y = parseInt(localStorage.getItem(k)) || 0;
                if (y > 0) seviyeSayisi++;
                toplamYildiz += y;
            }
        }
        const toplamSeviye = 10;
        const yuzde = (seviyeSayisi / toplamSeviye) * 100;
        const kart = document.createElement('div');
        kart.className = 'kategori-istatistik-kart' + (seviyeSayisi === toplamSeviye ? ' tamamlandi' : '');
        kart.innerHTML = `
            <div class="kategori-ust">
                <span class="kategori-isim">${isim}</span>
                <span class="kategori-seviye-sayi">${seviyeSayisi}/${toplamSeviye}</span>
            </div>
            <div class="kategori-progress">
                <div class="kategori-progress-dolgu" style="width:${yuzde}%"></div>
            </div>
            <div class="kategori-alt">
                <span>Toplam Yıldız</span>
                <span class="kategori-yildizlar">${'⭐'.repeat(Math.min(toplamYildiz, 5))} ${toplamYildiz}</span>
            </div>
        `;
        liste.appendChild(kart);
    });
}

function vitriniGuncelle() {
    const vitrin = document.getElementById('vitrin');
    if (!vitrin) return;
    vitrin.innerHTML = '';
    const kazanilanlar = [];
    BASARIMLAR.forEach(b => {
        if (localStorage.getItem(`yt_basarim_${b.id}`) === '1') kazanilanlar.push(b);
    });
    if (kazanilanlar.length === 0) {
        vitrin.innerHTML = '<div class="vitrin-bos">Henüz başarım kazanmadın.</div>';
        return;
    }
    kazanilanlar.slice(-6).forEach(b => {
        const kart = document.createElement('div');
        kart.className = 'vitrin-kart';
        kart.innerHTML = `<span class="vitrin-ikon">${b.ikon}</span><span class="vitrin-baslik">${b.baslik}</span>`;
        vitrin.appendChild(kart);
    });
}

function grafigiGuncelle() {
    const kutu = document.getElementById('grafik-kutu');
    if (!kutu) return;
    kutu.innerHTML = '';
    const gunler = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const son7 = haftalikVeri.slice(-7);
    const maxSkor = Math.max(...son7.map(v => v.skor), 10);
    son7.forEach(v => {
        const tarih = new Date(v.tarih);
        const gunAdi = gunler[tarih.getDay()];
        const yuzde = (v.skor / maxSkor) * 100;
        const wrapper = document.createElement('div');
        wrapper.className = 'grafik-bar-wrapper';
        wrapper.innerHTML = `
            <span class="grafik-deger">${v.skor}</span>
            <div class="grafik-bar" style="height:${Math.max(yuzde, 5)}%"></div>
            <span class="grafik-gun">${gunAdi}</span>
        `;
        kutu.appendChild(wrapper);
    });
}

document.getElementById('kaydet-btn').addEventListener('click', () => {
    const isim = document.getElementById('player-name').value.trim() || 'Oyuncu';
    localStorage.setItem('yt_oyuncu', isim);
    sesCal(sesTiklama);
    titret();
    ekonomiyiGuncelle();
    ozelOdul('Kaydedildi!', 'Profil ismin güncellendi.', '✅');
});

document.querySelectorAll('.avatar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret(15);
        const avatar = btn.dataset.avatar;
        if (avatar === '👑' && localStorage.getItem('yt_avatar_ozel') !== '1') {
            return ozelUyari('Kilitli Avatar', '👑 avatarını marketten 100⭐ ile açabilirsin!', '🔒');
        }
        localStorage.setItem('yt_avatar', avatar);
        document.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('secili'));
        btn.classList.add('secili');
        ekonomiyiGuncelle();
    });
});

document.getElementById('paylas-btn').addEventListener('click', () => {
    const isim = localStorage.getItem('yt_oyuncu') || 'Oyuncu';
    const seviyeBilgi = seviyeIlerleme(oyuncuXP);
    const unvan = unvanAl(seviyeBilgi.seviye);
    const mesaj = `${isim} - Yakın Tarih\n🎖️ ${unvan} (Sv. ${seviyeBilgi.seviye})\n🪙 ${toplamCoin} coin\n⭐ ${toplamYildizHesapla()} yıldız\n🔥 En uzun seri: ${enUzunStreak}\n✅ Doğru: ${toplamDogruSayisi}`;
    if (navigator.share) {
        navigator.share({ title: 'Yakın Tarih Profilim', text: mesaj }).catch(() => {});
    } else {
        navigator.clipboard.writeText(mesaj);
        ozelOdul('Paylaşıldı!', 'Profil bilgilerin panoya kopyalandı.', '📤');
    }
});

// ==========================================
// 26. GEZİNTİ
// ==========================================

document.querySelectorAll('.nav-geri-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesCal(sesTiklama); titret();
        const hedef = btn.dataset.hedef;
        const el = document.getElementById(hedef);
        if (el) ekranGoster(el);
    });
});

document.getElementById('baslangic-geri-btn').addEventListener('click', () => {
    sesCal(sesTiklama); ekranGoster(ekranAnaMenu);
});

document.getElementById('seviye-geri-btn').addEventListener('click', () => {
    sesCal(sesTiklama); ekranGoster(ekranBaslangic);
});

document.getElementById('tekrar-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    seviyeKartlariniOlustur();
    ekranGoster(ekranSeviye);
    if (muzikAcik) muzikArkaplan.play().catch(() => {});
});

// ==========================================
// 27. BAŞLANGIÇ
// ==========================================

function baslangicAyarlari() {
    const isim = localStorage.getItem('yt_oyuncu');
    if (isim) {
        const playerNameInput = document.getElementById('player-name');
        if (playerNameInput) playerNameInput.value = isim;
    }
    if (localStorage.getItem('yt_devam')) {
        document.getElementById('btn-devam-et').classList.remove('hidden');
    }
    ayarSuresiniGuncelle();
    ekonomiyiGuncelle();
    profiliGuncelle();
    pauseSesButonGuncelle();
}

baslangicAyarlari();

// ==========================================
// 28. BİLGİ KARTI
// ==========================================

let sonBilgiIndex = -1;

function bilgileriYukle() {
    if (typeof BILGILER !== 'undefined' && BILGILER.length > 0) {
        rastgeleBilgiGoster();
    } else {
        window.BILGILER = [
            { ikon: "🎖️", bilgi: "II. Dünya Savaşı sırasında Coca-Cola şurubu Almanya'ya ithal edilemeyince alternatif olarak Fanta icat edilmiştir." },
            { ikon: "🏛️", bilgi: "Atatürk, 1936'da Montrö Sözleşmesi'ni bizzat kaleme almıştır." },
            { ikon: "🔬", bilgi: "Neil Armstrong'un uzay kıyafeti, Türk işçileri tarafından dikilmiştir." }
        ];
        rastgeleBilgiGoster();
    }
}

function rastgeleBilgiGoster() {
    const kaynak = (typeof BILGILER !== 'undefined' && BILGILER.length > 0) ? BILGILER : (window.BILGILER || []);
    if (kaynak.length === 0) return;
    let yeniIndex;
    do {
        yeniIndex = Math.floor(Math.random() * kaynak.length);
    } while (yeniIndex === sonBilgiIndex && kaynak.length > 1);
    sonBilgiIndex = yeniIndex;
    const bilgi = kaynak[yeniIndex];
    const el = document.getElementById('bilgi-metni');
    if (el) {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = (bilgi.ikon || '💡') + ' ' + bilgi.bilgi;
            el.style.opacity = '1';
        }, 150);
    }
}

const bilgiKart = document.getElementById('bilgi-kart');
if (bilgiKart) {
    bilgiKart.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret(15);
        rastgeleBilgiGoster();
    });
}

bilgileriYukle();

});
