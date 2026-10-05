// ==========================================
// YAKIN TARİH - TAM OYUN MANTIĞI
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

// ==========================================
// 1. SABİT VERİLER
// ==========================================

const GUNUN_BILGILERI = [
    "II. Dünya Savaşı sırasında Coca-Cola şurubu Almanya'ya ithal edilemeyince alternatif olarak Fanta icat edilmiştir.",
    "Kuzey Kore, 1974 yılında İsveç'ten aldığı 1.000 adet Volvo otomobilin parasını hâlâ ödememiştir.",
    "ABD ordusunun Soğuk Savaş yıllarında yanlışlıkla denizlere düşürdüğü ve hâlâ bulunamayan en az 6 adet kayıp nükleer bombası vardır.",
    "Müttefikler, II. Dünya Savaşı'nda düşmanı kandırmak için şişme tanklardan oluşan 'Hayalet Ordu' adında gizli bir birlik kurmuştur.",
    "1932 yılında Avustralya ordusu, ekinlere zarar veren 20.000 devekuşuna (Emu) karşı savaş ilan etmiş ve savaşı devekuşları kazanmıştır!",
    "Soğuk Savaş sırasında ABD, Ay üzerinde bir nükleer bomba patlatarak gücünü göstermeyi planlamıştır (Proje A119)."
];

const BASARIMLAR = [
    { id: 'ilk_kan', ikon: '🩸', baslik: 'İlk Kan', aciklama: 'İlk doğru cevabını ver', odul: 50, tip: 'dogru', hedef: 1 },
    { id: 'caylak', ikon: '🥉', baslik: 'Çaylak', aciklama: '10 doğru cevap yap', odul: 100, tip: 'dogru', hedef: 10 },
    { id: 'usta', ikon: '🥈', baslik: 'Usta', aciklama: '50 doğru cevap yap', odul: 300, tip: 'dogru', hedef: 50 },
    { id: 'efsane', ikon: '🥇', baslik: 'Efsane', aciklama: '100 doğru cevap yap', odul: 500, tip: 'dogru', hedef: 100 },
    { id: 'mukemmel', ikon: '💎', baslik: 'Mükemmeliyetçi', aciklama: 'Bir seviyeyi tam puANLA bitir', odul: 200, tip: 'mukemmel', hedef: 1 },
    { id: 'koleksiyoner', ikon: '📚', baslik: 'Koleksiyoner', aciklama: '5 seviye tamamla', odul: 250, tip: 'seviye', hedef: 5 },
    { id: 'zengin', ikon: '💰', baslik: 'Zengin', aciklama: '1000 coin topla', odul: 500, tip: 'coin', hedef: 1000 },
    { id: 'carkci', ikon: '🎡', baslik: 'Çarkçı', aciklama: '10 kez çarkı çevir', odul: 150, tip: 'cark', hedef: 10 }
];

const GOREVLER = [
    { id: 'g1', ikon: '🎮', baslik: '3 Oyun Oyna', aciklama: 'Bugün 3 oyun tamamla', odul: 50, tip: 'oyun', hedef: 3 },
    { id: 'g2', ikon: '✅', baslik: '10 Doğru Cevap', aciklama: 'Bugün 10 doğru yap', odul: 100, tip: 'dogru', hedef: 10 },
    { id: 'g3', ikon: '⭐', baslik: '1 Seviye Bitir', aciklama: 'Bugün bir seviyeyi tamamla', odul: 75, tip: 'seviye', hedef: 1 }
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

// Günlük görev takibi
const bugun = new Date().toDateString();
let gorevDurum = JSON.parse(localStorage.getItem('yt_gorevler') || '{}');
if (gorevDurum.tarih !== bugun) {
    gorevDurum = { tarih: bugun, oyun: 0, dogru: 0, seviye: 0 };
    localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
}

// Çark çevirme takibi
let carkCevirme = parseInt(localStorage.getItem('yt_cark_cevirme')) || 0;
let carkHakki = parseInt(localStorage.getItem('yt_cark_hakki')) || 1;
const carkTarih = localStorage.getItem('yt_cark_tarih');
if (carkTarih !== bugun) {
    carkHakki = 1;
    localStorage.setItem('yt_cark_hakki', '1');
    localStorage.setItem('yt_cark_tarih', bugun);
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
const ekranSonuc = document.getElementById('ekran-sonuc');
const ekranProfil = document.getElementById('ekran-profil');
const ekranBasarimlar = document.getElementById('ekran-basarimlar');
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
// 4. SES FONKSİYONLARI
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
// 5. EKONOMİ
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

function ekonomiyiGuncelle() {
    localStorage.setItem('yt_coin', toplamCoin);
    const yildiz = toplamYildizHesapla();

    ['menu-coin', 'toplam-coin', 'seviye-coin', 'soru-coin', 'profil-coin',
     'basarim-coin', 'cark-coin', 'ayar-coin', 'gorev-coin'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = toplamCoin;
    });

    ['menu-yildiz', 'toplam-yildiz', 'seviye-yildiz'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = yildiz;
    });
}

// ==========================================
// 6. AÇILIŞ EKRANI
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
    }, 500);
});

// ==========================================
// 7. ANA MENÜ BUTONLARI
// ==========================================

document.getElementById('btn-oyuna-basla').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    ekranGoster(ekranBaslangic);
});

document.getElementById('btn-devam-et').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    
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

document.getElementById('btn-gunluk-odul').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    
    const sonAlinan = localStorage.getItem('yt_gunluk_odul');
    if (sonAlinan === bugun) {
        alert('Bugünkü ödülünü zaten aldın! Yarın tekrar gel 🎁');
    } else {
        toplamCoin += 50;
        localStorage.setItem('yt_gunluk_odul', bugun);
        ekonomiyiGuncelle();
        alert('Tebrikler! +50 Coin hesabına eklendi! 🪙');
    }
});

document.getElementById('btn-gunluk-gorevler').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    gorevleriOlustur();
    ekranGoster(ekranGorevler);
});

document.getElementById('btn-basarimlar').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    basarimlariOlustur();
    ekranGoster(ekranBasarimlar);
});

document.getElementById('btn-carkifelek').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    document.getElementById('spins-left').textContent = carkHakki;
    ekranGoster(ekranCarkifelek);
});

document.getElementById('btn-davet').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    
    const davetMesaji = "📜 Yakın Tarih oyununu oyna! II. Dünya Savaşı'ndan günümüze bilgi yarışması. Sen de gel! " + window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Yakın Tarih - Bilgi Yarışması',
            text: davetMesaji
        }).then(() => {
            toplamCoin += 50;
            ekonomiyiGuncelle();
            alert('Paylaştığın için +50 Coin kazandın! 🪙');
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(davetMesaji).then(() => {
            toplamCoin += 50;
            ekonomiyiGuncelle();
            alert('Davet linki kopyalandı! Arkadaşınla paylaş, +50 Coin senin! 🪙');
        }).catch(() => {
            alert('Davet linki: ' + window.location.href);
        });
    }
});

document.getElementById('btn-ayarlar').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    ekranGoster(ekranAyarlar);
});

document.getElementById('btn-nasil-oynanir').addEventListener('click', () => {
    sesCal(sesTiklama);
    titret();
    alert(
        "📜 YAKIN TARİH NASIL OYNANIR?\n\n" +
        "1. Kategori ve Seviye seçerek yarışmaya başla.\n" +
        "2. Her seviyede 10 soru bulunur.\n" +
        "3. Doğru cevaplar 10 puan ve 10 coin kazandırır.\n" +
        "4. Jokerler: 50/50 (20🪙), 2. Şans (30🪙), Pas (50🪙).\n" +
        "5. Seviyeleri geç ve yıldız kazan!\n" +
        "6. Günlük görevleri ve çarkıfeleği takip et!"
    );
});

// ==========================================
// 8. KATEGORİ
// ==========================================

document.querySelectorAll('.kategori-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        sesCal(sesTiklama);
        titret();
        secilenKategoriId = e.target.dataset.kategori;
        const kategoriAdi = e.target.textContent;
        const ok = await kategoriSorulariniYukle(secilenKategoriId);
        if (ok) {
            document.getElementById('seviye-kategori-baslik').textContent = `🎯 ${kategoriAdi}`;
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
        alert('Sorular yüklenirken hata oluştu! İnternet bağlantını kontrol et.');
        return false;
    }
}

// ==========================================
// 9. SEVİYE
// ==========================================

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

        if (i === 1 || onceki > 0) {
            let yildizMetni = '⭐'.repeat(kazanilan) + '☆'.repeat(3 - kazanilan);
            kart.innerHTML = `<span class="baslik">Seviye ${i}</span><span class="yildizlar">${yildizMetni}</span>`;
            kart.addEventListener('click', () => seviyeBaslat(i));
        } else {
            kart.classList.add('kilitli');
            kart.innerHTML = `<span class="baslik">🔒 Seviye ${i}</span><span class="yildizlar" style="font-size:0.7rem;">Önceki seviyeyi geç</span>`;
            kart.addEventListener('click', () => {
                sesCal(sesTiklama);
                alert(`Seviye ${i}'yi açmak için Seviye ${i - 1}'den en az 1 yıldız kazanmalısın!`);
            });
        }
        liste.appendChild(kart);
    }
}

function seviyeBaslat(seviyeNo) {
    sesCal(sesTiklama);
    titret();
    mevcutSeviyeNo = seviyeNo;

    const baslangic = (seviyeNo - 1) * 10;
    const seviyeSorulari = tumKategoriSorulari.slice(baslangic, baslangic + 10);
    sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);

    mevcutSoruIndex = 0;
    skor = 0;
    ciftSansAktif = false;

    document.getElementById('joker-5050').disabled = false;
    document.getElementById('joker-cift').disabled = false;
    document.getElementById('joker-dogru').disabled = false;

    ekranGoster(ekranSoru);
    soruGoster();
}

// ==========================================
// 10. SORU GÖSTERME
// ==========================================

function soruGoster() {
    if (mevcutSoruIndex >= sorular.length) {
        seviyeyiBitir();
        return;
    }

    ciftSansAktif = false;
    const soru = sorular[mevcutSoruIndex];

    document.getElementById('soru-sayaci').textContent = `Soru ${mevcutSoruIndex + 1}/${sorular.length}`;
    document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
    document.getElementById('soru-coin').textContent = toplamCoin;
    document.getElementById('soru-metni').textContent = soru.soru;
    document.getElementById('aciklama-kutu').classList.add('gizli');

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
}

// ==========================================
// 11. CEVAP KONTROLÜ
// ==========================================

function cevapKontrol(secilenIndex, secilenBtn) {
    const soru = sorular[mevcutSoruIndex];
    const dogruIndex = soru.dogruCevap;
    const tumButonlar = document.querySelectorAll('.secenek-btn');

    if (secilenIndex === dogruIndex) {
        secilenBtn.classList.add('dogru');
        skor += 10;
        toplamCoin += 10;
        gorevDurum.dogru = (gorevDurum.dogru || 0) + 1;
        localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));
        sesCal(sesDogru);
        titret(50);
        ekonomiyiGuncelle();

        tumButonlar.forEach(btn => btn.disabled = true);
        sonrakiSoru(soru);
    } else {
        if (ciftSansAktif) {
            ciftSansAktif = false;
            secilenBtn.classList.add('yanlis');
            secilenBtn.disabled = true;
            sesCal(sesYanlis);
            titret(100);
            alert('Yanlış! Ama 2. Şans hakkın var. Bir daha dene.');
        } else {
            secilenBtn.classList.add('yanlis');
            if (tumButonlar[dogruIndex]) tumButonlar[dogruIndex].classList.add('dogru');
            sesCal(sesYanlis);
            titret(100);
            tumButonlar.forEach(btn => btn.disabled = true);
            sonrakiSoru(soru);
        }
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
// 12. JOKERLER
// ==========================================

document.getElementById('joker-5050').addEventListener('click', () => {
    if (toplamCoin < 20) return alert('Yetersiz Coin! En az 20 Coin gerekli.');
    toplamCoin -= 20;
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
    if (toplamCoin < 30) return alert('Yetersiz Coin! En az 30 Coin gerekli.');
    toplamCoin -= 30;
    ekonomiyiGuncelle();
    ciftSansAktif = true;
    document.getElementById('joker-cift').disabled = true;
    alert('2. Şans Jokeri Aktif! İlk yanlışında elenmeyeceksin.');
});

document.getElementById('joker-dogru').addEventListener('click', () => {
    if (toplamCoin < 50) return alert('Yetersiz Coin! En az 50 Coin gerekli.');
    toplamCoin -= 50;
    ekonomiyiGuncelle();
    document.getElementById('joker-dogru').disabled = true;
    const soru = sorular[mevcutSoruIndex];
    const tumButonlar = document.querySelectorAll('.secenek-btn');
    cevapKontrol(soru.dogruCevap, tumButonlar[soru.dogruCevap]);
});

// ==========================================
// 13. SEVİYE BİTİŞİ
// ==========================================

function seviyeyiBitir() {
    ekranGoster(ekranSonuc);
    if (muzikAcik) muzikArkaplan.pause();
    sesCal(sesCark);

    const maxSkor = sorular.length * 10;
    const yuzde = (skor / maxSkor) * 100;

    let yildiz = 0, bonus = 0, mesaj = '', unvan = '';

    if (yuzde >= 90) {
        yildiz = 3; bonus = 50; unvan = '🏆 Tarih Üstadı';
        mesaj = 'Mükemmel! 3 Yıldız kazandın.';
    } else if (yuzde >= 70) {
        yildiz = 2; bonus = 30; unvan = '🎖️ Savaş Stratejisti';
        mesaj = 'Harika! 2 Yıldız kazandın.';
    } else if (yuzde >= 50) {
        yildiz = 1; bonus = 15; unvan = '📜 Tarih Çaylağı';
        mesaj = 'Tebrikler! 1 Yıldız kazandın.';
    } else {
        yildiz = 0; bonus = 0; unvan = '📖 Acemi Öğrenci';
        mesaj = 'Yıldız kazanamadın. Tekrar dene!';
    }

    toplamCoin += bonus;
    const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${mevcutSeviyeNo}`;
    const eski = parseInt(localStorage.getItem(yildizKey)) || 0;
    if (yildiz > eski) localStorage.setItem(yildizKey, yildiz);

    // Günlük görev - seviye tamamlandı
    gorevDurum.seviye = (gorevDurum.seviye || 0) + 1;
    gorevDurum.oyun = (gorevDurum.oyun || 0) + 1;
    localStorage.setItem('yt_gorevler', JSON.stringify(gorevDurum));

    // Devam Et için kaydet
    localStorage.setItem('yt_devam', JSON.stringify({
        kategori: secilenKategoriId,
        seviye: mevcutSeviyeNo
    }));
    document.getElementById('btn-devam-et').classList.remove('hidden');

    ekonomiyiGuncelle();

    document.getElementById('kazanilan-yildizlar').textContent = '⭐'.repeat(yildiz) + '☆'.repeat(3 - yildiz);
    document.getElementById('unvan-rozet').textContent = unvan;
    document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
    document.getElementById('kazanilan-coin-metni').textContent = `+${bonus} Bonus Coin! 🪙`;
    document.getElementById('sonuc-mesaj').textContent = mesaj;

    // Başarımları kontrol et
    basarimlariKontrolEt();
}

// ==========================================
// 14. ÇARKIFELEK
// ==========================================

let carkDonuyor = false;
let carkAci = 0;

document.getElementById('spin-btn').addEventListener('click', () => {
    if (carkDonuyor) return;
    if (carkHakki <= 0) return alert('Bugünlük çevirme hakkın bitti! Yarın tekrar gel.');

    carkDonuyor = true;
    carkHakki--;
    carkCevirme++;
    localStorage.setItem('yt_cark_hakki', carkHakki);
    localStorage.setItem('yt_cark_cevirme', carkCevirme);
    document.getElementById('spins-left').textContent = carkHakki;

    sesCal(sesTiklama);
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
        else if (odul.tip === 'yildiz') {
            const key = 'yt_bonus_yildiz';
            const mevcut = parseInt(localStorage.getItem(key)) || 0;
            localStorage.setItem(key, mevcut + odul.miktar);
        }

        localStorage.setItem('yt_cark_hakki', carkHakki);
        document.getElementById('spins-left').textContent = carkHakki;
        ekonomiyiGuncelle();
        sesCal(sesCark);
        titret(100);
        alert(`Tebrikler! Kazandığın ödül: ${odul.isim}`);
    }, 4200);
});

// ==========================================
// 15. BAŞARIMLAR
// ==========================================

function basarimlariOlustur() {
    const liste = document.getElementById('basarim-listesi');
    liste.innerHTML = '';

    BASARIMLAR.forEach(b => {
        const tamam = localStorage.getItem(`yt_basarim_${b.id}`) === '1';
        const kart = document.createElement('div');
        kart.className = 'basarim-kart' + (tamam ? ' tamamlandi' : '');
        kart.innerHTML = `
            <div class="basarim-ikon">${b.ikon}</div>
            <div class="basarim-icerik">
                <div class="basarim-baslik">${b.baslik}</div>
                <div class="basarim-aciklama">${b.aciklama}</div>
                <div class="basarim-odul">Ödül: ${b.odul} 🪙</div>
            </div>
            <div class="basarim-check">${tamam ? '✅' : '⬜'}</div>
        `;
        liste.appendChild(kart);
    });
}

function basarimlariKontrolEt() {
    BASARIMLAR.forEach(b => {
        if (localStorage.getItem(`yt_basarim_${b.id}`) === '1') return;
        let deger = 0;

        if (b.tip === 'dogru') {
            // Toplam doğru cevap - localStorage'da tutmuyoruz, yaklaşık
            deger = parseInt(localStorage.getItem('yt_toplam_dogru')) || 0;
        } else if (b.tip === 'coin') {
            deger = toplamCoin;
        } else if (b.tip === 'cark') {
            deger = carkCevirme;
        } else if (b.tip === 'seviye') {
            let toplam = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k.startsWith('yt_yildiz_') && parseInt(localStorage.getItem(k)) > 0) toplam++;
            }
            deger = toplam;
        }

        if (deger >= b.hedef) {
            localStorage.setItem(`yt_basarim_${b.id}`, '1');
            toplamCoin += b.odul;
            ekonomiyiGuncelle();
        }
    });
}

// ==========================================
// 16. AYARLAR
// ==========================================

document.getElementById('toggle-music').addEventListener('change', (e) => {
    muzikAcik = e.target.checked;
    if (muzikAcik) muzikArkaplan.play().catch(() => {});
    else muzikArkaplan.pause();
});

document.getElementById('toggle-sfx').addEventListener('change', (e) => {
    sesAcik = e.target.checked;
});

document.getElementById('toggle-vibration').addEventListener('change', (e) => {
    titreşimAcik = e.target.checked;
});

document.getElementById('tema-btn').addEventListener('click', () => {
    alert('Tema değiştirme özelliği yakında eklenecek!');
});

document.getElementById('liderlik-btn').addEventListener('click', () => {
    alert('Liderlik tablosu özelliği yakında eklenecek!');
});

document.getElementById('sifirla-btn').addEventListener('click', () => {
    if (confirm('TÜM veriler silinecek. Emin misin?')) {
        localStorage.clear();
        location.reload();
    }
});

// ==========================================
// 17. GÜNLÜK GÖREVLER
// ==========================================

function gorevleriOlustur() {
    const liste = document.getElementById('gorev-listesi');
    liste.innerHTML = '';

    GOREVLER.forEach(g => {
        const mevcut = gorevDurum[g.tip] || 0;
        const tamam = mevcut >= g.hedef;
        const yuzde = Math.min(100, (mevcut / g.hedef) * 100);

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
// 18. PROFİL
// ==========================================

document.getElementById('kaydet-btn').addEventListener('click', () => {
    const isim = document.getElementById('player-name').value.trim() || 'Oyuncu';
    localStorage.setItem('yt_oyuncu', isim);
    document.getElementById('hosgeldin-metni').textContent = `Hoş geldin, ${isim}!`;
    sesCal(sesTiklama);
    titret();
    alert('İsim kaydedildi!');
});

document.getElementById('paylas-btn').addEventListener('click', () => {
    const isim = localStorage.getItem('yt_oyuncu') || 'Oyuncu';
    const mesaj = `${isim} - Yakın Tarih Oyunu Skorum: ${toplamCoin} Coin!`;
    if (navigator.share) {
        navigator.share({ title: 'Yakın Tarih', text: mesaj }).catch(() => {});
    } else {
        navigator.clipboard.writeText(mesaj);
        alert('Skorun kopyalandı!');
    }
});

// ==========================================
// 19. GENEL GEZİNTİ
// ==========================================

document.querySelectorAll('.nav-geri-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sesCal(sesTiklama);
        titret();
        const hedef = btn.dataset.hedef;
        const el = document.getElementById(hedef);
        if (el) ekranGoster(el);
    });
});

document.getElementById('baslangic-geri-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    ekranGoster(ekranAnaMenu);
});

document.getElementById('seviye-geri-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    ekranGoster(ekranBaslangic);
});

document.getElementById('tekrar-btn').addEventListener('click', () => {
    sesCal(sesTiklama);
    seviyeKartlariniOlustur();
    ekranGoster(ekranSeviye);
    if (muzikAcik) muzikArkaplan.play().catch(() => {});
});

// ==========================================
// 20. BAŞLANGIÇ
// ==========================================

function baslangicAyarlari() {
    // Kaydedilmiş isim
    const isim = localStorage.getItem('yt_oyuncu');
    if (isim) {
        document.getElementById('player-name').value = isim;
        document.getElementById('hosgeldin-metni').textContent = `Hoş geldin, ${isim}!`;
    }

    // Devam Et butonu
    if (localStorage.getItem('yt_devam')) {
        document.getElementById('btn-devam-et').classList.remove('hidden');
    }

    // Profil istatistikleri
    const dogru = parseInt(localStorage.getItem('yt_toplam_dogru')) || 0;
    const yanlis = parseInt(localStorage.getItem('yt_toplam_yanlis')) || 0;
    const total = dogru + yanlis;
    const dogruluk = total > 0 ? Math.round((dogru / total) * 100) : 0;

    document.getElementById('stat-score').textContent = toplamCoin;
    document.getElementById('stat-correct').textContent = dogru;
    document.getElementById('stat-wrong').textContent = yanlis;
    document.getElementById('stat-highscore').textContent = parseInt(localStorage.getItem('yt_highscore')) || 0;
    document.getElementById('dogruluk-value').textContent = dogruluk + '%';

    // Seviye sayısı
    let tamamlananSeviye = 0;
    let tamPuanSeviye = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('yt_yildiz_')) {
            const y = parseInt(localStorage.getItem(k)) || 0;
            if (y > 0) tamamlananSeviye++;
            if (y === 3) tamPuanSeviye++;
        }
    }
    document.getElementById('stat-levels').textContent = tamamlananSeviye;
    document.getElementById('stat-perfect').textContent = tamPuanSeviye;

    ekonomiyiGuncelle();
}

baslangicAyarlari();

});
