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
   PASTE LINK:'https://github.com/likar3400/weather_api_/blob/c417e81e44e00b10bc58713640e125bf8d094701/weather.html#L19-L31'
- CSS: стилізація card/layout/forecast/modal:  
  PASTE LINK: `https://github.com/likar3400/weather_api_/blob/main/weather.css#L1-L272`
- JS: DOM references + event handlers:  


---

## 2) KISS (Keep It Simple)

**Суть:** використано JS без зайвих бібліотек; сценарій “ввів місто → отримав дані → показав” реалізовано прямолінійно.

**Доказ у коді:**
- submit handler + load flow:  
  PASTE LINK: `index.js#L..-L..`

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

## Як зробити permalink на рядки GitHub (щоб вставити у PASTE LINK)

1. Відкрий файл у GitHub (наприклад `index.js`)
2. Натисни на номер рядка зліва (наприклад `20`)
3. Щоб взяти діапазон: клік по першому рядку → **Shift + клік** по останньому
4. У адресному рядку з’явиться `#L20-L60` — скопіюй URL
5. Встав URL у цей документ у місце `PASTE LINK:`

