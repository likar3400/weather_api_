const CONFIG = {
    API_BASE: "...",
    ICON_BASE: "...",
    UNITS: "metric",
    LANG: "uk",
    KEY_STORAGE: "owm_api_key"
};

function getApiKey() {
    let key = localStorage.getItem(CONFIG.KEY_STORAGE) || "";
    if (!key) {
        key = prompt("Введіть API ключ OpenWeatherMap:")?.trim() || "";
        if (key) localStorage.setItem(CONFIG.KEY_STORAGE, key);
    }
    return key;
}
const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const geoBtn = document.getElementById("geoBtn");
const msg = document.getElementById("msg");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const dateText = document.getElementById("dateText");
const weatherDesc = document.getElementById("weatherDesc");
const tempNow = document.getElementById("tempNow");
const tempMin = document.getElementById("tempMin");
const tempMax = document.getElementById("tempMax");
const windSpeed = document.getElementById("windSpeed");
const forecast = document.getElementById("forecast");
const forecastGrid = document.getElementById("forecastGrid");
const forecastHint = document.getElementById("forecastHint");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalBody = document.getElementById("modalBody");
const modalOk = document.getElementById("modalOk");
const weatherIcon = document.getElementById("weatherIcon");

function openModal(title, subtitle, body) {
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle || "";
    modalBody.textContent = body || "";
    modal.classList.remove("hidden");
    setTimeout(() => modalOk.focus(), 0);
}

function closeModal() {
    modal.classList.add("hidden");
}

modalOk.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
    if (e.target?.dataset?.close === "1") closeModal();
});
window.addEventListener("keydown", e => {
    if (!modal.classList.contains("hidden") && e.key === "Escape") closeModal();
});

function setMessage(text, type = "") {
    msg.className = "msg" + (type ? " " + type : "");
    msg.textContent = text;
}

function formatDateUA(date = new Date()) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

function round1(n) {
    return Math.round(n * 10) / 10;
}

function buildUrl(endpoint, params) {
    const apiKey = getApiKey();
    if (!apiKey) {
        const err = new Error("API key missing");
        err.status = 401;
        throw err;
    }

    const url = new URL(CONFIG.API_BASE + endpoint);
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", CONFIG.UNITS);
    url.searchParams.set("lang", CONFIG.LANG);

    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
    );

    return url.toString();
}
async function fetchJson(url) {
    let res;

    try {
        res = await fetch(url);
    } catch {
        const err = new Error("Network error");
        err.status = 0;
        throw err;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const err = new Error(data.message || "Error");
        err.status = res.status;
        throw err;
    }

    return data;
}

function fetchWeatherByCity(city) {
    return fetchJson(buildUrl("/weather", { q: city }));
}

function fetchWeatherByCoords(lat, lon) {
    return fetchJson(buildUrl("/weather", { lat, lon }));
}

function fetchForecastByCity(city) {
    return fetchJson(buildUrl("/forecast", { q: city }));
}

function fetchForecastByCoords(lat, lon) {
    return fetchJson(buildUrl("/forecast", { lat, lon }));
}


function dayNameUA(date) {
    return ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"][date.getDay()];
}

function aggregateForecast(data) {
    const map = {};
    for (const item of data.list) {
        const day = item.dt_txt.split(" ")[0];
        (map[day] ??= []).push(item);
    }
    const days = Object.keys(map).slice(0, 7);

    return days.map(d => {
        const items = map[d];
        const temps = items.map(i => i.main.temp);
        let best = items[0];
        let bestDiff = Infinity;
        for (const it of items) {
            const hour = new Date(it.dt * 1000).getHours();
            const diff = Math.abs(hour - 12);
            if (diff < bestDiff) { best = it; bestDiff = diff; }
        }
        return {
            date: new Date(d),
            min: Math.min(...temps),
            max: Math.max(...temps),
            desc: best.weather[0].description,
            icon: best.weather[0].icon
        };
    });
}


function renderForecast(days, label) {
    forecastGrid.innerHTML = "";
    forecastHint.textContent = label;
    forecast.classList.remove("hidden");

    days.forEach(d => {
        const el = document.createElement("div");
        el.className = "fcard";

        const iconUrl = d.icon
            ? `https://openweathermap.org/img/wn/${d.icon}@2x.png`
            : "";

        el.innerHTML = `
      <div class="fcard_day">${dayNameUA(d.date)}</div>
      <div class="fcard_date">${formatDateUA(d.date)}</div>
      <img class="fcard_icon"
     src="${iconUrl}"
     alt="Іконка прогнозу"
     loading="lazy"
     referrerpolicy="no-referrer">

      <div class="fcard_desc">${d.desc}</div>
      <div class="fcard_temps">
        <span>Min: ${round1(d.min)}°C</span>
        <span>Max: ${round1(d.max)}°C</span>
      </div>
    `;

        forecastGrid.appendChild(el);
    });
}


function renderWeather(data) {
    cityName.textContent = data.name;
    dateText.textContent = formatDateUA();
    weatherDesc.textContent = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherIcon.onload = () => { weatherIcon.style.display = "block"; };
    weatherIcon.onerror = () => { weatherIcon.style.display = "none"; };

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.style.display = "block";

    tempNow.textContent = `${round1(data.main.temp)}°C`;
    const minV = round1(data.main.temp_min);
    const maxV = round1(data.main.temp_max);
    if (minV === maxV) {
        tempMin.textContent = "—";
        tempMax.textContent = "—";
    } else {
        tempMin.textContent = `${minV}°C`;
        tempMax.textContent = `${maxV}°C`;
    }
    windSpeed.textContent = round1(data.wind.speed);
    result.classList.remove("hidden");
}


async function loadByCity(city) {
    setMessage("Завантаження...");
    result.classList.add("hidden");
    forecast.classList.add("hidden");

    const [w, f] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city)
    ]);

    renderWeather(w);
    renderForecast(aggregateForecast(f), w.name);
    setMessage("Готово", "success");
}

async function loadByCoords(lat, lon) {
    setMessage("Завантаження...");
    result.classList.add("hidden");
    forecast.classList.add("hidden");

    const [w, f] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon)
    ]);

    renderWeather(w);
    renderForecast(aggregateForecast(f), w.name);
    setMessage("Готово", "success");
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        openModal("Помилка", "Місто", "Введи назву міста");
        return;
    }
    try {
        await loadByCity(city);
    } catch {
        openModal("Помилка", "Пошук", "Місто не знайдено");
    }
});

geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        openModal("Помилка", "Геолокація", "Не підтримується браузером");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => loadByCoords(pos.coords.latitude, pos.coords.longitude),
        () => openModal("Помилка", "Геолокація", "Доступ заборонено")
    );
});



