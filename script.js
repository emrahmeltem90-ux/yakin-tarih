// ==========================================
// UYGULAMA MANTIĞI (JSON Dosyalarından Dinamik Soru Çekme)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

    let sorular = [];
    let mevcutSoruIndex = 0;
    let skor = 0;
    let toplamSoru = 10;

    // Ses Elemanları
    const sesDogru = document.getElementById('ses-dogru');
    const sesYanlis = document.getElementById('ses-yanlis');
    const sesTiklama = document.getElementById('ses-tiklama');
    const sesCark = document.getElementById('ses-cark');
    const muzikArkaplan = document.getElementById('muzik-arkaplan');

    // Ekran Elemanları
    const ekranAcilis = document.getElementById('ekran-acilis');
    const ekranBaslangic = document.getElementById('ekran-baslangic');
    const ekranSoru = document.getElementById('ekran-soru');
    const ekranSonuc = document.getElementById('ekran-sonuc');

    // AÇILIŞ EKRANI - BAŞLA Butonu
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

    // Kategori Seçim Butonları
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            sesTiklama.play().catch(() => {});
            const secilenKategori = e.target.dataset.kategori; // 1 veya 2
            yarismayiBaslat(secilenKategori);
        });
    });

    // Yarışmayı Başlatma (JSON Dosyasından Dinamik Yükleme)
    async function yarismayiBaslat(kategoriId) {
        try {
            // sorular/sorular_1.json veya sorular/sorular_2.json dosyasından veri çek
            const response = await fetch(`sorular/sorular_${kategoriId}.json`);
            if (!response.ok) throw new Error('Soru dosyası okunamadı.');
            
            const gelenSorular = await response.json();

            if (!gelenSorular || gelenSorular.length === 0) {
                alert("Bu kategoride soru bulunamadı.");
                return;
            }

            // Gelen tüm soruları rastgele karıştır ve en fazla 10 soru seç
            const karistirilmis = [...gelenSorular].sort(() => Math.random() - 0.5);
            toplamSoru = Math.min(10, karistirilmis.length);
            sorular = karistirilmis.slice(0, toplamSoru);

            mevcutSoruIndex = 0;
            skor = 0;

            ekranBaslangic.classList.remove('aktif');
            ekranSoru.classList.add('aktif');

            soruGoster();
        } catch (err) {
            console.error('Soru yükleme hatası:', err);
            alert('Sorular yüklenirken bir hata oluştu! "sorular/" klasöründeki JSON dosyalarını kontrol edin.');
        }
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
        
        if (yuzde >= 90) mesaj = 'Muhteşem! Sen bir tarih uzmanısın! 🏆';
        else if (yuzde >= 70) mesaj = 'Çok iyi! Tarih bilgin sağlam. 👏';
        else if (yuzde >= 50) mesaj = 'Fena değil, biraz daha çalışmalısın. 📖';
        else mesaj = 'Tarih tekerrürden ibarettir, tekrar dene! 💪';
        
        document.getElementById('sonuc-mesaj').textContent = mesaj;
    }

    // Tekrar Oyna Butonu
    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        ekranSonuc.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
        muzikArkaplan.play().catch(() => {});
    });

});
