const red = "#DA3F2C";
const green = "#2C645B";

let intervalId;
const restoreId = () => {
  intervalId = JSON.parse(localStorage.getItem("intervalId"));
};

const saveId = () => {
  localStorage.setItem("intervalId", JSON.stringify(intervalId));
};

const accept = () => {
  restoreId();

  if (!intervalId) {
    intervalId = setInterval(() => {
      let elems = [...document.querySelectorAll(".CwaK9")];
      if (elems.length > 0) {
        elems[1].click();
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
  saveId();
  return intervalId;
};

const start = document.querySelector("#start");
start.addEventListener("click", () => {
  chrome.tabs.executeScript(
    {
      code: "(" + accept + ")();",
    },
    (result) => {
      if (result == "") {
        start.style.backgroundColor = red;
        document.body.style.borderBottom = "7px solid " + green;
        start.innerText = "stop";
      } else {
        start.style.backgroundColor = green;
        document.body.style.borderBottom = "7px solid " + red;
        start.innerText = "start";
      }
    }
  );
});

restoreId();
