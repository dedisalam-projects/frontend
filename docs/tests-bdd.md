# BDD Scenarios untuk Unit Test Frontend (UU-48)

Berkas ini memuat skenario pengujian unit (Unit Tests) berbasis perilaku (BDD - Given/When/Then) untuk aplikasi Frontend (Web, Desktop, Shared UI) dengan penekanan pada skenario kegagalan (Negative Tests) dan isolasi murni menggunakan `provideHttpClientTesting`.

## 1. Web Application (`app.component.spec.ts` & `hello-world.component.spec.ts`)
Komponen ini bertanggung jawab me-render layout utama dan antarmuka komponen `hello-world`.

### Skenario 1.1: Memuat Komponen dengan Data Sukses (Happy Path)
**Given** komponen `HelloWorldComponent` diinisialisasi dan di-render.
**When** layanan API `APIGatewayService` dipanggil untuk `getHello()`.
**Then** HTTP Mock mengembalikan respons `{ message: 'Hello World', services: { user: 'ok' } }`, komponen menampilkan pesan tersebut, dan indikator *loading* mati.

### Skenario 1.2: Kegagalan Jaringan API (Negative Test)
**Given** komponen `HelloWorldComponent` memanggil `getHello()` ke Gateway.
**When** permintaan HTTP gagal (misal 500 Internal Server Error atau Network Error).
**Then** komponen menangkap error, indikator *loading* mati, dan variabel `apiError` berisi pesan error yang sesuai untuk ditampilkan di UI.

## 2. Pustaka Shared UI (`hello-world.component.spec.ts` di library)
Serupa dengan skenario di Web Application namun memastikan komponen pustaka terisolasi secara murni (menggunakan `shallow rendering` dan *mock* penuh untuk `Socket.IO` serta HttpClient).

### Skenario 2.1: WebSocket Gagal Terhubung (Negative Test)
**Given** komponen mencoba melakukan inisiasi koneksi WebSocket (`initWebSocket`).
**When** server WebSocket tidak dapat dijangkau (error `connect_error`).
**Then** status socket (signal `socketStatus()`) diperbarui dengan pesan error koneksi, dan komponen tidak crash.

### Persyaratan Isolasi
- **Tidak ada dependensi sungguhan**: Semua dependensi terhadap `Router`, `MenuService`, dan layanan NG-ALAIN lainnya wajib dipalsukan (*mocked*).
- **HttpClientTesting**: Pengujian HTTP wajib menggunakan `provideHttpClientTesting()` dari Angular, bukan membuat panggilan sungguhan ke backend lokal.
