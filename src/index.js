import _, { values } from 'lodash';

/*const button = document.querySelector('.city');
const inputValue = document.querySelector('#city');
const body = document.querySelector('body');
const img = document.querySelector('img');*/

async function getCurrentData(){
    let response = await fetch('http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=kyiv', {mode: 'cors'});
    const currentData = await response.json();
    console.log(currentData);
    //changeBackground(currentData.current.condition.text);
    //img.setAttribute('src', currentData.current.condition.icon);
}

getCurrentData();

async function searchCurrentData() {
    if (inputValue.value === '') return;

    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=ac6ebdd86e3c4646807110042242304&q=${inputValue.value.toLowerCase()}`, { mode: 'cors' });
        const currentData = await response.json();
        if (currentData.error) {
            alert('Location not found.');
        } else {
            //changeBackground(currentData.current.condition.text);
            console.log(currentData);
           // img.setAttribute('src', currentData.current.condition.icon);
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

//button.addEventListener('click', searchCurrentData);
