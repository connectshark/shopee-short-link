# <img style="width: 28px; vertical-align: middle;" src="public/hero.png">蝦英雄(Shopee Short Link)
[![GitHub last commit](https://img.shields.io/github/last-commit/connectshark/shopee-short-link.svg?style=flat)](https://github.com/connectshark/shopee-short-link)
![GitHub stars](https://img.shields.io/github/stars/connectshark/shopee-short-link.svg?style=social&label=Stars&style=plastic)

![畫面截圖](https://i.imgur.com/UjprgXc.png)

> 網站串接蝦皮提供的api,將蝦皮網址貼入後送出,即可取得蝦皮短連結

## 馬上試試
```
https://shopee.tw/
```
複製後前往網站連結 > https://shopee.nosegates.com/

---
## 專案活動紀錄
![Alt](https://repobeats.axiom.co/api/embed/211955b4bb0f54c6a00787372130a2fe7f7409c4.svg "Repobeats analytics image")
## 目錄
- [專案使用技術](#專案使用技術)
- [各頁面介紹](#各頁面介紹)
---
## 專案使用技術
### 網頁框架
- vue
- vue Router
- pinia
- vite
- tailwindcss

### CI & CD 工具
- [render](https://render.com/)
---
## 各頁面介紹

### 首頁

![首頁](https://i.imgur.com/UjprgXc.png)

首頁提供主要縮短網址功能

下方欄位可為本次網址加上註記文字

縮短網址**成功**以後即會將網址紀錄下來

未來可以在[轉換紀錄](#轉換紀錄)頁面查看過往紀錄

### 轉換紀錄

查詢過往縮短過的網址

可以再次複製網址&刪除紀錄

