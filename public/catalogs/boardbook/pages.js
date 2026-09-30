(()=>{
 const en=new URLSearchParams(location.search).get('lang')!=='tr';
 document.documentElement.lang=en?'en':'tr';
 const labels=en?{note:'Complete catalogue',zoom:'Enlarge',prev:'← Previous'}:{note:'Kataloğun tamamı',zoom:'Büyüt',prev:'← Önceki'};
 document.querySelector('.reader-note').textContent=labels.note;
 document.querySelector('.zoom-button').textContent=labels.zoom;
 document.querySelector('.prev').textContent=labels.prev;
 window.MYD_COPY=en
  ?{endTitle:'End of catalogue',endInfo:'You have viewed every page of the Board Book catalogue.',open:'Open →',forward:'Next →',cover:'Cover',done:'Catalogue complete',spread:n=>`${n} / 68 spreads`}
  :{endTitle:'Kataloğun sonu',endInfo:'Board Book kataloğunun tüm sayfalarını inceledin.',open:'Aç →',forward:'İleri →',cover:'Kapak',done:'Katalog tamamlandı',spread:n=>`${n} / 68 açılım`};
 window.MYD_PAGES=Array.from({length:138},(_,i)=>({src:`pages/${String(i).padStart(3,'0')}.webp`,label:`${en?'Page':'Sayfa'} ${i+1}`}));
 window.MYD_START=2;
})();
