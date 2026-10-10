# 🐾 Kibble ($KIBBLE) - Impact-First Protocol on Solana

[![Solana](https://img.shields.io/badge/Solana-Token--2022-14F195?style=flat-square&logo=solana)](https://solana.com)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20dApp-9945FF?style=flat-square)](https://kibble-sol.github.io/Kibble/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Not just a tap-to-feed game — an automated, on-chain animal welfare protocol powered by Solana.**

---

## 🌟 Genel Bakış

**Kibble**, Solana üzerine kurulu etki odaklı bir Web3 protokolüdür. Zincir üzerindeki işlem hacmini ve kullanıcı etkileşimini, **Token-2022 transfer ücretleri** aracılığıyla sokak hayvanlarına mama sağlayan otomatik bir fonlama mekanizmasına dönüştürür.

- 🌐 **Canlı Web dApp:** [kibble-sol.github.io/Kibble/](https://kibble-sol.github.io/Kibble/)
- ✈️ **Telegram Hub:** [@kibblesol](https://t.me/kibblesol)
- 🐦 **X (Twitter):** [@kibblesol](https://x.com/kibblesol)

---

## ⚙️ Temel Mimari ve Çalışma Sırası

Protokolümüzün uçtan uca akışı sırasıyla şöyledir:

1. **Adım (Kullanıcı Katılımı - [#tracker](https://kibble-sol.github.io/Kibble/#tracker)):** Kullanıcıları topluluk etkileşimine katmak ve yüksek kullanıcı edinimi (user acquisition) sağlamak için tasarlanmış hafif ön uç takip ve besleme arayüzü. Canlı incele: [kibble-sol.github.io/Kibble/#tracker](https://kibble-sol.github.io/Kibble/#tracker).
2. **Adım (Zincir İçi Değer Motoru - Token-2022):** Token transferlerinde akıllı sözleşme seviyesinde otomatik olarak %2 transfer ücreti kesilerek aracı olmaksızın doğrudan hayvan besleme hazinesine aktarılması.
3. **Adım (Simülasyon ve Test - [#faucet](https://kibble-sol.github.io/Kibble/#faucet)):** Kullanıcıların Devnet üzerinde test SOL'ü ve $KIBBLE talep ederek transfer ücreti mekanizmalarını canlı olarak test etmesini sağlayan altyapı. Canlı test et: [kibble-sol.github.io/Kibble/#faucet](https://kibble-sol.github.io/Kibble/#faucet).
4. **Adım (Gerçek Dünya Etkisi - Proof of Feed):** Hazinede biriken fonların fiziksel mamaya dönüştürülmesi, sokak hayvanlarına dağıtılması ve on-chain / video kanıtlarıyla doğrulanması.

---

## 🎮 Bölüm 1: Dokunarak Besleme dApp'i ve Gerçek Dünya Etkisi

Kullanıcıların ön yüzde etkileşim kurarak topluluk metriklerini artırdığı ve hazine fonlarının sokaklarda fiziksel mamaya dönüştürüldüğü katman.

| 🎮 Tap-to-Feed dApp ([#tracker](https://kibble-sol.github.io/Kibble/#tracker)) | 🐾 Gerçek Dünyadan Örnekler (Etkinin Kanıtı) |
| :---: | :---: |
| <img src="assets/dapp-preview.jpg" width="340" alt="dApp Interface" /> | <img src="assets/proof-feed-1.jpg" width="340" alt="Proof of Feed #1" /> |
| *Kullanıcıların etkileşim kurduğu ön uç takip arayüzü.* | *Besleme Kanıtı: Gerçek dünya dağıtımı.* |

🔗 **Takip aracını canlı inceleyin:** [kibble-sol.github.io/Kibble/#tracker](https://kibble-sol.github.io/Kibble/#tracker)

---

## 🧪 Bölüm 2: Devnet Entegrasyonu ve Zincir Üzeri Sistemler

Solana Devnet üzerinde çalışan, musluk (faucet) entegrasyonu ve %2'lik kesin transfer ücreti yönlendirmesini test eden arka uç altyapısı.

| 🧪 Devnet Entegrasyonu ve Musluğu ([#faucet](https://kibble-sol.github.io/Kibble/#faucet)) #1 | 🧪 Devnet Entegrasyonu ve Musluğu ([#faucet](https://kibble-sol.github.io/Kibble/#faucet)) #2 |
| :---: | :---: |
| <img src="assets/Devnet1.jpg" width="340" alt="Devnet Testing #1" /> | <img src="assets/Devnet2.jpg" width="340" alt="Devnet Testing #2" /> |
| *Canlı Devnet musluk testi ve token talep akışı.* | *Protokol yürütme ve işlem izleme ekranı.* |

🔗 **Devnet musluğunu canlı test edin:** [kibble-sol.github.io/Kibble/#faucet](https://kibble-sol.github.io/Kibble/#faucet)

---

## 📂 Depo Yapısı

- `api/` - Musluk ve sunucusuz arka uç yönlendirme komut dosyaları
- `assets/` - Marka öğeleri, ekran görüntüleri ve etki kanıtı medya dosyaları
- `bot/` - Telegram otomasyon motoru ve gereksinimleri
- `CONTRIBUTING.md` - Katkı yönergeleri
- `Kibble-Litepaper.pdf` - Resmi proje litepaper dokümanı
- `LICENSE` - MIT Lisansı
- `README.md` - Proje dokümantasyonu
- `SECURITY.md` - Güvenlik ve açıklama politikası
- `index.html` - Web dApp arayüzü ve Web3 istemci mantığı
- `package.json` - Proje konfigürasyonları

---

## 🚀 Hızlı Başlangıç ve Yerel Kurulum

dApp'i saniyeler içinde yerel olarak çalıştırın:

1. Depoyu klonlayın: `git clone https://github.com/kibble-sol/Kibble.git`
2. Klasöre gidin: `cd Kibble`
3. `index.html` dosyasını tarayıcınızda açın.

---

## 🗺️ Yol Haritası #1

- [x] **01. Proje Fikri ve Taslak**
  - Solana Token-2022 mimarisiyle işlem hacmini barınak yardımına dönüştürme.
- [ ] **02. Temel Altyapı Kurulumu**⏳
  - Web uygulaması, Token-2022 transfer ücreti yapılandırması ve Litepaper.
- [ ] **03. Genel Devnet Testi**⏳
  - Devnet dağıtımı, musluk entegrasyonu ([#faucet](https://kibble-sol.github.io/Kibble/#faucet)) ve ücret toplama testi.
- [ ] **04. Mainnet Lansmanı**
  - 10M sabit arz, %100 LP yakımı ve canlı %2 ücret yönlendirmesi.
- [ ] **05. İlk Doğrulanabilir Bağış**
  - Ortak barınağa zincir üzeri SOL transferi ve besleme kanıtı.
- [ ] **06. Tam Topluluk Yönetişimi**
  - Karesel Oylama (Quadratic Voting) DAO portalının dağıtımı.

---

## 🛠 Teknoloji Yığını

- **Blokzincir:** Solana (Transfer Ücreti Eklentili Token-2022)
- **Ön Uç:** Vanilla HTML5 / CSS3 / JavaScript
- **Arka Uç & API:** Node.js / Serverless Faucet Mantığı (`api/`)
- **Veritabanı:** Firebase Realtime Database
- **Bot Motoru:** Python (`bot/`)
- **Dağıtım:** GitHub Pages

---

*Sokak hayvanları için ❤️ ile inşa edilmiştir.*
