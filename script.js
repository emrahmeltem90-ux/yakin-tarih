// ==========================================
// TEST SORULARI (Kategori 1: II. Dünya Savaşı, Kategori 2: Soğuk Savaş)
// ==========================================
const TEST_SORULARI = [
    {
        kategori: 1,
        soru: "II. Dünya Savaşı hangi yıl başlamıştır?",
        secenekler: ["1937", "1938", "1939", "1940"],
        dogruCevap: 2,
        aciklama: "Almanya'nın 1 Eylül 1939'da Polonya'yı işgal etmesiyle savaş başlamıştır."
    },
    {
        kategori: 1,
        soru: "II. Dünya Savaşı'nda Almanya'nın lideri kimdir?",
        secenekler: ["Mussolini", "Hitler", "Stalin", "Churchill"],
        dogruCevap: 1,
        aciklama: "Adolf Hitler, 1933-1945 yılları arasında Almanya'yı yönetmiştir."
    },
    {
        kategori: 1,
        soru: "Pearl Harbor saldırısını hangi ülke gerçekleştirmiştir?",
        secenekler: ["Almanya", "İtalya", "Japonya", "SSCB"],
        dogruCevap: 2,
        aciklama: "Japonya, 7 Aralık 1941'de ABD'nin Pearl Harbor üssüne saldırmıştır."
    },
    {
        kategori: 1,
        soru: "Normandiya Çıkarması hangi yıl yapılmıştır?",
        secenekler: ["1942", "1943", "1944", "1945"],
        dogruCevap: 2,
        aciklama: "6 Haziran 1944'te Müttefikler Normandiya kıyılarına çıkmıştır."
    },
    {
        kategori: 1,
        soru: "Hiroşima'ya atom bombası hangi yıl atılmıştır?",
        secenekler: ["1943", "1944", "1945", "1946"],
        dogruCevap: 2,
        aciklama: "6 Ağustos 1945'te Hiroşima'ya atom bombası atılmıştır."
    },
    {
        kategori: 1,
        soru: "II. Dünya Savaşı'nda Türkiye'nin Cumhurbaşkanı kimdir?",
        secenekler: ["Atatürk", "İsmet İnönü", "Celal Bayar", "Adnan Menderes"],
        dogruCevap: 1,
        aciklama: "İsmet İnönü, 1938-1950 yılları arasında cumhurbaşkanlığı yapmıştır."
    },
    {
        kategori: 1,
        soru: "SSCB'nin II. Dünya Savaşı'ndaki lideri kimdir?",
        secenekler: ["Lenin", "Stalin", "Kruşçev", "Gorbaçov"],
        dogruCevap: 1,
        aciklama: "Josef Stalin, savaş boyunca SSCB'yi yönetmiştir."
    },
    {
        kategori: 1,
        soru: "Almanya'nın Polonya'yı işgal tarihi nedir?",
        secenekler: ["1 Eylül 1939", "1 Ağustos 1939", "1 Ekim 1939", "1 Temmuz 1939"],
        dogruCevap: 0,
        aciklama: "1 Eylül 1939'da Almanya Polonya'yı işgal etmiştir."
    },
    {
        kategori: 1,
        soru: "Müttefik Devletler hangileridir?",
        secenekler: ["Almanya, İtalya, Japonya", "ABD, İngiltere, SSCB", "Türkiye, İspanya, İsveç", "Çin, Hindistan, Mısır"],
        dogruCevap: 1,
        aciklama: "ABD, İngiltere ve SSCB ana Müttefik devletlerdir."
    },
    {
        kategori: 1,
        soru: "II. Dünya Savaşı hangi yıl sona ermiştir?",
        secenekler: ["1943", "1944", "1945", "1946"],
        dogruCevap: 2,
        aciklama: "Japonya'nın 2 Eylül 1945'te teslim olmasıyla savaş sona ermiştir."
    },
    {
        kategori: 2,
        soru: "Soğuk Savaş hangi iki ülke arasında yaşanmıştır?",
        secenekler: ["ABD - İngiltere", "ABD - SSCB", "Almanya - Fransa", "Çin - Japonya"],
        dogruCevap: 1,
        aciklama: "Soğuk Savaş, ABD ve SSCB arasındaki ideolojik ve stratejik çekişmedir."
    },
    {
        kategori: 2,
        soru: "NATO hangi yıl kurulmuştur?",
        secenekler: ["1945", "1947", "1949", "1952"],
        dogruCevap: 2,
        aciklama: "NATO, 1949 yılında Washington'da kurulmuştur."
    },
    {
        kategori: 2,
        soru: "Varşova Paktı hangi yıl kurulmuştur?",
        secenekler: ["1949", "1952", "1955", "1958"],
        dogruCevap: 2,
        aciklama: "Varşova Paktı, 1955 yılında kurulmuştur."
    },
    {
        kategori: 2,
        soru: "Berlin Duvarı hangi yıl yıkılmıştır?",
        secenekler: ["1987", "1988", "1989", "1990"],
        dogruCevap: 2,
        aciklama: "9 Kasım 1989'da Berlin Duvarı yıkılmıştır."
    },
    {
        kategori: 2,
        soru: "SSCB hangi yıl dağılmıştır?",
        secenekler: ["1989", "1990", "1991", "1992"],
        dogruCevap: 2,
        aciklama: "SSCB, 25 Aralık 1991'de resmen dağılmıştır."
    }
];

// ==========================================
// UYGULAMA MANTIĞI
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
            const secilenKategori = parseInt(e.target.dataset.kategori);
            yarismayiBaslat(secilenKategori);
        });
    });

    // Yarışmayı Başlatma
    function yarismayiBaslat(kategoriId) {
        const filtrelenmisSorular = TEST_SORULARI.filter(s => s.kategori === kategoriId);
        sorular = [...filtrelenmisSorular].sort(() => Math.random() - 0.5).slice(0, toplamSoru);
        
        mevcutSoruIndex = 0;
        skor = 0;
        
        ekranBaslangic.classList.remove('aktif');
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
            tumButonlar[dogruIndex].classList.add('dogru');
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
