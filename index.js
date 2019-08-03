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
  inputs.forEach(item => {
    switch (item.name) {
      case "firstName": {
        if (/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/.test(item.value)) {
          nextStage = true;
          item.style.border = "";
          document.querySelector("p[name='firstName']").style.display = "none";
          formData.name = item.value;
        } else {
          document.querySelector("p[name='firstName']").style.display =
            "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case "lastName": {
        if (/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/.test(item.value)) {
          nextStage = true;
          item.style.border = "";
          document.querySelector("p[name='lastName']").style.display = "none";
          formData.name += " " + item.value;
        } else {
          document.querySelector("p[name='lastName']").style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case "login": {
        if (item.value.trim() !== "") {
          nextStage = true;
          item.style.border = "";
          document.querySelector("p[name='login']").style.display = "none";
          formData.login = item.value;
        } else {
          document.querySelector("p[name='login']").style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case "email": {
        if (
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
            item.value
          )
        ) {
          item.style.border = "";
          nextStage = true;
          formData.email = item.value;

          document.querySelector("p[name='email']").style.display = "none";
        } else {
          document.querySelector("p[name='email']").style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case "password": {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^~*?&])[A-Za-z\d@$!%*#^~?&]{4,}$/.test(
            item.value
          )
        ) {
          formData.password = item.value;

          nextStage = true;
          item.style.border = "";
          document.querySelector("p[name='password']").style.display = "none";
        } else {
          document.querySelector("p[name='password']").style.display = "inline";
          item.style.border = "2px solid red";
          nextStage = false;
        }

        break;
      }
      case "confirmPassword": {
        if (
          item.value ===
            document.querySelector("input[name='password']").value &&
          document.querySelector("input[name='password']").value !== ""
        ) {
          nextStage = true;
          item.style.border = "";
          document.querySelector("p[name='confirmPassword']").style.display =
            "none";
        } else {
          document.querySelector("p[name='confirmPassword']").style.display =
            "inline";
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
  e.preventDefault();
  const data = await getData();
  if (this.value !== "departments") {
    const newOpts = data["departments"][`${this.value}`];
    selectOpt2.length = 0;
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
  const nextstage = [];

  if (selectEls[0].value === selectEls[0].options[0].value) {
    nextstage.push(false);
    document.querySelector("p[name='departments']").style.display = "inline";
  } else {
    formData.department = selectEls[0].value;
    document.querySelector("p[name='departments']").style.display = "none";
  }
  if (selectEls[1].value === "vacancy") {
    nextstage.push(false);
    document.querySelector("p[name='vacancy']").style.display = "inline";
  } else {
    formData.jobTitle = selectEls[1].value;
    document.querySelector("p[name='vacancy']").style.display = "none";
  }

  return nextstage.every(item => item);
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
