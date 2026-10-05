// ==========================================
// UYGULAMA MANTIĞI (Kilitli Seviyeler + Joker + Rozet)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {

    let tumKategoriSorulari = [];
    let sorular = [];
    let mevcutSoruIndex = 0;
    let skor = 0;
    let secilenKategoriId = null;
    let mevcutSeviyeNo = 1;
    let jokerKullanildi = false;

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
    const jokerBtn = document.getElementById('joker-5050');

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

    // 2. KATEGORİ SEÇİMİ
    document.querySelectorAll('.kategori-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            sesTiklama.play().catch(() => {});
            secilenKategoriId = e.target.dataset.kategori;
            const kategoriAdi = e.target.textContent;

            const yuklendi = await kategoriSorulariniYukle(secilenKategoriId);
            
            if (yuklendi) {
                document.getElementById('seviye-kategori-baslik').textContent = `🎯 ${kategoriAdi}`;
                seviyeButonlariniOlustur();
                
                ekranBaslangic.classList.remove('aktif');
                ekranSeviye.classList.add('aktif');
            }
        });
    });

    // JSON Dosyasını Yükleme
    async function kategoriSorulariniYukle(kategoriId) {
        try {
            const response = await fetch(`sorular/sorular_${kategoriId}.json`);
            if (!response.ok) throw new Error('Dosya okunamadı');
            tumKategoriSorulari = await response.json();
            return true;
        } catch (err) {
            console.error(err);
            alert('Sorular yüklenirken hata oluştu! JSON dosya yolunu kontrol edin.');
            return false;
        }
    }

    // 3. SEVİYE BUTONLARINI OLUŞTURMA & KİLİT MANTIĞI (LocalStorage)
    function seviyeButonlariniOlustur() {
        const seviyeListesi = document.getElementById('seviye-listesi');
        seviyeListesi.innerHTML = '';

        // Kayıtlı ilerlemeyi oku (Varsayılan olarak Seviye 1 açıktır)
        const acikSeviyeKey = `yakintarih_kat_${secilenKategoriId}_seviye`;
        const enYuksekAcikSeviye = parseInt(localStorage.getItem(acikSeviyeKey)) || 1;

        const toplamSeviye = Math.ceil(tumKategoriSorulari.length / 10);

        for (let i = 1; i <= toplamSeviye; i++) {
            const btn = document.createElement('button');
            btn.className = 'seviye-btn';

            if (i <= enYuksekAcikSeviye) {
                btn.textContent = `Seviye ${i}`;
                btn.addEventListener('click', () => seviyeBaslat(i));
            } else {
                btn.textContent = `🔒 Seviye ${i}`;
                btn.classList.add('kilitli');
                btn.addEventListener('click', () => {
                    alert(`Bu seviyeyi açmak için öncelikle Seviye ${i - 1}'i en az 70 puanla tamamlamalısın!`);
                });
            }

            seviyeListesi.appendChild(btn);
        }
    }

    document.getElementById('seviye-geri-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        ekranSeviye.classList.remove('aktif');
        ekranBaslangic.classList.add('aktif');
    });

    // 4. SEVİYE BAŞLATMA
    function seviyeBaslat(seviyeNo) {
        sesTiklama.play().catch(() => {});
        mevcutSeviyeNo = seviyeNo;

        const baslangicIndex = (seviyeNo - 1) * 10;
        const bitisIndex = seviyeNo * 10;
        
        const seviyeSorulari = tumKategoriSorulari.slice(baslangicIndex, bitisIndex);
        sorular = [...seviyeSorulari].sort(() => Math.random() - 0.5);

        mevcutSoruIndex = 0;
        skor = 0;
        jokerKullanildi = false;
        jokerBtn.disabled = false;
        jokerBtn.textContent = '🌓 50/50 Joker';

        ekranSeviye.classList.remove('aktif');
        ekranSoru.classList.add('aktif');

        soruGoster();
    }

    // 5. SORU GÖSTERME
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
            btn.dataset.index = index;
            btn.textContent = `${String.fromCharCode(65 + index)}) ${secenek}`;
            btn.addEventListener('click', () => cevapKontrol(index, btn));
            seceneklerDiv.appendChild(btn);
        });
    }

    // 6. 50/50 JOKER MANTIĞI
    jokerBtn.addEventListener('click', () => {
        if (jokerKullanildi) return;

        sesTiklama.play().catch(() => {});
        jokerKullanildi = true;
        jokerBtn.disabled = true;
        jokerBtn.textContent = '❌ Joker Kullanıldı';

        const soru = sorular[mevcutSoruIndex];
        const dogruIndex = soru.dogruCevap;
        const tumButonlar = Array.from(document.querySelectorAll('.secenek-btn'));

        // Yanlış olan butonların indexlerini bul
        const yanlisIndexler = tumButonlar
            .map((_, idx) => idx)
            .filter(idx => idx !== dogruIndex);

        // Yanlış indexleri karıştırıp ilk 2 tanesini gizle
        yanlisIndexler.sort(() => Math.random() - 0.5);
        const elenecekler = yanlisIndexler.slice(0, 2);

        elenecekler.forEach(idx => {
            tumButonlar[idx].classList.add('gizli-secenek');
        });
    });

    // 7. CEVAP KONTROLÜ
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

    // 8. YARIŞMAYI BİTİRME & KİLİT AÇMA & UNVAN HESAPLAMA
    function yarismayiBitir() {
        ekranSoru.classList.remove('aktif');
        ekranSonuc.classList.add('aktif');
        
        muzikArkaplan.pause();
        sesCark.play().catch(() => {});
        
        document.getElementById('sonuc-skor').textContent = `Skorun: ${skor}`;

        const maxSkor = sorular.length * 10;
        const yuzde = (skor / maxSkor) * 100;
        
        // Başarı Kriteri: %70 ve üzeri alan sonraki seviyeyi açar
        if (yuzde >= 70) {
            const acikSeviyeKey = `yakintarih_kat_${secilenKategoriId}_seviye`;
            const mevcutMaksimum = parseInt(localStorage.getItem(acikSeviyeKey)) || 1;
            
            if (mevcutSeviyeNo >= mevcutMaksimum) {
                localStorage.setItem(acikSeviyeKey, mevcutSeviyeNo + 1);
            }
        }

        // Unvan & Rozet Tanımlama
        const unvanRozet = document.getElementById('unvan-rozet');
        let mesaj = '';

        if (yuzde >= 90) {
            unvanRozet.textContent = '🏆 Tarih Üstadı';
            mesaj = 'Harika! Bir sonraki seviye seni bekliyor!';
        } else if (yuzde >= 70) {
            unvanRozet.textContent = '🎖️ Savaş Stratejisti';
            mesaj = 'Tebrikler! Seviyeyi başarıyla geçtin.';
        } else if (yuzde >= 50) {
            unvanRozet.textContent = '📜 Tarih Çaylağı';
            mesaj = 'Seviyeyi geçmek için en az 70 puan almalısın!';
        } else {
            unvanRozet.textContent = '📖 Acemi Öğrenci';
            mesaj = 'Biraz daha çalışıp tekrar denemelisin!';
        }
        
        document.getElementById('sonuc-mesaj').textContent = mesaj;
    }

    // 9. RE-PLAY / SEVİYE EKRANINA DÖNÜŞ
    document.getElementById('tekrar-btn').addEventListener('click', () => {
        sesTiklama.play().catch(() => {});
        seviyeButonlariniOlustur(); // Güncel kilit durumlarıyla butonları yeniden basar
        ekranSonuc.classList.remove('aktif');
        ekranSeviye.classList.add('aktif');
        muzikArkaplan.play().catch(() => {});
    });

});
