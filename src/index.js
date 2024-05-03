import _, { values } from 'lodash';

const cytyTitle = document.querySelector('.city');
const currentTemp = document.querySelector('.temperature-text');
const conditionTeext = document.querySelector('.condition-text');
const conditionImg = document.querySelector('.condition-icon');
const dateAndTime = document.querySelector('.date-and-time');
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
    let dBrT = currentData.location.localtime.replace(/\s/g, "<br>");
    //changeBackground(currentData.current.condition.text);
    cytyTitle.textContent = currentData.location.name;
    currentTemp.textContent = `${currentData.current.temp_c} °C`;
    conditionTeext.textContent = currentData.current.condition.text;
    conditionImg.setAttribute('src', currentData.current.condition.icon);
    dateAndTime.innerHTML = dBrT;
    feelsLike.textContent = `${currentData.current.feelslike_c} °C`;
    humidity.textContent = `${currentData.current.humidity} %`;
    windSpeed.textContent = `${currentData.current.wind_kph} km/h`;
    
}

getCurrentData();

 async function  pon(){
    let response = await fetch(' http://api.weatherapi.com/v1/forecast.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv', {mode: 'cors'});
    const currentData = await response.json();
    console.log(currentData);
    rainChance.textContent = `${currentData.forecast.forecastday[0].hour[0].chance_of_rain} %`;
 }

pon();

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
            let dBrT = currentData.location.localtime.replace(/\s/g, "<br>");
            console.log(currentData);
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
           dateAndTime.innerHTML = dBrT;
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