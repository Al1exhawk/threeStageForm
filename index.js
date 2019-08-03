const forms = document.querySelectorAll(".container");
const inputs = document.querySelectorAll("#firstStage input");

const next1 = document.getElementById("nextBtn1");
const next2 = document.getElementById("nextBtn2");
const edit = document.getElementById("editBtn");
const send = document.getElementById("sendBtn");

const warningMessages = document.querySelectorAll(".warningMessage");

const selectEls = document.querySelectorAll(".container select");

const selectOpt1 = selectEls[0].options;
const selectOpt2 = selectEls[1].options;

const thirdStage = document.querySelector("#thirdStage");
const parData = document.querySelectorAll("#thirdStage p");

const formData = {};

const NextStage1 = () => {
  inputs.forEach = [].forEach;

  let nextStage = false;
  inputs.forEach((item, i) => {
    switch (i) {
      case 0: {
        if (/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/.test(item.value)) {
          nextStage = true;
          item.style.border = "";
          warningMessages[i].style.display = "none";
          formData.name = item.value;
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case 1: {
        if (/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/.test(item.value)) {
          nextStage = true;
          item.style.border = "";
          warningMessages[i].style.display = "none";
          formData.name += " " + item.value;
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case 2: {
        if (item.value.trim() !== "") {
          nextStage = true;
          item.style.border = "";
          warningMessages[i].style.display = "none";
          formData.login = item.value;
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case 3: {
        if (
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
            item.value
          )
        ) {
          item.style.border = "";
          nextStage = true;
          formData.email = item.value;

          warningMessages[i].style.display = "none";
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case 5: {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^~*?&])[A-Za-z\d@$!%*#^~?&]{4,}$/.test(
            item.value
          )
        ) {
          formData.password = item.value;

          nextStage = true;
          item.style.border = "";
          warningMessages[i].style.display = "none";
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case 6: {
        if (item.value === inputs[i - 1].value && inputs[i - 1].value !== "") {
          nextStage = true;
          item.style.border = "";
          warningMessages[i].style.display = "none";
        } else {
          warningMessages[i].style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }
        break;
      }
      default: {
        formData.company = item.value;
        break;
      }
    }
  });
  return nextStage;
};

const getData = async () => {
  const res = await fetch("./data.json");
  const body = await res.json();
  return body;
};

next1.onclick = async event => {
  event.preventDefault();
  selectOpt1.push = [].push;
  selectOpt2.push = [].push;

  if (NextStage1()) {
    forms[0].style.display = "none";
    const data = await getData();
    Object.keys(data.departments).forEach(item => {
      const opt = new Option(item, item);
      selectOpt1.push(opt);
      forms[1].style.display = "flex";
    });
  }

  event.preventDefault();
};

selectEls[0].onchange = async function(e) {
  const data = await getData();
  if (this.value !== "departments") {
    const newOpts = data["departments"][`${this.value}`];
    newOpts.forEach = [].forEach;
    newOpts.forEach(vacancy => {
      selectOpt2.push(new Option(vacancy, vacancy));
    });
    selectEls[1].disabled = false;
  } else {
    selectEls[1].disabled = true;
    selectEls[1].selectedIndex = 0;
  }
};

const NextStage2 = () => {
  let nextstage = false;
  for (let i = 0; i < selectEls.length; i++) {
    if (selectEls[i].value === selectEls[i].options[0].value) {
      warningMessages[warningMessages.length - 1 - i].style.display = "inline";
      nextstage = false;
    } else {
      warningMessages[warningMessages.length - 1 - i].style.display = "none";
      if (i === 0) {
        formData.department = selectEls[i].value;
      } else {
        formData.jobTitle = selectEls[i].value;
      }
      nextstage = true;
    }
  }
  return nextstage;
};
next2.onclick = event => {
  event.preventDefault();
  if (NextStage2()) {
    forms[1].style.display = "none";
    parData.forEach = [].forEach;
    parData.forEach((item, index) => {
      if (index !== 6) {
        item.textContent = formData[item.id];
      }
    });
    thirdStage.style.display = "flex";
  }
};

send.onclick = () => {
  localStorage.setItem("user", JSON.stringify(formData));
  inputs.forEach(i => {
    i.value = "";
  });
  selectEls[0].selectedIndex = 0;
  selectEls[1].selectedIndex = 0;

  alert("Thank You!");
};

edit.onclick = () => {
  thirdStage.style.display = "none";
  forms[0].style.display = "flex";
};
