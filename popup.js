let intervalId = undefined;
const start = document.querySelector("#start");
const accept = () => {
  intervalId = setInterval(() => {
    let elems = [...document.querySelectorAll(".CwaK9")];
    if (elems.length > 0) {
      elems[1].click();
    }
  }, 1000);
};

start.addEventListener("click", () => {
  if (!intervalId) {
    start.style.backgroundColor = "red";
    accept();

    start.innerText = "stop";
  } else {
    start.style.backgroundColor = "teal";
    clearInterval(intervalId);
    intervalId = undefined;
    start.innerText = "start";
  }
});

start.addEventListener("click", () => {
  chrome.tabs.executeScript(
    {
      code: "(" + accept + ")();",
    },
    () => {
      if (!intervalId) alert("auto admit is off");
      else alert("auto admti is on");
    }
  );
});
