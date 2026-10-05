// ==========================================
// YAKIN TARİH - TÜM UYGULAMA MANTIĞI
// ==========================================

// GÜNÜN İLGİNÇ BİLGİLERİ HAVUZU
const GUNUN_BILGILERI = [
    "II. Dünya Savaşı sırasında Coca-Cola şurubu Almanya'ya ithal edilemeyince alternatif olarak Fanta icat edilmiştir.",
    "Kuzey Kore, 1974 yılında İsveç'ten aldığı 1.000 adet Volvo otomobilin parasını hâlâ ödememiştir.",
    "ABD ordusunun Soğuk Savaş yıllarında yanlışlıkla denizlere düşürdüğü ve hâlâ bulunamayan en az 6 adet kayıp nükleer bombası vardır.",
    "Müttefikler, II. Dünya Savaşı'nda düşmanı kandırmak için şişme tanklardan oluşan 'Hayalet Ordu' adında gizli bir birlik kurmuştur.",
    "1932 yılında Avustralya ordusu, ekinlere zarar veren 20.000 devekuşuna (Emu) karşı savaş ilan etmiş ve savaşı devekuşları kazanmıştır!",
    "Titanik battığında gemide bulunan tek Türk, rötar yaptığı için gemiyi kaçıran Osmanlı mebusu Mustafa Şükrü Bey'di.",
    "Soğuk Savaş sırasında ABD, Ay üzerinde bir nükleer bomba patlatarak gücünü göstermeyi planlamıştır (Proje A119)."
];

window.addEventListener('DOMContentLoaded', () => {

    let tumKategoriSorulari = [];
    let sorular = [];
    let mevcutSoruIndex = 0;
    let skor = 0;
    let secilenKategoriId = null;
    let mevcutSeviyeNo = 1;

    // Coin & Oyun Durumları
    let toplamCoin = parseInt(localStorage.getItem('yt_coin')) || 100;
    let ciftSansAktif = false;
    let sesAcik = true;

    // Ses Elemanları
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

    // Joker Butonları
    const joker5050Btn = document.getElementById('joker-5050');
    const jokerCiftBtn = document.getElementById('joker-cift');
    const jokerDogruBtn = document.getElementById('joker-dogru');

    // Başlangıç Güncellemeleri
    ekonomiyiGuncelle();
    gununBilgisiniYukle();

    // GÜNÜN BİLGİSİNİ TARİHE GÖRE YÜKLE
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

    // EKONOMİ VE PUSULA GÜNCELLE
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

    // 1. AÇILIŞ EKRANI -> ANA MENÜYE GEÇİŞ
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
        }, 600);
    });

    // 2. ANA MENÜ BUTONLARI
    document.getElementById('btn-oyuna-basla').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranAnaMenu.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // Günlük Ödül (+50 Coin)
    document.getElementById('btn-gunluk-odul').addEventListener('click', () => {
        sesCal(sesTiklama);
        const sonAlinanTarih = localStorage.getItem('yt_gunluk_tarih');
        const bugun = new Date().toDateString();

        if (sonAlinanTarih === bugun) {
            alert('Bugünkü ödülünü zaten aldın! Yarın tekrar gel 🎁');
        } else {
            toplamCoin += 50;
            localStorage.setItem('yt_gunluk_tarih', bugun);
            ekonomiyiGuncelle();
            alert('Tebrikler! 50 Coin Hesabına Eklendi 🪙');
        }
    });

    // Nasıl Oynanır?
    document.getElementById('btn-nasil-oynanir').addEventListener('click', () => {
        sesCal(sesTiklama);
        alert(
            "📜 YAKIN TARİH NASIL OYNANIR?\n\n" +
            "1. Kategori ve Seviye seçerek yarışmaya başla.\n" +
            "2. Her seviyede 10 soru bulunur. Doğru cevaplar size Coin ve Puan kazandırır.\n" +
            "3. Takıldığın yerlerde 50/50, 2. Şans veya Pas jokerlerini kullanabilirsin.\n" +
            "4. Seviyeleri geçmek ve yenilerini açmak için en az 1 Yıldız kazanmalısın!"
        );
    });

    // Ses Aç/Kapat
    const btnSes = document.getElementById('btn-ses-kontrol');
    btnSes.addEventListener('click', () => {
        sesAcik = !sesAcik;
        if (sesAcik) {
            btnSes.textContent = "🔊 Ses: Açık";
            muzikArkaplan.play().catch(() => {});
        } else {
            btnSes.textContent = "🔇 Ses: Kapalı";
            muzikArkaplan.pause();
        }
    });

    // Ana Menüye Dönüş Butonu
    document.getElementById('baslangic-geri-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranBaslangic.classList.remove('aktif');
        ekranAnaMenu.classList.add('aktif');
    });

    // 3. KATEGORİ SEÇİMİ
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            sesCal(sesTiklama);
            secilenKategoriId = e.target.dataset.kategori;
            const kategoriAdi = e.target.textContent;

            const yuklendi = await kategoriSorulariniYukle(secilenKategoriId);
            if (yuklendi) {
                document.getElementById('seviye-kategori-baslik').textContent = `🎯 ${kategoriAdi}`;
                seviyeKartlariniOlustur();
                ekranBaslangic.classList.remove('aktif');
                ekranSeviye.classList.add('aktif');
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
            alert('Sorular yüklenirken bir hata oluştu!');
            return false;
        }
    }

    // 4. SEVİYE KARTLARI
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
                kart.innerHTML = `
                    <span class="baslik">Seviye ${i}</span>
                    <span class="yildizlar">${yildizMetni}</span>
                `;
                kart.addEventListener('click', () => seviyeBaslat(i));
            } else {
                kart.classList.add('kilitli');
                kart.innerHTML = `
                    <span class="baslik">🔒 Seviye ${i}</span>
                    <span class="yildizlar" style="font-size:0.75rem;">Önceki Seviyeyi Geç</span>
                `;
                kart.addEventListener('click', () => {
                    alert(`Seviye ${i}'yi açmak için Seviye ${i - 1}'den en az 1 Yıldız kazanmalısın!`);
                });
            }

            seviyeListesi.appendChild(kart);
        }
    }

    document.getElementById('seviye-geri-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        ekranSeviye.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // 5. SEVİYE BAŞLAT
    function seviyeBaslat(seviyeNo) {
        sesCal(sesTiklama);
        mevcutSeviyeNo = seviyeNo;

        const baslangicIndex = (seviyeNo - 1) * 10;
        const bitisIndex = seviyeNo * 10;
        
        const seviyeSorulari = tumKategoriSorulari.slice(baslangicIndex, bitisIndex);
        sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);

        mevcutSoruIndex = 0;
        skor = 0;
        
        jokerleriSifirla();
        ekonomiyiGuncelle();

        ekranSeviye.classList.remove('aktif');
        ekranSoru.classList.add('aktif');

        soruGoster();
    }

    function jokerleriSifirla() {
        ciftSansAktif = false;
        joker5050Btn.disabled = false;
        jokerCiftBtn.disabled = false;
        jokerDogruBtn.disabled = false;
    }

    // 6. SORU GÖSTER
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
            btn.dataset.index = index;
            btn.textContent = `${String.fromCharCode(65 + index)}) ${secenek}`;
            btn.addEventListener('click', () => cevapKontrol(index, btn));
            seceneklerDiv.appendChild(btn);
        });
    }

    // JOKER MANTIKLARI
    joker5050Btn.addEventListener('click', () => {
        if (toplamCoin < 20) return alert('Yetersiz Coin! En az 20 Coin gerekli.');

        toplamCoin -= 20;
        ekonomiyiGuncelle();
        joker5050Btn.disabled = true;

        const soru = sorular[mevcutSoruIndex];
        const dogruIndex = soru.dogruCevap;
        const tumButonlar = Array.from(document.querySelectorAll('.secenek-btn'));

        const yanlisIndexler = tumButonlar.map((_, idx) => idx).filter(idx => idx !== dogruIndex);
        yanlisIndexler.sort(() => Math.random() - 0.5);
        
        yanlisIndexler.slice(0, 2).forEach(idx => tumButonlar[idx].classList.add('gizli-secenek'));
    });

    jokerCiftBtn.addEventListener('click', () => {
        if (toplamCoin < 30) return alert('Yetersiz Coin! En az 30 Coin gerekli.');

        toplamCoin -= 30;
        ekonomiyiGuncelle();
        ciftSansAktif = true;
        jokerCiftBtn.disabled = true;
        alert('2. Şans Jokeri Aktif! İlk yanlışında elenmeyeceksin.');
    });

    jokerDogruBtn.addEventListener('click', () => {
        if (toplamCoin < 50) return alert('Yetersiz Coin! En az 50 Coin gerekli.');

        toplamCoin -= 50;
        ekonomiyiGuncelle();
        jokerDogruBtn.disabled = true;

        const soru = sorular[mevcutSoruIndex];
        const tumButonlar = document.querySelectorAll('.secenek-btn');
        cevapKontrol(soru.dogruCevap, tumButonlar[soru.dogruCevap]);
    });

    // CEVAP KONTROLÜ
    function cevapKontrol(secilenIndex, secilenBtn) {
        const soru = sorular[mevcutSoruIndex];
        const dogruIndex = soru.dogruCevap;
        const tumButonlar = document.querySelectorAll('.secenek-btn');
        
        if (secilenIndex === dogruIndex) {
            secilenBtn.classList.add('dogru');
            skor += 10;
            toplamCoin += 10;
            sesCal(sesDogru);
            ekonomiyiGuncelle();
            
            tumButonlar.forEach(btn => btn.disabled = true);
            sonrakiSoruyaGec(soru);
        } else {
            if (ciftSansAktif) {
                ciftSansAktif = false;
                secilenBtn.classList.add('yanlis');
                secilenBtn.disabled = true;
                sesCal(sesYanlis);
                alert('Yanlış cevap! Ama 2. Şans hakkın sayesinde bir seçim daha yapabilirsin.');
            } else {
                secilenBtn.classList.add('yanlis');
                if (tumButonlar[dogruIndex]) tumButonlar[dogruIndex].classList.add('dogru');
                sesCal(sesYanlis);
                tumButonlar.forEach(btn => btn.disabled = true);
                sonrakiSoruyaGec(soru);
            }
        }
    }

    function sonrakiSoruyaGec(soru) {
        if (soru.aciklama) {
            document.getElementById('aciklama-metni').textContent = '💡 ' + soru.aciklama;
            document.getElementById('aciklama-kutu').classList.remove('gizli');
        }
        
        setTimeout(() => {
            mevcutSoruIndex++;
            soruGoster();
        }, 2200);
    }

    // 7. BİTİŞ EKRANI
    function yarismayiBitir() {
        ekranSoru.classList.remove('aktif');
        ekranSonuc.classList.add('aktif');
        
        if (sesAcik) muzikArkaplan.pause();
        sesCal(sesCark);
        
        const maxSkor = sorular.length * 10;
        const yuzde = (skor / maxSkor) * 100;
        
        let kazanilanYildiz = 0;
        let bonusCoin = 0;
        let mesaj = '';
        let unvan = '';

        if (yuzde >= 90) {
            kazanilanYildiz = 3;
            bonusCoin = 50;
            unvan = '🏆 Tarih Üstadı';
            mesaj = 'Mükemmel bir performans! 3 Yıldız Kazandın.';
        } else if (yuzde >= 70) {
            kazanilanYildiz = 2;
            bonusCoin = 30;
            unvan = '🎖️ Savaş Stratejisti';
            mesaj = 'Harika! 2 Yıldız Kazandın.';
        } else if (yuzde >= 50) {
            kazanilanYildiz = 1;
            bonusCoin = 15;
            unvan = '📜 Tarih Çaylağı';
            mesaj = 'Tebrikler! 1 Yıldız Kazandın.';
        } else {
            kazanilanYildiz = 0;
            bonusCoin = 0;
            unvan = '📖 Acemi Öğrenci';
            mesaj = 'Maalesef yıldız kazanamadın. Tekrar dene!';
        }

        toplamCoin += bonusCoin;
        const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${mevcutSeviyeNo}`;
        const eskiYildiz = parseInt(localStorage.getItem(yildizKey)) || 0;

        if (kazanilanYildiz > eskiYildiz) {
            localStorage.setItem(yildizKey, kazanilanYildiz);
        }

        ekonomiyiGuncelle();

        document.getElementById('kazanilan-yildizlar').textContent = '⭐'.repeat(kazanilanYildiz) || '☆☆☆';
        document.getElementById('unvan-rozet').textContent = unvan;
        document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
        document.getElementById('kazanilan-coin-metni').textContent = `+${bonusCoin} Bonus Coin Kazanıldı! 🪙`;
        document.getElementById('sonuc-mesaj').textContent = mesaj;
    }

    // TEKRAR DENE
    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesCal(sesTiklama);
        seviyeKartlariniOlustur();
        ekranSonuc.classList.remove('aktif');
        ekranSeviye.classList.add('aktif');
        if (sesAcik) muzikArkaplan.play().catch(() => {});
    });

});
