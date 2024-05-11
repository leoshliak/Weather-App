import _, { values } from 'lodash';

const cytyTitle = document.querySelector('.city');
const currentTemp = document.querySelector('.temperature-text');
const conditionTeext = document.querySelector('.condition-text');
const conditionImg = document.querySelector('.condition-icon');
const pDate = document.querySelector('.date');
const pTime = document.querySelector('.time');
const inputSearch = document.querySelector('input');
const searchIcon = document.querySelector('.fa-magnifying-glass');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.current-humidity');
const rainChance = document.querySelector('.chance');
const windSpeed = document.querySelector('.wind-speed');
const tomorrowDate = document.querySelector('#tomorrow-date');
const tomorrowMinTemp = document.querySelector('#tmin-temp');
const tomorrowMaxTemp = document.querySelector('#tmax-temp');
const tomorrowIcon = document.querySelector('#tomorrow-icon');
const afterTomorrowDate = document.querySelector('#atomorrow-date');
const afterTomorrowMinTemp = document.querySelector('#atmin-temp');
const afterTomorrowMaxTemp = document.querySelector('#atmax-temp');
const afterTomorrowIcon = document.querySelector('#atomorrow-icon');
const todayMinTemp = document.querySelector('#today-min-temp');
const todayMaxTemp = document.querySelector('#today-max-temp');
const todayIcon = document.querySelector('#today-icon');
const switchD = document.querySelector('.switch-d');
const switchH = document.querySelector('.switch-h');
const daily = document.querySelector('.daily');
const hourly = document.querySelector('.hourly');
const Hnav = document.querySelector('.h-nav');
const hourlyTimes = document.querySelectorAll('.h-time');
const hLinks = document.querySelectorAll('.h-link');
const hourlyTemps = document.querySelectorAll('.h-temp');
const hourlyIcon = document.querySelectorAll('.h-icon');
const cfBtn = document.querySelector('.cf-btn');

let finalReq = 'kyiv';

async function getCurrentData(){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=${finalReq}`, {mode: 'cors'});
    if(finalReq == 'dnepr' || finalReq == 'dnipro'){
        response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
   }else if(finalReq == 'днепр' || finalReq == 'дніпро'){
       response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
   }
    
    const currentData = await response.json();
    console.log(currentData);
    let currentDate = currentData.location.localtime.substring(0 , 10);
    let currentTime = currentData.location.localtime.substring(11 , 16);
    const formattedDate = formatDate(currentDate);
    //changeBackground(currentData.current.condition.text);
    if( currentData.location.name == 'Dnepropetrovsk'){
        cytyTitle.textContent = 'Dnipro';
       }else if(currentData.location.name == 'Днепропетровск' || currentData.location.name == 'Дніпропетровськ'){
        cytyTitle.textContent = 'Дніпро';
       }else{
        cytyTitle.textContent = currentData.location.name;
       }
    currentTemp.innerHTML = `${currentData.current.temp_c} <span>°C</span>`;
    conditionTeext.textContent = currentData.current.condition.text;
    conditionImg.setAttribute('src', currentData.current.condition.icon);
    pDate.textContent = formattedDate;
    pTime.textContent = currentTime;
    feelsLike.textContent = `${currentData.current.feelslike_c} °C`;
    humidity.textContent = `${currentData.current.humidity} %`;
    windSpeed.textContent = `${currentData.current.wind_kph} km/h`;

   function switchCurrentCF(){
    if(cfBtn.firstChild.classList.contains('active')){
        currentTemp.innerHTML = `${currentData.current.temp_c} <span>°C</span>`;
        feelsLike.textContent = `${currentData.current.feelslike_c} °C`;
        windSpeed.textContent = `${currentData.current.wind_kph} km/h`;
    }else if(cfBtn.lastChild.classList.contains('active')){
        currentTemp.innerHTML = `${currentData.current.temp_f} <span>°F</span>`;
        feelsLike.textContent = `${currentData.current.feelslike_f} °F`;
        windSpeed.textContent = `${currentData.current.wind_mph} m/h`;
    }
  }

    cfBtn.addEventListener('click', switchCurrentCF);
}



getCurrentData();

 async function  pon(){
    let response = await fetch( `http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=${finalReq}`, {mode: 'cors'});
    if(finalReq == 'dnepr' || finalReq == 'dnipro'){
        response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
   }else if(finalReq == 'днепр' || finalReq == 'дніпро'){
       response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
   }
    const currentData = await response.json();
    console.log(currentData);
    rainChance.textContent = `${currentData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
    const today = new Date();
    const tomorrow = new Date(today);
    const afterTomorrow = new Date(today);
    const thirdDay = new Date(today);
    
    tomorrow.setDate(tomorrow.getDate() + 1);
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);
    thirdDay.setDate(thirdDay.getDate() + 3);

     
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];
    const afterTomorrowDateString = afterTomorrow.toISOString().split('T')[0];

    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv&dt=${tomorrowDateString}`, {mode: 'cors'});
    const tomorrowData = await response.json();
    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv&dt=${afterTomorrowDateString}`, {mode: 'cors'});
    const afterTomorrowData = await response.json();

    console.log("Tomorrow:", tomorrowData);
    console.log("After Tomorrow:", afterTomorrowData);

    
    todayMinTemp.textContent = `${currentData.forecast.forecastday[0].day.mintemp_c} °C`;
    todayMaxTemp.textContent = `${currentData.forecast.forecastday[0].day.maxtemp_c} °C`;
    todayIcon.setAttribute('src', currentData.forecast.forecastday[0].day.condition.icon);

    const tomorrowCalDay = formatDate2(tomorrowData.forecast.forecastday[0].date);
    tomorrowDate.textContent = tomorrowCalDay;
    tomorrowMinTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.mintemp_c} °C`;
    tomorrowMaxTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.maxtemp_c} °C`;
    tomorrowIcon.setAttribute('src', tomorrowData.forecast.forecastday[0].day.condition.icon);


    const afterTomorrowCalDay = formatDate2(afterTomorrowData.forecast.forecastday[0].date);
    afterTomorrowDate.textContent = afterTomorrowCalDay;
    afterTomorrowMinTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.mintemp_c} °C`;
    afterTomorrowMaxTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.maxtemp_c} °C`;
    afterTomorrowIcon.setAttribute('src', afterTomorrowData.forecast.forecastday[0].day.condition.icon);

    let currentHour = parseInt(currentData.location.localtime.substring(11 , 13));
    if (isNaN(currentHour)) {
        currentHour = parseInt(currentData.location.localtime.substring(11 , 12));
    }
    
  hourlyTimes.forEach((element, index) =>{
    if(currentHour + index <= 23){
        if(currentHour + index < 10){
            element.textContent = `0${currentHour + index}:00`
         }else{
            element.textContent = `${currentHour + index}:00`
         }
       
    } else if(currentHour + index > 23){
        if(currentHour + index - 24 < 10){
            element.textContent = `0${currentHour + index - 24}:00`
         }else{
            element.textContent = `${currentHour + index - 24}:00`
         } 
     } 
  });

  hourlyTemps.forEach((element, index) =>{
    if(currentHour + index <= 23){
     element.textContent = `${currentData.forecast.forecastday[0].hour[currentHour + index].temp_c} °C`;
    }else if(currentHour + index > 23){
        element.textContent = `${tomorrowData.forecast.forecastday[0].hour[currentHour + index - 24].temp_c} °C`;
    }
  });

  hourlyIcon.forEach((element, index) =>{
    if(currentHour + index <= 23){
        element.setAttribute('src', currentData.forecast.forecastday[0].hour[currentHour + index].condition.icon)
       }else if(currentHour + index > 23){
        element.setAttribute('src', tomorrowData.forecast.forecastday[0].hour[currentHour + index - 24].condition.icon);
       }
  });


   function switchCF(){
     
    if(cfBtn.firstChild.classList.contains('active')){
        todayMinTemp.textContent = `${currentData.forecast.forecastday[0].day.mintemp_c} °C`;
        todayMaxTemp.textContent = `${currentData.forecast.forecastday[0].day.maxtemp_c} °C`;
    
        tomorrowMinTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.mintemp_c} °C`;
        tomorrowMaxTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.maxtemp_c} °C`;
    
        afterTomorrowMinTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.mintemp_c} °C`;
        afterTomorrowMaxTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.maxtemp_c} °C`;

        hourlyTemps.forEach((element, index) =>{
            if(currentHour + index <= 23){
             element.textContent = `${currentData.forecast.forecastday[0].hour[currentHour + index].temp_c} °C`;
            }else if(currentHour + index > 23){
                element.textContent = `${tomorrowData.forecast.forecastday[0].hour[currentHour + index - 24].temp_c} °C`;
            }
          });
    }else if(cfBtn.lastChild.classList.contains('active')){
        todayMinTemp.textContent = `${currentData.forecast.forecastday[0].day.mintemp_f} °F`;
        todayMaxTemp.textContent = `${currentData.forecast.forecastday[0].day.maxtemp_f} °F`;

        tomorrowMinTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.mintemp_f} °F`;
        tomorrowMaxTemp.textContent = `${tomorrowData.forecast.forecastday[0].day.maxtemp_f} °F`;
    
        afterTomorrowMinTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.mintemp_f} °F`;
        afterTomorrowMaxTemp.textContent = `${afterTomorrowData.forecast.forecastday[0].day.maxtemp_f} °F`;

        hourlyTemps.forEach((element, index) =>{
            if(currentHour + index <= 23){
             element.textContent = `${currentData.forecast.forecastday[0].hour[currentHour + index].temp_f} °F`;
            }else if(currentHour + index > 23){
                element.textContent = `${tomorrowData.forecast.forecastday[0].hour[currentHour + index - 24].temp_f} °F`;
            }
          });
    }
  }

  cfBtn.addEventListener('click', switchCF);
 }

 

 pon();

async function searchCurrentData() {
    if (inputSearch.value === '') return;
        finalReq = inputSearch.value.toLowerCase();
         getCurrentData();
        pon();
        inputSearch.value = '';
       
}

/*function changeBackground(condition) {
    const imageName = condition.replace(/\s/g, "_") + ".jpg";
    body.style.background = `url(/dist/imgs/${imageName})`;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
}*/

searchIcon.addEventListener('click', searchCurrentData);
inputSearch.addEventListener('keypress', (e) =>{
 if(e.key === 'Enter'){
     searchCurrentData();
 }
})

function formatDate(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${monthName} ${year}`;
}

function formatDate2(dateString){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];

    return `${dayOfMonth} ${monthName}`;
}

switchD.addEventListener('click', (e) =>{
    //if(e.target.classList.contains('active'))return;
    switchH.classList.remove('active');
    e.target.classList.add('active');
    hourly.style.display = 'none';
    daily.style.display = 'flex';
    Hnav.style.display = 'none';
});

switchH.addEventListener('click', (e) =>{
    //if(e.target.classList.contains('active'))return;
    switchD.classList.remove('active');
    e.target.classList.add('active');
    hourly.style.display = 'flex';
    daily.style.display = 'none';
    Hnav.style.display = 'flex';
 });

 window.addEventListener('click', (e) => {
    if (e.target.classList.contains('h-link')) {
        if (e.target.classList.contains('active')) return;
        hLinks.forEach((link) => {
            link.classList.remove('active');
        })
        e.target.classList.add('active');
    }
});

cfBtn.addEventListener('click', () =>{
    cfBtn.firstChild.classList.toggle('active');
        cfBtn.lastChild.classList.toggle('active');
})

