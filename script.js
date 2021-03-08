const areaInput = document.querySelector("#area");
const nameElement = document.querySelector("#county_name");
const dateElement = document.querySelector("#information_date");
const casesElement = document.querySelector("#current_cases");
const rateElement = document.querySelector("#rolling_rate");
const directionElement = document.querySelector("#case_direction");

function makeFetch(area) {
  const baseUrl = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaCode=${area}`;
  const structure = {
      "date":"date",
      "name":"areaName",
      "code":"areaCode",
      "total":"newCasesByPublishDateRollingSum",
      "rollingRate":"newCasesByPublishDateRollingRate",
      "direction":"newCasesByPublishDateDirection",
  };
  const structureString = JSON.stringify(structure);
  const query = `${baseUrl}&structure=${structureString}`;

  fetch(query)
  .then(response => response.json())
  .then(data => handleData(data.data[0]));
}

function handleData(response){
  console.log(response)
  nameElement.innerHTML = response.name
  dateElement.innerHTML = response.date
  casesElement.innerHTML = response.total
  rateElement.innerHTML = response.rollingRate
  directionElement.innerHTML = {"UP": "UP [^]", "DOWN": "DOWN [v]"}[response.direction];
  directionElement.className = {"UP": "up", "DOWN": "down"}[response.direction];
}

areaInput.addEventListener("change", e => makeFetch(e.target.value));
window.onload = () => makeFetch(areaInput.value);
