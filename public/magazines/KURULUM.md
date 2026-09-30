# MYD portföy paketi

Başlamak için index.html dosyasını tarayıcıda açın. Beş dergi buradan seçilebilir.

## Siteye ekleme

Klasörün tamamını sitenizde `dergiler` klasörüne kopyalayın. React/Vite/Next.js projesinde `public/dergiler` içine koyabilirsiniz. Harici kütüphane veya internet bağlantısı gerekmez.

Örnek HTML (site kökünden yayınlanıyorsa):

```html
<iframe src="/dergiler/myd-51-tr/index.html"
  title="Madeni Yağ Dünyası 51 — seçili sayfalar"
  style="width:100%;height:760px;border:0;border-radius:14px"
  loading="lazy"></iframe>
```

GitHub Pages alt klasöründen yayınlanıyorsa `/dergiler/` yerine kendi projenizin taban yolunu kullanın. Örneğin `/riza-altun-portfolio/dergiler/`.

React örneği:

```jsx
<iframe
  src="/dergiler/myd-51-tr/index.html"
  title="MYD 51 dergi ön izlemesi"
  loading="lazy"
  style={{ width: "100%", height: 760, border: 0, borderRadius: 14 }}
/>
```

Diğer okuyucular: myd-49-tr, myd-50-eng, myd-52-tr, myd-53-eng.
Galeri için iframe adresini `/dergiler/index.html` yapabilirsiniz.

## İçerik

- index.html: beş derginin kapaklı galerisi
- viewer.js / viewer.css: ortak okuyucu ve tasarımı
- Her dergide index.html, pages.js ve pages/*.webp
- manifest.json: sayfa sayıları ve giriş dosyaları

Herhangi bir yerden sola sürükleme ileri, sağa sürükleme geri çevirir. Önceki/İleri düğmeleri ve klavye okları da kullanılabilir. Büyüt düğmesi sayfaları daha büyük açar.

Bu paket yalnızca seçilmiş sayfaları içerir. Tam PDF'ler ve gösterilmeyen sayfalar pakette yoktur. Görseller 1400 piksel genişlikte WebP biçimindedir. 51. sayı önceki seçkiyi korur; diğerleri kapaktan başlayarak yaklaşık ilk yarıyı gösterir.
