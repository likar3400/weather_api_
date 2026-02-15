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
   [index.js (fetchJson)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L60-L69)

- `formatDateUA()` + `round1()`  
[index.js (formatDateUA + round1)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L49-L58C2)


## 4) Defensive Programming (захист від помилок)

**Суть:** застосунок:
- перевіряє ввід (`trim`, empty)
- показує повідомлення користувачу через модальне вікно
- обробляє помилки HTTP через централізовану функцію

**Доказ у коді:**

- перевірка вводу (submit handler):  
  [index.js (input validation)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L227-L239C4)

- обробка HTTP помилок у fetchJson():  
[index.js (fetchJson error handling)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L60-L69)

- модальне повідомлення openModal():  
  [index.js (openModal)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L24-L30)

---

## 5) Readability / Clean Code (читабельність)

**Суть:** код структурований та поділений на логічні блоки, що полегшує його розуміння та підтримку.  
Функції мають зрозумілі назви, які прямо описують їхню відповідальність.  
Кожна функція виконує одну конкретну задачу (Single Responsibility).

Логічна структура файлу:
- DOM references — отримання елементів сторінки
- UI helpers — допоміжні функції (`formatDateUA`, `round1`)
- API — функції отримання даних (`fetchJson`, `fetchWeather...`)
- Data processing — обробка прогнозу (`aggregateForecast`)
- Render — відображення даних (`renderWeather`, `renderForecast`)
- Events — обробники подій користувача

Це забезпечує:
- легкість читання
- простоту підтримки
- зрозумілу архітектуру файлу

**Доказ у коді:**

- обробка та агрегація даних:  
  [index.js (aggregateForecast)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L107-L133C2)

- рендер прогнозу:  
  [index.js (renderForecast)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L136-L167C2)

- рендер поточної погоди:  
  [index.js (renderWeather)](https://github.com/likar3400/weather_api_/blob/5bfe2d3be17aa29c8e3d133fcd4e351044ab73f1/index.js#L170-L194C2)



