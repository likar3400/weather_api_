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
 [weather.html (search form) ](https://github.com/likar3400/weather_api_/blob/main/weather.html#L19-L31)
- CSS: стилізація card/layout/forecast/modal:  
[weather.css (stylization layouts,cards,forecast,modal_window)](https://github.com/likar3400/weather_api_/blob/main/weather.css#L1-L272)
- JS: DOM references:  
  [index.js (DOM references)](https://github.com/likar3400/weather_api_/blob/dae19e15c4da7c265eff07c3947e7d60a77cf089/index.js#L1-L22C60)
---

## 2) KISS (Keep It Simple)

**Суть:** використано чистий JavaScript без додаткових бібліотек; логіка проста:  
користувач вводить місто → submit → виклик loadByCity → отримання даних → рендер на сторінці.

**Доказ у коді:**
- submit handler:  
[index.js (submit handler)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L227-L239C4)

- loadByCity flow:  
   [index.js (loadByCity)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L197-L210C2)

## 3) DRY (Don’t Repeat Yourself)

**Суть:** частина повторюваної логіки винесена в окремі універсальні функції:

- `fetchJson()` — одна функція для виконання HTTP-запитів та обробки помилок
- `formatDateUA()` — централізоване форматування дати
- `round1()` — універсальне округлення чисел

Це дозволяє уникнути дублювання коду в різних частинах застосунку.

**Доказ у коді:**

- `fetchJson()`  
  https://github.com/likar3400/weather_api_/blob/main/index.js#LXX-LYY

- `formatDateUA()` + `round1()`  
  https://github.com/likar3400/weather_api_/blob/main/index.js#LAA-LBB


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


