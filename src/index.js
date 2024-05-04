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

async function getCurrentData(){
    let response = await fetch('http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv', {mode: 'cors'});
    const currentData = await response.json();
    console.log(currentData);
    let currentDate = currentData.location.localtime.substring(0 , 10);
    let currentTime = currentData.location.localtime.substring(11 , 16);
    const formattedDate = formatDate(currentDate);
    //changeBackground(currentData.current.condition.text);
    cytyTitle.textContent = currentData.location.name;
    currentTemp.innerHTML = `${currentData.current.temp_c} <span>°C</span>`;
    conditionTeext.textContent = currentData.current.condition.text;
    conditionImg.setAttribute('src', currentData.current.condition.icon);
    pDate.textContent = formattedDate;
    pTime.textContent = currentTime;
    feelsLike.textContent = `${currentData.current.feelslike_c} °C`;
    humidity.textContent = `${currentData.current.humidity} %`;
    windSpeed.textContent = `${currentData.current.wind_kph} km/h`;
    pon();
}

getCurrentData();

 async function  pon(){
    let response = await fetch(' http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv', {mode: 'cors'});
    const currentData = await response.json();
    console.log(currentData);
    rainChance.textContent = `${currentData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
 }



async function searchCurrentData() {
    if (inputSearch.value === '') return;
       let finalReq = inputSearch.value.toLowerCase();
    try {
         
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=${finalReq}`, { mode: 'cors' });
        let response2 = await fetch(` http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=${finalReq}`, {mode: 'cors'});
        if(finalReq == 'dnepr' || finalReq == 'dnipro'){
             response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
        }else if(finalReq == 'днепр' || finalReq == 'дніпро'){
            response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=dnepropetrovsk`, { mode: 'cors' });
        }
        const currentData = await response.json();
        const currentData2 = await response2.json();
        console.log(currentData2);
       
        if (currentData.error) {
            alert('Location not found.');
        } else {
            //changeBackground(currentData.current.condition.text);
            console.log(currentData);
            let currentDate = currentData.location.localtime.substring(0 , 10);
            let currentTime = currentData.location.localtime.substring(11 , 16);
            const formattedDate = formatDate(currentDate);
            
           // img.setAttribute('src', currentData.current.condition.icon);
           if( currentData.location.name == 'Dnepropetrovsk'){
            cytyTitle.textContent = 'Dnipro';
           }else if(currentData.location.name == 'Днепропетровск' || currentData.location.name == 'Дніпропетровськ'){
            cytyTitle.textContent = 'Дніпро';
           }else{
            cytyTitle.textContent = currentData.location.name;
           }
           
           currentTemp.textContent = `${currentData.current.temp_c} °C`;
           conditionTeext.textContent = currentData.current.condition.text;
           conditionImg.setAttribute('src', currentData.current.condition.icon);
           pDate.textContent = formattedDate;
           pTime.textContent = currentTime;
           feelsLike.textContent = `${currentData.current.feelslike_c} °C`;
           humidity.textContent = `${currentData.current.humidity} %`;
           windSpeed.textContent = `${currentData.current.wind_kph} km/h`;
           rainChance.textContent = `${currentData2.forecast.forecastday[0].day.daily_chance_of_rain} %`;
           inputSearch.value = '';
        }
    } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            alert('Network error. Please check your internet connection.');
        } else {
            console.error(error);
        }
    }
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