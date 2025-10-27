/**
 * содержит обязательные поля для отправки формы, где имя свойства - это имя свойства из интеграции, а значение имя поля в форме.
 */
function hideErrorMsg(form) {
  form
    .querySelectorAll(".error-border")
    .forEach((el) => el.classList.remove("error-border"));
  form.querySelectorAll("p.error-msg").forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("error-msg");
  });
}

function showErrorMsg(form, errors, fields) {
  try {
    for (const [field, msg] of Object.entries(errors)) {
      const elP = form.querySelector(`p.error-${fields[field]}`);

      elP.classList.add("error-msg");
      elP.innerHTML = msg;
      form
        .querySelector(`input[name="${fields[field]}"]`)
        .classList.add("error-border");
    }
  } catch (e) {
    console.log("Function showErrorMsg: show err-msg");
    console.log(
      "One or more element names from the form were not found in the object FIELDS or in object responsible for validation rules"
    );
    console.error(e);
  }
}

/** Для модальных окон начало */
function showModal(errorMsg, lang = "en") {
  try {
    const modal = document.querySelector("#myModal");
    modal.querySelector(".modal-error").innerHTML = errorMsg[lang] ?? errorMsg;
    modal.style.display = "block";

    document.querySelectorAll(".main_form button").forEach((el) => {
      el.disabled = true;
    });

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  } catch (e) {
    console.log("Function showModal:");
    console.log("Not modal block in html");
    console.error(e);
  }
}

// document.querySelector("#myModal span.close").addEventListener("click", () => {
//   document.querySelector("#myModal").style.display = "none";
// });
/** Для модальных окон конец */

/* Обработчик формы/форм*/

/* Вспомогательные функции */
function isObject(obj) {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
}

function isEmptyObject(obj) {
  return this.isObject(obj) && Object.keys(obj).length === 0;
}

/* Прелоадер */
function preloaderShow() {
  document.querySelectorAll(".main_form").forEach((el) => {
    el.querySelector("button").disabled = true;
    el.style.position = "relative";
    const preloader = document.createElement("div");
    preloader.classList.add("preloader");
    el.appendChild(preloader);
  });
}
function preloaderHide() {
  document.querySelectorAll(".main_form").forEach((el) => {
    el.querySelector("button").disabled = false;
    el.style.position = "relative";
    el.querySelector("div.preloader").remove();
    formsReset();
  });
}

function formsReset() {
  const forms = document.querySelectorAll("form");
  forms.forEach((element) => element.reset());
}

function getQueryString() {
  let params = new URL(document.location).searchParams;
  return params.toString();
}

function getPixel() {
  return new URL(document.location).searchParams.get("bpixel");
}
