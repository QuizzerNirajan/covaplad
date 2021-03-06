"use-strict";

const country_select = document.getElementById("id_temporary-country");
let country_last_value;

const province_select = document.getElementById("id_temporary-province");
let province_last_value;

const district_select = document.getElementById("id_temporary-district");
let district_last_value;

const municipality_select = document.getElementById("id_temporary-municipality");
let municipality_last_value;

const ward_select = document.getElementById("id_temporary-ward");
let ward_last_value;

const sameAsTemp = document.getElementById("flexCheckDefault")
sameAsTemp.setAttribute("disabled", (country_select.value === "" || province_select.value === "" || district_select.value ==="" || municipality_select.value ==="" || ward_select.value ===""))

const helper = async (name, cause, effect, last_value, callback) => {
  const cause_id = cause.value;
  if (cause_id === "") return;

  const raw_response = await fetch(`/address/${name}/${cause_id}`);
  const response = await raw_response.json();
  const data = response.data;

  if (data.length) {
    const current_value = data[0][0];
    last_value = current_value;
  }

  while (effect.firstChild) {
    effect.lastChild.remove();
  }
  data.forEach(([value, name]) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = name;
    effect.appendChild(option);
  });
  callback && callback();
  return last_value
};

country_select.addEventListener('change',async (e) => {
  console.log("Changed", e.target.innerHTML)
 province_last_value = await helper(
    "country",
    country_select,
    province_select,
    country_last_value,
    getDistricts
 );
 if (!(country_select.value === "" || province_select.value === "" || district_select.value === "" || municipality_select.value === "" || ward_select.value === "")) {

  sameAsTemp.removeAttribute("disabled")
}

})


const getDistricts = async () => {
 district_last_value = await helper(
    "province",
    province_select,
    district_select,
    district_last_value,
    getMunicipalities
 );
 if (!(country_select.value === "" || province_select.value === "" || district_select.value === "" || municipality_select.value === "" || ward_select.value === "")) {

  sameAsTemp.removeAttribute("disabled")
}
};

const getMunicipalities = async () => {
 municipality_last_value = await helper(
    "district",
    district_select,
    municipality_select,
    municipality_last_value,
    getWards
 );
 if (!(country_select.value === "" || province_select.value === "" || district_select.value === "" || municipality_select.value === "" || ward_select.value === "")) {

  sameAsTemp.removeAttribute("disabled")
}
};

const getWards = async () => {
  ward_last_value = await helper("municipality", municipality_select, ward_select, ward_last_value);
  if (!(country_select.value === "" || province_select.value === "" || district_select.value === "" || municipality_select.value === "" || ward_select.value === "")) {

    sameAsTemp.removeAttribute("disabled")
  }

};

province_select.onchange = getDistricts;
district_select.onchange = getMunicipalities;
municipality_select.onchange = getWards;
