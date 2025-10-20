# 🎮 KeliMania - TDK Sözlük API Backend (Netlify)

## 📋 Bu Nedir?

Bu backend, KeliMania oyununun kelimeleri TDK Sözlük'ten kontrol etmesini sağlar.

**Netlify versiyonu** - Vercel'e alternatif, daha kolay!

---

## 🚀 ADIM ADIM KURULUM

### ADIM 1: Netlify'a Kaydol

1. **Git:** https://www.netlify.com
2. **"Sign up"** (sağ üstte)
3. **"GitHub"** ile giriş yap
4. **"Authorize Netlify"** bas
5. ✅ Giriş yaptın!

---

### ADIM 2: Dosyaları GitHub'a Yükle

**2A. GitHub'da Yeni Repository (Eğer yoksa):**

1. Git: https://github.com
2. **"New"** butonu (yeşil)
3. **Repository name:** `kelimania-backend`
4. **Public** seçili olsun
5. **"Create repository"** bas

**2B. Dosyaları Yükle:**

1. **"uploading an existing file"** linkine tıkla
2. Bu klasördeki dosyaları yükle:
   - `netlify` klasörü (içinde functions/check.js var)
   - `package.json`
   - `netlify.toml`
   - `README.md`
3. **"Commit changes"** bas

**Yapı şöyle olmalı:**
```
kelimania-backend/
├── netlify/
│   └── functions/
│       └── check.js
├── package.json
├── netlify.toml
└── README.md
```

---

### ADIM 3: Netlify'a Deploy Et

**3A. Netlify Dashboard:**

1. Git: https://app.netlify.com
2. **"Add new site"** butonu (yeşil)
3. **"Import an existing project"** seç

**3B. GitHub'ı Bağla:**

1. **"Deploy with GitHub"** seç
2. **"Authorize Netlify"** (eğer ilk defaysa)
3. Repository listesinde **"kelimania-backend"** bul
4. **Tıkla**

**3C. Site Ayarları:**

**ÇOK ÖNEMLİ - HİÇBİR ŞEY DEĞİŞTİRME!**

Göreceksin:
```
Site name: [otomatik isim]
Branch: main
Build command: (boş)
Publish directory: (boş)
```

**OLDUĞU GİBİ BIRAK!**

**"Deploy [site-name]"** butonu → **BAS!**

**3D. Bekle (2-3 Dakika):**

```
⚙️ Site deploy in progress...
📦 Installing dependencies...
✓ Deploy successful!
```

---

### ADIM 4: Link'i Al

**Deploy bitince göreceksin:**

```
✓ Site is live!

https://kelimania-backend-xxx.netlify.app
          ^^^^^^^^^^^^^^
       (seninkisi farklı olacak)
```

**Site ismini değiştirmek istersen:**

1. **"Site settings"** → **"Change site name"**
2. Yaz: `kelimania-api` (veya istediğin isim)
3. **"Save"** bas

**Yeni link:**
```
https://kelimania-api.netlify.app
```

**LİNKİ KOPYALA!**

---

### ADIM 5: Test Et

**Tarayıcıda test:**

```
https://kelimania-api.netlify.app/.netlify/functions/check?word=MASA
```

(Kendi linkini kullan)

**Görmek istediğimiz:**
```json
{
  "word": "MASA",
  "valid": true,
  "source": "tdk",
  "meanings": 3
}
```

✅ **Bu görünüyorsa BAŞARILI!**

---

### ADIM 6: Bana Bildir

**Buraya yaz:**
```
"Netlify hazır! Link: https://kelimania-api.netlify.app"
```

(Kendi linkini yapıştır)

---

## 🔧 API Kullanımı

**Endpoint:**
```
https://SENIN-SITE.netlify.app/.netlify/functions/check?word=KELIME
```

**Örnek İstek:**
```
GET /.netlify/functions/check?word=AĞAÇ
```

**Örnek Yanıt (Geçerli):**
```json
{
  "word": "AĞAÇ",
  "valid": true,
  "source": "tdk",
  "meanings": 5
}
```

**Örnek Yanıt (Geçersiz):**
```json
{
  "word": "ASDFG",
  "valid": false,
  "source": "tdk"
}
```

---

## 🆘 Sorun Giderme

### Sorun: "Function not found"

**Çözüm:**
- `netlify/functions/check.js` dosyası eksik
- GitHub'a tekrar yükle

### Sorun: "Build failed"

**Çözüm:**
- `package.json` eksik
- Netlify'da **"Retry deploy"** bas

### Sorun: Link çalışmıyor

**Çözüm:**
- URL'i kontrol et: `/.netlify/functions/check?word=MASA`
- `word=` parametresi olmalı

---

## ✅ Özet Checklist

- [ ] Netlify hesabı açtım
- [ ] GitHub'a dosyaları yükledim
- [ ] Netlify'a import ettim
- [ ] Deploy bitti
- [ ] Test linki çalışıyor
- [ ] Backend linkini aldım
- [ ] Claude'a bildirdim

---

## 📞 Yardım

Sorun olursa:
1. Hangi adımdasın söyle
2. Ekran görüntüsü al
3. Hata mesajını kopyala
4. Gönder

---

## 🎉 Başarılı Olduysan

Backend çalışıyor! Artık oyun **gerçek TDK Sözlük**'ü kullanacak! 🚀

**Netlify Avantajları:**
- ✅ Ücretsiz (aylık 100GB bandwidth)
- ✅ Otomatik HTTPS
- ✅ Hızlı deploy
- ✅ Kolay yönetim
- ✅ Türkiye'den erişilebilir
