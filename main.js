
function formHeader(){

    const container = document.createElement('div');

    const subHeader = document.createElement('h2');
    subHeader.textContent = "Enter a location: ";
    subHeader.id = "subheader";

    container.appendChild(subHeader);

    return container;
}
function renderForm(){

    const form = document.createElement('form');
    form.id = "weather-query";

    const input = document.createElement('input');
    input.id = "query";

    input.setAttribute('type', 'text');
    input.setAttribute('name', 'query');

    const submit = document.createElement('input');
    submit.id = "submit";
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Get');
    

    form.appendChild(input);
    form.appendChild(submit);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        queryAPI(form);
        form.reset();
    });

    return form;
}

async function queryAPI(form){
    const queries = form.elements;
    const query = queries[0].value;

    let data;
    let name; let high; let low; let curr;
    let feelsLike; let humidity; let pressure;
    try{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + query + ',&APPID=e3b7d2d1812c5267ab1af4eee253f489', {mode: 'cors'});
        data = await response.json();

        //console.log(data);

        name = data.name;
        high = KelvinToFahr(data.main.temp_max) + "\u00B0F";
        low = KelvinToFahr(data.main.temp_min) + "\u00B0F";
        curr = KelvinToFahr(data.main.temp) + "\u00B0F";
        feelsLike = KelvinToFahr(data.main.feels_like) + "\u00B0F";
    
        humidity = data.main.humidity + "%";
        pressure = data.main.pressure + " hPa";
    
        displayData(name, curr, high, low, feelsLike, humidity, pressure);
    }
    catch(error){
        alert(query + 'was not found! Try again!');
    }

}

function KelvinToFahr(value){
    const celsius = value - 273;

    return Math.round( 32 + ( (celsius * 9) / 5 ) );
}

function displayData(name, curr, high, low, feelsLike, humidity, pressure){
    const data = document.querySelector('#data');
    data.textContent = "";

    const h3 = document.createElement('h3');
    h3.textContent = name;

    const h4 = document.createElement('h4');
    h4.textContent = curr;

    const p1 = document.createElement('p');
    p1.textContent = "Feels Like: " + feelsLike;

    const p2 = document.createElement('p');
    p2.textContent = "High: " + high;

    const p3 = document.createElement('p');
    p3.textContent = "Low: " + low;

    const p4 = document.createElement('p');
    p4.textContent = "Humidity: " + humidity;

    const p5 = document.createElement('p');
    p5.textContent = "Pressure: " + pressure;


    data.appendChild(h3);
    data.appendChild(h4);
    data.appendChild(p1);
    data.appendChild(p2);
    data.appendChild(p3);
    data.appendChild(p4);
    data.appendChild(p5);

}

function topHalf(){
    const topDiv = document.createElement('div');
    topDiv.appendChild( formHeader() );
    topDiv.appendChild( renderForm() );
    topDiv.id = 'top';

    return topDiv;
}

function bottomHalf(){
    const bottomDiv = document.createElement('div');
    bottomDiv.id = 'bottom';

    const dataContainer = document.createElement('div');
    dataContainer.id = 'data';

    bottomDiv.appendChild(dataContainer);

    return bottomDiv;
}

function renderMain(){ 
    const mainDiv = document.querySelector('#content');
    mainDiv.appendChild( topHalf() );
    mainDiv.appendChild( bottomHalf() );
}


renderMain();

