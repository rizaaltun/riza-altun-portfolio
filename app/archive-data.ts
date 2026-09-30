export const archiveRows=[
 {key:"print",no:"01",title:"İlan & Reklam Tasarımı",titleEn:"Advertising Design",note:"Basılı reklam çalışmaları",noteEn:"Selected print campaigns",color:"#FAFDD6"},
 {key:"editorial",no:"02",title:"Dergi & Editoryal Tasarım",titleEn:"Magazine & Editorial Design",note:"MYD · 5 sayı",noteEn:"MYD · 5 issues",color:"#91ADC8"},
 {key:"catalog",no:"03",title:"Katalog Tasarımı",titleEn:"Catalogue Design",note:"Board Book · 138 çevrilebilir sayfa",noteEn:"Board Book · 138 page-turning pages",color:"#AED6CF"},
 {key:"exhibition",no:"04",title:"Fuar & Etkinlikler",titleEn:"Fairs & Events",note:"Jeff Kinney · Isadora Moon · Fuarlar",noteEn:"Jeff Kinney · Isadora Moon · Trade fairs",color:"#647FBC"},
 {key:"campaign",no:"05",title:"Sosyal Medya Tasarımı",titleEn:"Social Media Design",note:"Otomotiv · Gayrimenkul",noteEn:"Automotive · Real estate",color:"#91ADC8"},
 {key:"objects",no:"06",title:"Promosyon Ürünler",titleEn:"Promotional Products",note:"Defter · Çanta · Kupa · Kurumsal ürünler",noteEn:"Notebooks · Bags · Mugs · Corporate objects",color:"#AED6CF"},
 {key:"digital",no:"07",title:"Dijital Vitrin",titleEn:"Digital Showcase",note:"Yayıncılık · Banner ve dijital kampanya seçkisi",noteEn:"Publishing · Banner and digital campaign selection",color:"#91ADC8"},
 {key:"books",no:"08",title:"Kitap Kapağı Tasarımı",titleEn:"Book Cover Design",note:"Seçili kapak çalışmaları",noteEn:"Selected cover designs",color:"#FAFDD6"},
] as const;
export type ArchiveKey=(typeof archiveRows)[number]["key"];
