# 🐾 Kibble ($KIBBLE) - Solana'da Etki Odaklı Protokol

[![Solana](https://img.shields.io/badge/Solana-Token--2022-14F195?style=flat-square&logo=solana)](https://solana.com)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20dApp-9945FF?style=flat-square)](https://kibble-sol.github.io/Kibble/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Bu sadece dokunarak besleme yapılan bir oyun değil; Solana tarafından desteklenen, otomatifleştirilmiş, zincir üzerinde çalışan bir hayvan refahı protokolüdür.**

---

## 🌟 Genel Bakış

**Kibble**, Solana üzerine kurulu, etki odaklı bir Web3 protokolüdür. Etkileşimli ön uç deneyiminin ötesinde, Kibble derin bir sistem düzeyinde mimari oluşturur: zincir üzerindeki işlem hacmini ve kullanıcı etkileşimini, sokak hayvanları için fiziksel mama satın almak ve dağıtmak üzere **Token-2022 transfer ücretleri** aracılığıyla protokol odaklı fonlamaya dönüştürür.

- 🌐 **Canlı Web dApp:** [kibble-sol.github.io/Kibble/](https://kibble-sol.github.io/Kibble/)
- 🚰 **Devnet Faucet & Test Kit:** [kibble-sol.github.io/Kibble/#faucet](https://kibble-sol.github.io/Kibble/#faucet)
- 📊 **Canlı Zincir Üzeri Takip Aracı:** [kibble-sol.github.io/Kibble/#tracker](https://kibble-sol.github.io/Kibble/#tracker)
- ✈️ **Telegram Merkezi:** [@kibblesol](https://t.me/kibblesol)
- 🐦 **X (Twitter):** [@kibblesol](https://x.com/kibblesol)

---

## ⚙️ Temel Mimari ve Uçtan Uca Akış Mekaniği

Protokolümüz, kullanıcının sisteme ilk girdiği andan akıllı sözleşmelerin fon yönlendirmesine ve gerçek dünyadaki etkiye kadar mantıksal bir sıra (pipeline) izler:

1. **Adım (Kullanıcı Katılımı ve Etkileşim Arayüzü - `#tracker`):** 
   Sistemin giriş katmanıdır. Kullanıcılar, hafif ve optimize edilmiş Web3 arayüzümüz üzerinden etkileşim kurarak topluluk metriklerini ve günlük besleme hedeflerini besler. Amaç, yüksek kullanıcı edinimi (user acquisition) sağlamaktır. Detaylar için: [kibble-sol.github.io/Kibble/#tracker](https://kibble-sol.github.io/Kibble/#tracker).

2. **Adım (Zincir İçi Değer Motoru ve Transfer Ücreti - Token-2022):**
   Ön yüzde başlayan etkileşim, arka planda Solana'nın **Token-2022 Transfer Fee** eklentisiyle ekonomik bir değere dönüşür. Her token transferinde akıllı sözleşme seviyesinde otomatik olarak %2'lik kesinti yapılarak aracı kurum olmaksızın doğrudan protokolün hayvan besleme hazinesine aktarılması sağlanır.

3. **Adım (Simülasyon, Musluk ve Test Altyapısı - `#faucet`):**
   Geliştiricilerin, kullanıcıların ve jürinin sistemin arkasındaki mekanizmayı test edebilmesi için kurulan robust altyapıdır. Kullanıcılar buradan test SOL'ü ve $KIBBLE talep ederek transfer ücretlerinin zincir üzerinde nasıl otomatik kesildiğini canlı olarak simüle eder ve doğrular. Canlı test paneli: [kibble-sol.github.io/Kibble/#faucet](https://kibble-sol.github.io/Kibble/#faucet).

4. **Adım (Gerçek Dünya Etkisi ve Dağıtım - Proof of Feed):**
   Akıllı sözleşmelerde ve hazinede biriken fonlar periyodik olarak fiziksel mama torbalarına dönüştürülür. Sokak hayvanlarına yapılan bu gerçek dünya dağıtımları, hem on-chain işlem kanıtlarıyla hem de video dokümantasyonlarıyla şeffaf bir şekilde doğrulanarak topluluğa sunulur.

---

## 🎮 Bölüm 1: Dokunarak Besleme dApp'i ve Gerçek Dünya Etkisi

Bu bölüm, protokolümüzün kullanıcı odaklı etkileşim katmanını ve somut, gerçek dünya sonuçlarını vurgulamaktadır. Kullanıcılar, topluluk metriklerini yönlendirmek için hafif arayüzle etkileşim kurarken, hazine fonları sokaklarda dağıtılan fiziksel gıdalara dönüştürülmektedir.

| 🎮 Tap-to-Feed dApp (`#tracker`) | 🐾 Gerçek Dünyadan Örnekler (Etkinin Kanıtı) |
| :---: | :---: |
| <img src="assets/dapp-preview.jpg" width="340" alt="dApp Interface" /> | <img src="assets/proof-feed-1.jpg" width="340" alt="Proof of Feed #1" /> |
| *Kullanıcılar etkileşimli ön uç izleyici aracılığıyla etkileşim kurar.* | *Besleme Kanıtı: Gerçek dünya dağıtımı* |

🔗 **Etkileşimli takip aracını canlı olarak keşfedin:** [kibble-sol.github.io/Kibble/#tracker](https://kibble-sol.github.io/Kibble/#tracker)

---

## 🧪 Bölüm 2: Devnet Entegrasyonu ve Zincir Üzeri Sistemler

Bu bölüm, sağlam arka uç mimariğimizi ve geliştirici altyapımızı sergiliyor. Solana Devnet üzerine kurulu olan bu yapı, musluk entegrasyonu yoluyla otomatik token taleplerini ve güvenilir protokol yürütmesini sağlamak için %2'lik kesin transfer ücreti yönlendirmesini içerir.

| 🧪 Devnet Entegrasyonu ve Musluğu (`#faucet`) #1 | 🧪 Devnet Entegrasyonu ve Musluğu (`#faucet`) #2 |
| :---: | :---: |
| <img src="assets/Devnet1.jpg" width="340" alt="Devnet Testing #1" /> | <img src="assets/Devnet2.jpg" width="340" alt="Devnet Testing #2" /> |
| *Canlı Devnet musluk testi ve talep iş akışı* | *Protokol yürütme ve işlem izleme* |

🔗 **Devnet musluğunu ve sistemi canlı test edin:** [kibble-sol.github.io/Kibble/#faucet](https://kibble-sol.github.io/Kibble/#faucet)

---

## 📂 Depo Yapısı

- `api/` - Musluk, arka uç yönlendirme komut dosyaları ve sunucusuz API uç noktaları
- `assets/` - Marka kimliği, simgeler, Devnet ekran görüntüleri ve içerik kanıtı niteliğindeki medya dosyaları
- `bot/` - Telegram otomasyon motoru, komut dosyaları ve gereksinimleri
- `CONTRIBUTING.md` - Açık kaynak kodlu katkı yönergeleri
- `Kibble-Litepaper.pdf` - Resmi proje tanıtım belgesi ve mimari dokümanı
- `LICENSE` - MIT Lisansı
- `README.md` - Proje dokümantasyonu
- `SECURITY.md` - Sorumlu açıklama politikası
- `index.html` - Web dApp arayüzü ve Web3 istemci mantığı (Musluk, Takip Aracı ve Oyun)
- `package.json` - Proje meta verileri ve bağımlılık konfigürasyonları

---

## 🚀 Hızlı Başlangıç ve Yerel Kurulum

dApp'i karmaşık araç zincirlerine gerek kalmadan saniyeler içinde yerel olarak çalıştırın:

1. Depoyu klonlayın: `git clone https://github.com/kibble-sol/Kibble.git`
2. Klasöre gidin: `cd Kibble`
3. `index.html` dosyasını doğrudan tarayıcınızda açın.

---

## 🗺️ Yol Haritası #1

- [x] **01. Proje Fikri ve Taslak**
  - Solana Token-2022 mimarisi aracılığıyla işlem hacmini doğrudan hayvan barınağı yardımına dönüştürme.

- [x] **02. Temel Altyapı Kurulumu**
  - Web uygulaması oluşturma, Token-2022 transfer ücreti yapılandırması, resmi Litepaper ve otonom toplama mantığı.

- [x] **03. Genel Devnet Testi**
  - Genel Devnet dağıtımı, musluk entegrasyonu (`#faucet`) ve otonom ücret toplama stres testi.

- [ ] **04. Mainnet Lansmanı**⏳
  - 10M sabit arz dağıtımı, %100 LP yakımı, iptal edilmiş mint/freeze yetkileri ve canlı %2 ücret yönlendirmesi.

- [ ] **05. İlk Doğrulanabilir Bağış**
  - İlk otonom Pazar döngüsü yürütülmesi: Tam besleme kanıtı dokümantasyonuyla ortak barınağa zincir üzeri SOL transferi.

- [ ] **06. Tam Topluluk Yönetişimi**
  - Protokol kararlarını ve ekosistem rezerv onaylarını doğrudan token sahiplerine aktaran Karesel Oylama (Quadratic Voting) DAO portalının dağıtımı.

---

## 🛠 Teknoloji Yığını

- **Blokzincir:** Solana (Transfer Ücreti Eklentili Token-2022 Programı)
- **Ön Uç (Frontend):** Vanilla HTML5 / CSS3 / JavaScript (Sıfır bağımlılık, hızlı yükleme)
- **Arka Uç & API:** Node.js / Serverless Musluk Mantığı (`api/`)
- **Veritabanı & Durum:** Firebase Realtime Database
- **Bot Motoru:** Python (`bot/` içinde python-telegram-bot)
- **Dağıtım:** GitHub Pages

---

*Sokak hayvanları için ❤️ ile inşa edilmiştir.*
