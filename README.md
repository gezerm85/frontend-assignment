
Modern bir kullanıcı ve post yönetim uygulaması. Bu proje React ve TypeScript kullanarak geliştirilmiş, Material UI ile tasarlanmış ve Redux Toolkit ile state yönetimi yapılmıştır.

## Özellikler

- Kullanıcı listesi görüntüleme ve yönetimi
- Kullanıcı ekleme, düzenleme ve silme işlemleri
- Post listesi görüntüleme
- Kullanıcı detayları ve postları modal ile görüntüleme
- Responsive tasarım
- Modern Material UI arayüzü

## Teknolojiler

### Frontend Framework
- **React 19**: Kullanıcı arayüzü oluşturmak için seçildi. Component tabanlı yapısı ve güçlü ekosistemi sayesinde hızlı geliştirme imkanı sağlıyor.

### Type Safety
- **TypeScript**: JavaScript'in üzerine tip güvenliği ekleyerek geliştirme sürecinde hataları önlemek ve kod kalitesini artırmak için kullandım.

### State Management
- **Redux Toolkit**: Uygulama state'ini merkezi olarak yönetmek için tercih edildi. Async işlemler için createAsyncThunk kullanılarak API çağrıları kolaylaştırıldı.

### UI Framework
- **Material UI**: Google'ın Material Design prensiplerine dayalı component kütüphanesi. Tutarlı ve profesyonel görünüm sağlamak için seçtim.

### Styling
- **Tailwind CSS**: Utility-first CSS framework. Hızlı ve tutarlı styling için kullandım.
- **Emotion**: CSS-in-JS çözümü olarak Material UI ile uyumlu çalışması için kullandım.

### Routing
- **React Router DOM**: Sayfa geçişleri ve URL yönetimi için standart çözüm.

### HTTP Client
- **Axios**: API istekleri için tercih ettiğim, güvenilir ve konfigürasyonu oldukça kolay bir HTTP client.

### Build Tool
- **Vite**: Hızlı geliştirme ortamı ve build süreci için modern bir araç. Webpack'e alternatif olarak daha hızlı hot reload sağlıyor.

### Code Quality
- **ESLint**: Kod kalitesini korumak ve standartları uygulamak için kullandım.

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları takip edin:

1. Projeyi klonlayın:
```bash
git clone https://github.com/gezerm85/frontend-assignment.git
cd frontend-assignment

```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:5173` adresini açın.

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşturulacaktır.

## Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir componentler
│   ├── Header.tsx      # Ana navigasyon
│   ├── UserCard.tsx    # Kullanıcı kartı
│   ├── PostCard.tsx    # Post kartı
│   └── UserModal.tsx   # Kullanıcı detay modalı
├── pages/              # Sayfa componentleri
│   ├── Home.tsx        # Ana sayfa
│   ├── Users.tsx       # Kullanıcılar sayfası
│   └── Posts.tsx       # Postlar sayfası
├── store/              # Redux store yapısı
│   ├── store.ts        # Store konfigürasyonu
│   ├── hooks.ts        # Typed Redux hooks
│   ├── userSlice.ts    # Kullanıcı state yönetimi
│   └── postSlice.ts    # Post state yönetimi
├── type/               # TypeScript tip tanımları
│   ├── User.ts         # Kullanıcı tipleri
│   └── Posts.ts        # Post tipleri
└── App.tsx             # Ana uygulama componenti
```

## API Entegrasyonu

Uygulama JSONPlaceholder API'sini kullanarak test verilerini çekmektedir:
- Kullanıcılar: `https://jsonplaceholder.typicode.com/users`
- Postlar: `https://jsonplaceholder.typicode.com/posts`

## Geliştirme Notları

- Tüm state yönetimi Redux Toolkit ile yapılmaktadır
- Componentler Material UI prensiplerine uygun olarak tasarlanmıştır
- TypeScript strict mode aktif durumda
- Responsive tasarım mobile-first yaklaşımı ile geliştirilmiştir

