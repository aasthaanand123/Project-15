//dark-light mode toggle
let modeChange = document.querySelector(".mode");
let body = document.querySelector("body");
let modes = document.querySelector(".modes");
modeChange.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  if (body.classList.contains("dark-mode")) {
    modes.textContent = "Light Mode";
  } else if (body.classList.contains("light-mode")) {
    modes.textContent = "Dark Mode";
  }
});
//on loading display of all countries
//function for creating element
let container = document.querySelector(".container");
let createElements = function (countries) {
  countries.forEach((country) => {
    let el = document.createElement("div");
    el.classList.add("box");
    el.innerHTML = `
                <img src=${country.flag} alt="flag"/>
                
                <h1 class="country__name">${country.name}</h1>
                <h3>Population: <span>${country.population}</span></h3>
                <h3 >Region: <span class="country__region">${country.region}</span></h3>
                <h3>Capital: <span>${country.capital}</span></h3>    
                   `;
    container.appendChild(el);
  });
};
let call_info = [];
//function for api call on window loading
let load = async function () {
  let call_one = await fetch("https://restcountries.com/v2/all");
  call_info = await call_one.json();

  createElements(call_info);
};
load();
//country name
let userInput = document.querySelector("input[type='text']");
let error = document.querySelector(".error");
//on user input country is searched for
userInput.addEventListener("input", function (e) {
  let userValue = e.target.value;
  let country_names = document.querySelectorAll(".country__name");
  country_names.forEach((country) => {
    if (
      country.innerText.toLowerCase().includes(userValue.toLowerCase().trim())
    ) {
      country.parentElement.style.display = "block";
    } else {
      country.parentElement.style.display = "none";
    }
  });
  if (
    !Array.from(country_names).some((c) =>
      c.innerText.toLowerCase().includes(userValue.toLowerCase().trim())
    )
  ) {
    error.classList.remove("hidden");
  } else {
    if (!error.classList.contains("hidden")) {
      error.classList.add("hidden");
    }
  }
});
//drop down
let ionicon = document.querySelector(".ionicon__three");
let dropdown = document.querySelector(".each");
let heading_ul = document.querySelector("#continents");
let toggle = function () {
  dropdown.classList.toggle("hidden");
  ionicon.classList.toggle("transform");
};
heading_ul.addEventListener("click", toggle);
ionicon.addEventListener("click", toggle);
let items = document.querySelectorAll(".item");
//region filter
items.forEach((item) => {
  item.addEventListener("click", function (e) {
    let itemValue = e.target.innerText;
    let regions = document.querySelectorAll(".country__region");
    regions.forEach((region) => {
      if (
        region.innerText
          .toLowerCase()
          .trim()
          .includes(itemValue.toLowerCase().trim())
      ) {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
//
let description_country = document.querySelector(".description_country");
let inputs = document.querySelector(".inputs");
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
//loading description on clicking
let load_description = function (name) {
  removeAllChildNodes(description_country);
  let req_two;
  call_info.forEach((el) => {
    if (el.name == name) {
      req_two = el;
    }
  });
  let str_curr = "";
  let str_lang = "";
  req_two.currencies.forEach(
    (c, index) =>
      (str_curr +=
        c.name + (index != req_two.currencies.length - 1 ? " , " : ""))
  );
  req_two.languages.forEach(
    (language, index) =>
      (str_lang +=
        language.name + (index != req_two.languages.length - 1 ? " , " : ""))
  );
  let el_two = document.createElement("div");
  el_two.classList.add("flexbox_one");
  el_two.innerHTML = `<button type="button" class="back">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon__four"
    viewBox="0 0 512 512"
  >
    <title>Arrow Back</title>
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="48"
      d="M244 400L100 256l144-144M120 256h292"
    /></svg
  >Back
</button>
<div class="flexbox">
  <img src="${req_two.flag}" alt="country image" class="description_img" />
  <div class="complete">
    <h2>${req_two.name}</h2>
    <div>
      <div class="flex_info">
        <div>
          <div class="div">
            Native Name: <span> ${req_two.nativeName}</span>
          </div>
          <div class="div">Population: <span> ${req_two.population}</span></div>
          <div class="div">Region: <span> ${req_two.region}</span></div>
          <div class="div">Sub Region: <span> ${req_two.subregion}</span></div>
          <div class="div">Capital: <span> ${req_two.capital}</span></div>
        </div>
        <div class="second">
          <div class="div">
            Top Level Domain:<span> ${req_two.topLevelDomain}</span>
          </div>
          <div class="div">Currencies:<span> ${str_curr}</span></div>
          <div class="div">Languages:<span> ${str_lang}</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
                    `;
  if (req_two.borders.length > 0) {
    let border_div = document.createElement("div");
    border_div.innerHTML = `Border Countries:`;
    border_div.classList.add("border_div");
    border_div.classList.add("div");
    let el_borders = document.createElement("div");
    el_borders.classList.add("border_el");
    req_two.borders.forEach((border) => {
      let el_b = document.createElement("span");
      call_info.forEach((c) => {
        if (c.alpha3Code == border) {
          el_b.innerText = c.name;
        }
      });
      el_b.classList.add("borders");
      el_borders.appendChild(el_b);
      el_b.addEventListener("click", function () {
        call_info.forEach((ar) => {
          if (ar.name.includes(el_b.innerText)) {
            let country_border = ar.name;
            load_description(country_border);
          }
        });
      });
    });
    border_div.appendChild(el_borders);
    el_two.children[1].children[1].children[1].appendChild(border_div);
  }

  description_country.appendChild(el_two);
};
//description
container.addEventListener("click", function (e) {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    if (
      box == e.target ||
      box == e.target.parentElement ||
      box == e.target.parentElement.parentElement
    ) {
      let country_name = box.children[1].innerText;

      load_description(country_name);
      container.style.display = "none";
      inputs.style.display = "none";
      description_country.classList.remove("hidden");
      description_country.classList.add("flex");
    }
  });
});
let items_ar = Array.from(items);
document.addEventListener("click", function (e) {
  if (
    !(e.target == ionicon) &&
    !(e.target == heading_ul) &&
    !items_ar.includes(e.target) &&
    !(e.target == dropdown)
  ) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
      ionicon.classList.remove("transform");
    }
  }

  if (
    e.target.classList.contains("back") ||
    e.target.classList.contains("ionicon__four")
  ) {
    container.style.display = "flex";
    inputs.style.display = "flex";
    userInput.value = "";
    removeAllChildNodes(container);
    createElements(call_info);
    description_country.classList.remove("flex");
    description_country.classList.add("hidden");
  }
});
//cross
let cross_input = document.querySelector(".ionicon__five");
cross_input.addEventListener("click", function () {
  if (userInput.value) {
    userInput.value = "";
    removeAllChildNodes(container);
    createElements(call_info);
    error.classList.add("hidden");
  }
});
