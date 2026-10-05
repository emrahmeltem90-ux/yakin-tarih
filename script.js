// ==========================================
// YAKIN TARİH - EKONOMİ VE JOKER MANTIĞI
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

    let tumKategoriSorulari = [];
    let sorular = [];
    let mevcutSoruIndex = 0;
    let skor = 0;
    let secilenKategoriId = null;
    let mevcutSeviyeNo = 1;

    // Coin & Joker Durumları
    let toplamCoin = parseInt(localStorage.getItem('yt_coin')) || 100; // 100 Başlangıç Bonusu
    let ciftSansAktif = false;
    let ciftSansKullanildi = false;

    // Ses Elemanları
    const sesDogru = document.getElementById('ses-dogru');
    const sesYanlis = document.getElementById('ses-yanlis');
    const sesTiklama = document.getElementById('ses-tiklama');
    const sesCark = document.getElementById('ses-cark');
    const muzikArkaplan = document.getElementById('muzik-arkaplan');

    // Ekranlar
    const ekranAcilis = document.getElementById('ekran-acilis');
    const ekranBaslangic = document.getElementById('ekran-baslangic');
    const ekranSeviye = document.getElementById('ekran-seviye');
    const ekranSoru = document.getElementById('ekran-soru');
    const ekranSonuc = document.getElementById('ekran-sonuc');

    // Joker Butonları
    const joker5050Btn = document.getElementById('joker-5050');
    const jokerCiftBtn = document.getElementById('joker-cift');
    const jokerDogruBtn = document.getElementById('joker-dogru');

    // İlk Yüklemede Ekonomiyi Güncelle
    ekonomiyiGuncelle();

    function ekonomiyiGuncelle() {
        localStorage.setItem('yt_coin', toplamCoin);
        
        // Toplam Yıldızları Hesapla
        let toplamYildiz = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('yt_yildiz_')) {
                toplamYildiz += parseInt(localStorage.getItem(key)) || 0;
            }
        }

        document.getElementById('toplam-coin').textContent = toplamCoin;
        document.getElementById('toplam-yildiz').textContent = toplamYildiz;
        document.getElementById('seviye-coin').textContent = toplamCoin;
        document.getElementById('seviye-yildiz').textContent = toplamYildiz;
        document.getElementById('soru-coin').textContent = toplamCoin;
    }

    // AÇILIŞ EKRANI
    document.getElementById('basla-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        ekranAcilis.style.opacity = '0';
        
        setTimeout(() => {
            ekranAcilis.classList.remove('aktif');
            ekranBaslangic.classList.add('aktif');
            muzikArkaplan.volume = 0.2;
            muzikArkaplan.play().catch(() => {});
        }, 600);
    });

    // KATEGORİ SEÇİMİ
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            sesTiklama.play().catch(() => {});
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

    // SEVİYE KARTLARI VE YILDIZ MANTIĞI
    function seviyeKartlariniOlustur() {
        const seviyeListesi = document.getElementById('seviye-listesi');
        seviyeListesi.innerHTML = '';

        const toplamSeviye = Math.ceil(tumKategoriSorulari.length / 10);

        for (let i = 1; i <= toplamSeviye; i++) {
            const kart = document.createElement('div');
            kart.className = 'seviye-kart';

            const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${i}`;
            const kazanilanYildiz = parseInt(localStorage.getItem(yildizKey)) || 0;

            // Önceki seviyeden en az 1 yıldız alındıysa veya Seviye 1 ise AÇIKTIR
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
        sesTiklama.play().catch(() => {});
        ekranSeviye.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // SEVİYE BAŞLAT
    function seviyeBaslat(seviyeNo) {
        sesTiklama.play().catch(() => {});
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
        ciftSansKullanildi = false;
        
        joker5050Btn.disabled = false;
        jokerCiftBtn.disabled = false;
        jokerDogruBtn.disabled = false;
    }

    // SORU GÖSTER
    function soruGoster() {
        if (mevcutSoruIndex >= sorular.length) {
            yarismayiBitir();
            return;
        }
        
        ciftSansAktif = false; // Her soruda resetle
        
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

    // JOKER 1: 50/50 (20 COIN)
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

    // JOKER 2: 2. ŞANS / ÇİFT CEVAP (30 COIN)
    jokerCiftBtn.addEventListener('click', () => {
        if (toplamCoin < 30) return alert('Yetersiz Coin! En az 30 Coin gerekli.');

        toplamCoin -= 30;
        ekonomiyiGuncelle();
        ciftSansAktif = true;
        ciftSansKullanildi = true;
        jokerCiftBtn.disabled = true;
        alert('2. Şans Jokeri Aktif! İlk yanlışında elenmeyeceksin.');
    });

    // JOKER 3: PAS / DOĞRU CEVAP (50 COIN)
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
            toplamCoin += 10; // Doğru cevaba +10 Coin
            sesDogru.play().catch(() => {});
            ekonomiyiGuncelle();
            
            tumButonlar.forEach(btn => btn.disabled = true);
            sonrakiSoruyaGec(soru);
        } else {
            // Eğer 2. Şans Jokeri aktifse hemen elenme
            if (ciftSansAktif) {
                ciftSansAktif = false; // Tek kullanımlık
                secilenBtn.classList.add('yanlis');
                secilenBtn.disabled = true;
                sesYanlis.play().catch(() => {});
                alert('Yanlış cevap! Ama 2. Şans hakkın sayesinde bir seçim daha yapabilirsin.');
            } else {
                secilenBtn.classList.add('yanlis');
                if (tumButonlar[dogruIndex]) tumButonlar[dogruIndex].classList.add('dogru');
                sesYanlis.play().catch(() => {});
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

    // BİTİŞ EKRANI & ÖDÜLLER
    function yarismayiBitir() {
        ekranSoru.classList.remove('aktif');
        ekranSonuc.classList.add('aktif');
        
        muzikArkaplan.pause();
        sesCark.play().catch(() => {});
        
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

        // Yıldız ve Bonus Coin Kaydı
        toplamCoin += bonusCoin;
        const yildizKey = `yt_yildiz_kat_${secilenKategoriId}_sev_${mevcutSeviyeNo}`;
        const eskiYildiz = parseInt(localStorage.getItem(yildizKey)) || 0;

        if (kazanilanYildiz > eskiYildiz) {
            localStorage.setItem(yildizKey, kazanilanYildiz);
        }

        ekonomiyiGuncelle();

        // UI Güncelleme
        document.getElementById('kazanilan-yildizlar').textContent = '⭐'.repeat(kazanilanYildiz) || '☆☆☆';
        document.getElementById('unvan-rozet').textContent = unvan;
        document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
        document.getElementById('kazanilan-coin-metni').textContent = `+${bonusCoin} Bonus Coin Kazanıldı! 🪙`;
        document.getElementById('sonuc-mesaj').textContent = mesaj;
    }

    // TEKRAR OYNA
    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        seviyeKartlariniOlustur();
        ekranSonuc.classList.remove('aktif');
        ekranSeviye.classList.add('aktif');
        muzikArkaplan.play().catch(() => {});
    });

});
