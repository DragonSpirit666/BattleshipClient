import './styles.css';
/*
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost/api/timeentries");
xhr.setRequestHeader("Accept", "application/json");

xhr.send();   */

/*
let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("http://localhost/api/timeentries", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    result.data.forEach((element) => {
    console.log(element);
    });
  })
  .catch((error) => console.log("error", error));   */

import axios from "axios";
/*
axios
  .post("http://localhost/api/timeentries", {
    nom_tache: "Tâche client",
    date_debut: "2024-04-03",
    date_fin: "2024-04-04",
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
*/
/*  .get("http://localhost/api/timeentries")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
*/

const form = document.getElementById("search");
const formFields = document.getElementById("search_fields");
const result = document.getElementById("result");
  
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
// TODO Validation
  
const id = document.getElementById("tache_id").value;
  
formFields.disabled = true;
result.innerHTML = "...";
  
axios
  .get("http://localhost/api/timeentries/" + id)
  .then((response) => {
    result.innerHTML = response?.data?.data?.nom_tache;
  })
  .catch((error) => {
    result.innerHTML = error?.response?.data?.message;
  })
  .then(() => {
    formFields.disabled = false;
  });
});