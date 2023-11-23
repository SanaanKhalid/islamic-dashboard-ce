fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=islam")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `${data.user.location}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `Sanaan Khalid`
    })

// fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Something went wrong")
//         }
//         return res.json()
//     })
//     .then(data => {
//         document.getElementById("crypto-top").innerHTML = `
//             <img src=${data.image.small} />
//             <span>${data.name}</span>
//         `
//         document.getElementById("crypto").innerHTML += `
//             <p>🎯: $${data.market_data.current_price.usd}</p>
//             <p>👆: $${data.market_data.high_24h.usd}</p>
//             <p>👇: $${data.market_data.low_24h.usd}</p>
//         `
//     })
//     .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)



navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

function getCurrentDate() {
  const currentDate = new Date();

  // Get day, month, and year
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = currentDate.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

const formattedDate = getCurrentDate();


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&method=2&school=1`)
    .then(res => res.json())
    .then(data => {
        
        console.log(data.data.timings)
        
        const keyValueArray = Object.entries(data.data.timings);
        
        const filteredPrayerTimes = keyValueArray.slice(0, -4);
        
        console.log(filteredPrayerTimes)
        
        const adjustedPrayerTimes = filteredPrayerTimes.map(([prayerName, time]) => {
  const [hours, minutes] = time.split(':').map(Number);
  let period = hours >= 12 ? 'PM' : 'AM';

  let adjustedHours = hours;
  if (hours > 12) {
    adjustedHours -= 12;
  } else if (hours === 0) {
    adjustedHours = 12;
  }

  const adjustedTime = `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  return [prayerName, adjustedTime];
});

console.log(adjustedPrayerTimes);

for(let i = 0; i < adjustedPrayerTimes.length; i++) {
        const [prayerName, time] = adjustedPrayerTimes[i];
            document.getElementById("crypto").innerHTML += `
            <p>${prayerName}: ${time}</p>
        `
}

        
    })
})
