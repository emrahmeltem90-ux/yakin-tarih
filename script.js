// ==========================================
// YAKIN TARİH - TÜM MANTIK
// ==========================================

const GUNUN_BILGILERI = [
    "II. Dünya Savaşı sırasında Coca-Cola şurubu Almanya'ya ithal edilemeyince alternatif olarak Fanta icat edilmiştir.",
    "Kuzey Kore, 1974 yılında İsveç'ten aldığı 1.000 adet Volvo otomobilin parasını hâlâ ödememiştir.",
    "ABD ordusunun Soğuk Savaş yıllarında yanlışlıkla denizlere düşürdüğü ve hâlâ bulunamayan en az 6 adet kayıp nükleer bombası vardır.",
    "Müttefikler, II. Dünya Savaşı'nda düşmanı kandırmak için şişme tanklardan oluşan 'Hayalet Ordu' adında gizli bir birlik kurmuştur.",
    "1932 yılında Avustralya ordusu, ekinlere zarar veren 20.000 devekuşuna karşı savaş ilan etmiş ve savaşı devekuşları kazanmıştır!",
    "Titanik battığında gemide bulunan tek Türk, rötar yaptığı için gemiyi kaçıran Osmanlı mebusu Mustafa Şükrü Bey'di."
];

window.addEventListener('DOMContentLoaded', () => {

    let tumKategoriSorulari = [];
    let sorular = [];
    let mevcutSoruIndex = 0;
    let skor = 0;
    let secilenKategoriId = null;
    let mevcutSeviyeNo = 1;

    let toplamCoin = parseInt(localStorage.getItem('yt_coin')) || 100;
    let ciftSansAktif = false;
    let sesAcik = true;

    // Sesler
    const sesDogru = document.getElementById('ses-dogru');
    const sesYanlis = document.getElementById('ses-yanlis');
    const sesTiklama = document.getElementById('ses-tiklama');
    const sesCark = document.getElementById('ses-cark');
    const muzikArkaplan = document.getElementById('muzik-arkaplan');

    // Ekranlar
    const ekranAcilis = document.getElementById('ekran-acilis');
    const ekranAnaMenu = document.getElementById('ekran-anamenu');
    const ekranBaslangic = document.getElementById('ekran-baslangic');
    const ekranSeviye = document.getElementById('ekran-seviye');
    const ekranSoru = document.getElementById('ekran-soru');
    const ekranSonuc = document.getElementById('ekran-sonuc');

    // Jokerler
    const joker5050Btn = document.getElementById('joker-5050');
    const jokerCiftBtn = document.getElementById('joker-cift');
    const jokerDogruBtn = document.getElementById('joker-dogru');

    ekonomiyiGuncelle();
    gununBilgisiniYukle();

    function gununBilgisiniYukle() {
        const simdi = new Date();
        const baslangic = new Date(simdi.getFullYear(), 0, 0);
        const fark = simdi - baslangic;
        const birGun = 1000 * 60 * 60 * 24;
        const gunIndeksi = Math.floor(fark / birGun);

        const secilenBilgi = GUNUN_BILGILERI[gunIndeksi % GUNUN_BILGILERI.length];
        const bilgiElementi = document.getElementById('gunun-bilgisi-metin');
        if (bilgiElementi) {
            bilgiElementi.textContent = "“" + secilenBilgi + "”";
        }
    }

    function ekonomiyiGuncelle() {
        localStorage.setItem('yt_coin', toplamCoin);
        
        let toplamYildiz = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('yt_yildiz_')) {
                toplamYildiz += parseInt(localStorage.getItem(key)) || 0;
            }
        }

        document.getElementById('menu-coin').textContent = toplamCoin;
        document.getElementById('menu-yildiz').textContent = toplamYildiz;
        document.getElementById('toplam-coin').textContent = toplamCoin;
        document.getElementById('toplam-yildiz').textContent = toplamYildiz;
        document.getElementById('seviye-coin').textContent = toplamCoin;
        document.getElementById('seviye-yildiz').textContent = toplamYildiz;
        document.getElementById('soru-coin').textContent = toplamCoin;
    }

    function sesCal(ses) {
        if (sesAcik && ses) {
            ses.currentTime = 0;
            ses.play().catch(() => {});
        }
    }

    // AÇILIŞ
    document.getElementById('basla-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranAcilis.style.opacity = '0';
        setTimeout(() => {
            ekranAcilis.classList.remove('aktif');
            ekranAnaMenu.classList.add('aktif');
            if (sesAcik) {
                muzikArkaplan.volume = 0.2;
                muzikArkaplan.play().catch(() => {});
            }
        }, 500);
    });

    // MENÜ BUTONLARI
    document.getElementById('btn-oyuna-basla').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranAnaMenu.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    document.getElementById('btn-devam-et').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Kaldığınız yerden devam ediliyor...');
    });

    document.getElementById('btn-gunluk-odul').addEventListener('click', () => {
        sesCal(sesTiklama);
        const sonAlinanTarih = localStorage.getItem('yt_gunluk_tarih');
        const bugun = new Date().toDateString();

        if (sonAlinanTarih === bugun) {
            alert('Bugünkü ödülünüzü zaten aldınız!');
        } else {
            toplamCoin += 50;
            localStorage.setItem('yt_gunluk_tarih', bugun);
            ekonomiyiGuncelle();
            alert('Tebrikler! +50 Coin eklendi.');
        }
    });

    document.getElementById('btn-gunluk-gorevler').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Günlük Görevler: Bugün 3 seviye tamamla (+30 Coin)');
    });

    document.getElementById('btn-basarimlar').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Başarımlar yakında eklenecek!');
    });

    document.getElementById('btn-carkifelek').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Çarkıfelek çok yakında aktif olacak!');
    });

    document.getElementById('btn-davet').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Davet bağlantısı kopyalandı! Arkadaşın katıldığında +10 Yıldız kazanacaksın.');
    });

    const btnSes = document.getElementById('btn-ses-kontrol');
    btnSes.addEventListener('click', () => {
        sesAcik = !sesAcik;
        if (sesAcik) {
            btnSes.textContent = "SES: AÇIK";
            muzikArkaplan.play().catch(() => {});
        } else {
            btnSes.textContent = "SES: KAPALI";
            muzikArkaplan.pause();
        }
    });

    document.getElementById('btn-nasil-oynanir').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert('Kategori ve seviye seçip soruları doğru yanıtlayarak yıldız ve coin toplayın.');
    });

    document.getElementById('baslangic-geri-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranBaslangic.classList.remove('aktif');
        ekranAnaMenu.classList.add('aktif');
    });

    // KATEGORİ
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            sesCal(sesTiklama);
            secilenKategoriId = e.target.dataset.kategori;
            const kategoriAdi = e.target.textContent;

            const yuklendi = await kategoriSorulariniYukle(secilenKategoriId);
            if (yuklendi) {
                document.getElementById('seviye-kategori-baslik').textContent = kategoriAdi;
                seviyeKartlariniOlustur();
                ekranBaslangic.classList.remove('aktif');
                ekranSeviye.classList.add('aktif');
            }
        });
    });

    async function kategoriSorulariniYukle(kategoriId) {
        try {
            const response = await fetch(`sorular/sorular_${kategoriId}.json`);
            if (!response.ok) throw new Error('Hata');
            tumKategoriSorulari = await response.json();
            return true;
        } catch (err) {
            alert('Sorular yüklenemedi!');
            return false;
        }
    }

    // SEVİYELER
    function seviyeKartlariniOlustur() {
        const seviyeListesi = document.getElementById('seviye-listesi');
        seviyeListesi.innerHTML = '';
        const toplamSeviye = Math.ceil(tumKategoriSorulari.length / 10);

        for (let i = 1; i <= toplamSeviye; i++) {
            const kart = document.createElement('div');
            kart.className = 'seviye-kart';

            const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${i}`;
            const kazanilanYildiz = parseInt(localStorage.getItem(yildizKey)) || 0;
            const oncekiYildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${i - 1}`;
            const oncekiYildiz = parseInt(localStorage.getItem(oncekiYildizKey)) || 0;

            if (i === 1 || oncekiYildiz > 0) {
                let yildizMetni = '⭐⭐⭐'.substring(0, kazanilanYildiz) || '☆☆☆';
                kart.innerHTML = `<span>Seviye ${i}</span><span>${yildizMetni}</span>`;
                kart.addEventListener('click', () => seviyeBaslat(i));
            } else {
                kart.classList.add('kilitli');
                kart.innerHTML = `<span>🔒 Seviye ${i}</span><span style="font-size:0.7rem;">Kilitli</span>`;
            }
            seviyeListesi.appendChild(kart);
        }
    }

    document.getElementById('seviye-geri-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranSeviye.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // SEVİYE BAŞLAT
    function seviyeBaslat(seviyeNo) {
        sesCal(sesTiklama);
        mevcutSeviyeNo = seviyeNo;

        const baslangicIndex = (seviyeNo - 1) * 10;
        const seviyeSorulari = tumKategoriSorulari.slice(baslangicIndex, seviyeNo * 10);
        sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);

        mevcutSoruIndex = 0;
        skor = 0;
        ciftSansAktif = false;

        joker5050Btn.disabled = false;
        jokerCiftBtn.disabled = false;
        jokerDogruBtn.disabled = false;

        ekonomiyiGuncelle();
        ekranSeviye.classList.remove('aktif');
        ekranSoru.classList.add('aktif');

        soruGoster();
    }

    function soruGoster() {
        if (mevcutSoruIndex >= sorular.length) {
            yarismayiBitir();
            return;
        }

        ciftSansAktif = false;
        const soru = sorular[mevcutSoruIndex];

        document.getElementById('soru-sayaci').textContent = `Soru ${mevcutSoruIndex + 1}/${sorular.length}`;
        document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
        document.getElementById('soru-metni').textContent = soru.soru;
        document.getElementById('aciklama-kutu').classList.add('gizli');

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

    // JOKERLER
    joker5050Btn.addEventListener('click', () => {
        if (toplamCoin < 20) return alert('Yetersiz Coin!');
        toplamCoin -= 20;
        ekonomiyiGuncelle();
        joker5050Btn.disabled = true;

        const soru = sorular[mevcutSoruIndex];
        const tumButonlar = Array.from(document.querySelectorAll('.secenek-btn'));
        const yanlislar = tumButonlar.map((_, idx) => idx).filter(idx => idx !== soru.dogruCevap);
        yanlislar.sort(() => Math.random() - 0.5);
        yanlislar.slice(0, 2).forEach(idx => tumButonlar[idx].classList.add('gizli-secenek'));
    });

    jokerCiftBtn.addEventListener('click', () => {
        if (toplamCoin < 30) return alert('Yetersiz Coin!');
        toplamCoin -= 30;
        ekonomiyiGuncelle();
        ciftSansAktif = true;
        jokerCiftBtn.disabled = true;
        alert('2. Şans Jokeri Aktif!');
    });

    jokerDogruBtn.addEventListener('click', () => {
        if (toplamCoin < 50) return alert('Yetersiz Coin!');
        toplamCoin -= 50;
        ekonomiyiGuncelle();
        jokerDogruBtn.disabled = true;
        const soru = sorular[mevcutSoruIndex];
        const tumButonlar = document.querySelectorAll('.secenek-btn');
        cevapKontrol(soru.dogruCevap, tumButonlar[soru.dogruCevap]);
    });

    function cevapKontrol(secilenIndex, secilenBtn) {
        const soru = sorular[mevcutSoruIndex];
        const tumButonlar = document.querySelectorAll('.secenek-btn');

        if (secilenIndex === soru.dogruCevap) {
            secilenBtn.classList.add('dogru');
            skor += 10;
            toplamCoin += 10;
            sesCal(sesDogru);
            ekonomiyiGuncelle();
            tumButonlar.forEach(b => b.disabled = true);
            sonrakiSoruyaGec(soru);
        } else {
            if (ciftSansAktif) {
                ciftSansAktif = false;
                secilenBtn.classList.add('yanlis');
                secilenBtn.disabled = true;
                sesCal(sesYanlis);
            } else {
                secilenBtn.classList.add('yanlis');
                if (tumButonlar[soru.dogruCevap]) tumButonlar[soru.dogruCevap].classList.add('dogru');
                sesCal(sesYanlis);
                tumButonlar.forEach(b => b.disabled = true);
                sonrakiSoruyaGec(soru);
            }
        }
    }

    function sonrakiSoruyaGec(soru) {
        if (soru.aciklama) {
            document.getElementById('aciklama-metni').textContent = soru.aciklama;
            document.getElementById('aciklama-kutu').classList.remove('gizli');
        }
        setTimeout(() => {
            mevcutSoruIndex++;
            soruGoster();
        }, 2000);
    }

    function yarismayiBitir() {
        ekranSoru.classList.remove('aktif');
        ekranSonuc.classList.add('aktif');
        if (sesAcik) muzikArkaplan.pause();
        sesCal(sesCark);

        const yuzde = (skor / (sorular.length * 10)) * 100;
        let kazanilanYildiz = yuzde >= 90 ? 3 : yuzde >= 70 ? 2 : yuzde >= 50 ? 1 : 0;
        let bonusCoin = kazanilanYildiz * 15;

        toplamCoin += bonusCoin;
        const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${mevcutSeviyeNo}`;
        const eskiYildiz = parseInt(localStorage.getItem(yildizKey)) || 0;
        if (kazanilanYildiz > eskiYildiz) localStorage.setItem(yildizKey, kazanilanYildiz);

        ekonomiyiGuncelle();

        document.getElementById('kazanilan-yildizlar').textContent = '⭐'.repeat(kazanilanYildiz) || '☆☆☆';
        document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
        document.getElementById('kazanilan-coin-metni').textContent = `+${bonusCoin} Bonus Coin Kazanıldı!`;
    }

    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        seviyeKartlariniOlustur();
        ekranSonuc.classList.remove('aktif');
        ekranSeviye.classList.add('aktif');
        if (sesAcik) muzikArkaplan.play().catch(() => {});
    });

});
