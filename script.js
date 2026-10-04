// ==========================================
// UYGULAMA MANTIĞI (Kategori -> Seviye -> 10'ar Soru)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

    let tumKategoriSorulari = []; // Seçilen dosyadaki 100 sorunun tamamı
    let sorular = [];             // O seviyeye ait 10 soru
    let mevcutSoruIndex = 0;
    let skor = 0;
    let secilenKategoriId = null;

    // Ses Elemanları
    const sesDogru = document.getElementById('ses-dogru');
    const sesYanlis = document.getElementById('ses-yanlis');
    const sesTiklama = document.getElementById('ses-tiklama');
    const sesCark = document.getElementById('ses-cark');
    const muzikArkaplan = document.getElementById('muzik-arkaplan');

    // Ekran Elemanları
    const ekranAcilis = document.getElementById('ekran-acilis');
    const ekranBaslangic = document.getElementById('ekran-baslangic');
    const ekranSeviye = document.getElementById('ekran-seviye');
    const ekranSoru = document.getElementById('ekran-soru');
    const ekranSonuc = document.getElementById('ekran-sonuc');

    // 1. AÇILIŞ EKRANI - BAŞLA
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

    // 2. KATEGORİ SEÇİMİ -> SEVİYE EKRANINA GEÇİŞ
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            sesTiklama.play().catch(() => {});
            secilenKategoriId = e.target.dataset.kategori;
            const kategoriAdi = e.target.textContent;

            // İlgili JSON dosyasından tüm soruları yükle
            const yuklendi = await kategoriSorulariniYukle(secilenKategoriId);
            
            if (yuklendi) {
                document.getElementById('seviye-kategori-baslik').textContent = `🎯 ${kategoriAdi}`;
                seviyeButonlariniOlustur();
                
                ekranBaslangic.classList.remove('aktif');
                ekranSeviye.classList.add('aktif');
            }
        });
    });

    // JSON Dosyasını Çekme
    async function kategoriSorulariniYukle(kategoriId) {
        try {
            const response = await fetch(`sorular/sorular_${kategoriId}.json`);
            if (!response.ok) throw new Error('Dosya okunamadı');
            tumKategoriSorulari = await response.json();
            return true;
        } catch (err) {
            console.error(err);
            alert('Sorular yüklenirken bir hata oluştu!');
            return false;
        }
    }

    // Dynamic 10 Seviye Butonu Oluşturma
    function seviyeButonlariniOlustur() {
        const seviyeListesi = document.getElementById('seviye-listesi');
        seviyeListesi.innerHTML = '';

        // Toplam soru sayısına göre kaç seviye çıkacağını hesaplar (100 soru -> 10 seviye)
        const toplamSeviye = Math.ceil(tumKategoriSorulari.length / 10);

        for (let i = 1; i <= toplamSeviye; i++) {
            const btn = document.createElement('button');
            btn.className = 'seviye-btn';
            btn.textContent = `Seviye ${i}`;
            btn.addEventListener('click', () => seviyeBaslat(i));
            seviyeListesi.appendChild(btn);
        }
    }

    // Seviye Seçiminden Kategorilere Geri Dönüş
    document.getElementById('seviye-geri-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        ekranSeviye.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // 3. SEVİYE BAŞLATMA (İlgili 10 Soruyu Dilimleme)
    function seviyeBaslat(seviyeNo) {
        sesTiklama.play().catch(() => {});

        // Örn: Seviye 1 -> 0-10 arası sorular | Seviye 2 -> 10-20 arası sorular
        const baslangicIndex = (seviyeNo - 1) * 10;
        const bitisIndex = seviyeNo * 10;
        
        // Seçilen 10 soruyu al ve kendi içinde karıştır
        const seviyeSorulari = tumKategoriSorulari.slice(baslangicIndex, bitisIndex);
        sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);

        mevcutSoruIndex = 0;
        skor = 0;

        ekranSeviye.classList.remove('aktif');
        ekranSoru.classList.add('aktif');

        soruGoster();
    }

    // Soru Gösterme
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

    // Cevap Kontrolü
    function cevapKontrol(secilenIndex, secilenBtn) {
        const soru = sorular[mevcutSoruIndex];
        const dogruIndex = soru.dogruCevap;
        const tumButonlar = document.querySelectorAll('.secenek-btn');
        
        tumButonlar.forEach(btn => btn.disabled = true);
        
        if (secilenIndex === dogruIndex) {
            secilenBtn.classList.add('dogru');
            skor += 10;
            sesDogru.play().catch(() => {});
        } else {
            secilenBtn.classList.add('yanlis');
            if (tumButonlar[dogruIndex]) {
                tumButonlar[dogruIndex].classList.add('dogru');
            }
            sesYanlis.play().catch(() => {});
        }
        
        document.getElementById('skor-goster').textContent = `Skor: ${skor}`;
        
        if (soru.aciklama) {
            document.getElementById('aciklama-metni').textContent = '💡 ' + soru.aciklama;
            document.getElementById('aciklama-kutu').classList.remove('gizli');
        }
        
        setTimeout(() => {
            mevcutSoruIndex++;
            soruGoster();
        }, 2500);
    }

    // Yarışmayı Bitirme
    function yarismayiBitir() {
        ekranSoru.classList.remove('aktif');
        ekranSonuc.classList.add('aktif');
        
        muzikArkaplan.pause();
        sesCark.play().catch(() => {});
        
        document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;
        
        let mesaj = '';
        const maxSkor = sorular.length * 10;
        const yuzde = (skor / maxSkor) * 100;
        
        if (yuzde >= 90) mesaj = 'Muhteşem! Bu seviyeyi ustalıkla tamamladın! 🏆';
        else if (yuzde >= 70) mesaj = 'Çok iyi! Tarih bilgin oldukça sağlam. 👏';
        else if (yuzde >= 50) mesaj = 'Fena değil, biraz daha çalışabilirsin. 📖';
        else mesaj = 'Tarih tekerrürden ibarettir, tekrar dene! 💪';
        
        document.getElementById('sonuc-mesaj').textContent = mesaj;
    }

    // Sonuç Ekranı - Seviye Listesine Dönüş
    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        ekranSonuc.classList.remove('aktif');
        ekranSeviye.classList.add('aktif');
        muzikArkaplan.play().catch(() => {});
    });

});
