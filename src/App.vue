<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 25 ? 'warm' : ''
    "
    v-bind:style="{ 'background-image': 'url(' + groundPhoto + ')' }"
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Enter city name..."
          v-model="query"
          v-on:keyup.enter="
            fetchWeather();
            setGroundPhoto();
          "
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }} &#176;C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      api_key: "286ffa706125a2024a8f265d1747310f",
      unsplashId: "X--qz7h6H6I8iON27rFSFCk_uTx-EcBfwpJr07-YU6o",

      url_base: "https://api.openweathermap.org/data/2.5/",
      urlUnsplash: "https://api.unsplash.com/search/photos/?client_id=",
      query: "",
      weather: {},
      groundPhoto:
        "https://images.unsplash.com/photo-1566996694954-90b052c413c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    };
  },
  methods: {
    fetchWeather() {
      fetch(
        `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
      )
        .then((res) => {
          return res.json();
        })
        .then(this.setResults);
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let today = new Date();

      let date =
        today.getFullYear() +
        " - " +
        (today.getMonth() + 1) +
        " - " +
        today.getDate();

      return date;
    },
    setGroundPhoto() {
      fetch(`${this.urlUnsplash}${this.unsplashId}&query=${this.query}`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          this.groundPhoto = data.results[0].urls.regular;
          console.log(this.groundPhoto);
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Rubik", sans-serif;
}

#app {
  /* background-image: url("./assets/cold-bg.jpg"); */
  background-image: url("https://images.unsplash.com/photo-1566996694954-90b052c413c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");

  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  /* background-image: url("./assets/warm-bg.jpg"); */
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 60%;
  margin: 40px auto;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 20px;
  color: #313131;
  font-size: 32px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: white;
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: rgba(255, 255, 255, 0.75);
  font-size: 30px;
  font-weight: 400;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
  text-shadow: 0px 3px rgba(0, 0, 0, 0.25);
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 100px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
