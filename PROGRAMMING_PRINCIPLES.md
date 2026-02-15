# PROGRAMMING PRINCIPLES — weather_api_

Проєкт: веб-додаток погоди на **HTML + CSS + JavaScript**, який отримує дані з **OpenWeatherMap API**.

## Структура проєкту
- UI: `weather.html`
- Styles: `weather.css`
- Logic + API: `index.js`

---

## 1) Separation of Concerns (розділення відповідальностей)

**Суть:** кожен файл відповідає за свою частину:
- `weather.html` — структура сторінки + елементи для вводу/виводу
- `weather.css` — стилі, layout, адаптивність
- `index.js` — логіка, запити до API, обробка помилок, оновлення DOM

**Доказ у коді:**
- HTML: форма пошуку та блоки результату:  
 [weather.html search form ](https://github.com/likar3400/weather_api_/blob/main/weather.html#L19-L31)
- CSS: стилізація card/layout/forecast/modal:  
[weather.css ( card/layout/forecast/modal](https://github.com/likar3400/weather_api_/blob/main/weather.css#L1-L272)
- JS: DOM references:  
  [index.js (DOM references)](https://github.com/likar3400/weather_api_/blob/dae19e15c4da7c265eff07c3947e7d60a77cf089/index.js#L1-L22C60)
---

## 2) KISS (Keep It Simple)

**Суть:** використано JS без зайвих бібліотек; сценарій “ввів місто → отримав дані → показав” реалізовано прямолінійно.

**Доказ у коді:**
- submit handler + load flow:  
  PASTE LINK: ``

---

## 3) DRY (Don’t Repeat Yourself)

**Суть:** повторювану логіку винесено в окремі функції:
- `buildUrl()` — збір URL для API (параметри в одному місці)
- `fetchJson()` — універсальний fetch з обробкою помилок
- `loadWeather()` — один сценарій завантаження замість дублювання

**Доказ у коді:**
- `buildUrl()` + `fetchJson()`  
  PASTE LINK: `index.js#L..-L..`
- `loadWeather()`  
  PASTE LINK: `index.js#L..-L..`

---

## 4) Defensive Programming (захист від помилок)

**Суть:** застосунок:
- перевіряє ввід (`trim`, empty)
- показує повідомлення користувачу через модальне вікно
- обробляє різні типи помилок (404/401/429/мережа)

**Доказ у коді:**
- перевірка вводу:  
  PASTE LINK: `index.js#L..-L..`
- status-based error messages:  
  PASTE LINK: `index.js#L..-L..`

---

## 5) Readability / Clean Code (читабельність)

**Суть:** логіка поділена на блоки (DOM / UI helpers / API / render / events), назви функцій зрозумілі (`renderWeather`, `renderForecast`, `aggregateForecast`).

**Доказ у коді:**
- блок render + aggregate:  
  PASTE LINK: `index.js#L..-L..`

---


