// Sayfa tamamen yüklendiğinde çalıştır
window.addEventListener('DOMContentLoaded', () => {

let sorular = [];
let mevcutSoruIndex = 0;
let skor = 0;
let toplamSoru = 10;
let seciliKategori = 1;

// Sesler
const sesDogru = document.getElementById('ses-dogru');
const sesYanlis = document.getElementById('ses-yanlis');
const sesTiklama = document.getElementById('ses-tiklama');
const sesCark = document.getElementById('ses-cark');
const muzikArkaplan = document.getElementById('muzik-arkaplan');

// Ekranlar
const ekranBaslangic = document.getElementById('ekran-baslangic');
const ekranSoru = document.getElementById('ekran-soru');
const ekranSonuc = document.getElementById('ekran-sonuc');

// Kategori butonları
document.querySelectorAll('.kategori-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        seciliKategori = btn.dataset.kategori;
        yarismayiBaslat();
    });
});

// Yarışmayı başlat
async function yarismayiBaslat() {
    try {
        const response = await fetch(`sorular/sorular_${seciliKategori}.json`);
        const tumSorular = await response.json();
        
        // Karıştır ve 10 soru seç
        sorular = tumSorular.sort(() => Math.random() - 0.5).slice(0, toplamSoru);
        
        mevcutSoruIndex = 0;
        skor = 0;
        
        ekranBaslangic.classList.remove('aktif');
        ekranSoru.classList.add('aktif');
        
        muzikArkaplan.volume = 0.2;
        muzikArkaplan.play().catch(() => {});
        
        soruGoster();
    } catch (hata) {
        alert('Sorular yüklenemedi: ' + hata.message);
    }
}

// Soru göster
function soruGoster() {
    if (mevcutSoruIndex >= sorular.length) {
        yarismayiBitir();
        return;
    }
    
    const soru = sorular[mevcutSoruIndex];
    
    document.getElementById('soru-sayaci').textContent = 
        `Soru ${mevcutSoruIndex + 1}/${sorular.length}`;
    document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
    document.getElementById('soru-metni').textContent = soru.soru;
    
    // Açıklama kutusunu gizle
    document.getElementById('aciklama-kutu').classList.add('gizli');
    
    // Seçenekleri oluştur
    const seceneklerDiv = document.getElementById('secenekler');
    seceneklerDiv.innerHTML = '';
    
    soru.secenekler.forEach((secenek, index) => {
        const btn = document.createElement('button');
        btn.className = 'secenek-btn';
        btn.textContent = `${String.fromCharCode(65 + index)}) ${secenek}`;
        btn.addEventListener('click', () => cevapKontrol(index, btn));
        seceneklerDiv.appendChild(btn);
    });
}

// Cevap kontrolü
function cevapKontrol(secilenIndex, secilenBtn) {
    const soru = sorular[mevcutSoruIndex];
    const dogruIndex = soru.dogruCevap;
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    
    // Tüm butonları devre dışı bırak
    tumButonlar.forEach(btn => btn.disabled = true);
    
    if (secilenIndex === dogruIndex) {
        secilenBtn.classList.add('dogru');
        skor += 10;
        sesDogru.play().catch(() => {});
    } else {
        secilenBtn.classList.add('yanlis');
        tumButonlar[dogruIndex].classList.add('dogru');
        sesYanlis.play().catch(() => {});
    }
    
    document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
    
    // Açıklamayı göster
    if (soru.aciklama) {
        document.getElementById('aciklama-metni').textContent = '💡 ' + soru.aciklama;
        document.getElementById('aciklama-kutu').classList.remove('gizli');
    }
    
    // 2.5 saniye sonra sonraki soru
    setTimeout(() => {
        mevcutSoruIndex++;
        soruGoster();
    }, 2500);
}

// Yarışmayı bitir
function yarismayiBitir() {
    ekranSoru.classList.remove('aktif');
    ekranSonuc.classList.add('aktif');
    
    muzikArkaplan.pause();
    sesCark.play().catch(() => {});
    
    document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
    
    let mesaj = '';
    const maxSkor = sorular.length * 10;
    const yuzde = (skor / maxSkor) * 100;
    
    if (yuzde >= 90) mesaj = 'Muhteşem! Sen bir tarih uzmanısın! 🏆';
    else if (yuzde >= 70) mesaj = 'Çok iyi! Tarih bilgin sağlam. 👏';
    else if (yuzde >= 50) mesaj = 'Fena değil, biraz daha çalışmalısın. 📖';
    else mesaj = 'Tarih tekerrürden ibarettir, tekrar dene! 💪';
    
    document.getElementById('sonuc-mesaj').textContent = mesaj;
}

// Tekrar oyna
document.getElementById('tekrar-btn').addEventListener('click', () => {
    sesTiklama.play().catch(() => {});
    ekranSonuc.classList.remove('aktif');
    ekranBaslangic.classList.add('aktif');
});

// ===============================
// AÇILIŞ EKRANI - BAŞLA BUTONU
// ===============================
document.getElementById('basla-btn').addEventListener('click', () => {
    sesTiklama.play().catch(() => {});
    
    const acilisEkrani = document.getElementById('ekran-acilis');
    acilisEkrani.style.opacity = '0';
    
    setTimeout(() => {
        acilisEkrani.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
        
        muzikArkaplan.volume = 0.2;
        muzikArkaplan.play().catch(() => {});
    }, 600);
});

});
