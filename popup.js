const red = "#DA3F2C";
const green = "#2C645B";

const saveId = (value) => {
  chrome.storage.sync.set({ intervalId: value }, function () {});
};

const handleClick = () => {
  chrome.storage.sync.get("intervalId", ({ intervalId }) => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        chrome.tabs.executeScript(null, { file: "domScript.js" });
      }, 1000);
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
    saveId(intervalId);
    changeButtonStyle(intervalId);
  });
};

const colorBorder = document.querySelector(".color-border");

const changeButtonStyle = (result) => {
  if (result) {
    start.style.backgroundColor = red;

    colorBorder.classList.add("color-border--green");

    start.innerText = "stop";
  } else {
    start.style.backgroundColor = green;

    start.innerText = "start";
    colorBorder.classList.remove("color-border--green");
  }
};

document.querySelector("#start").addEventListener("click", handleClick);

// Initialize the intervalId.
chrome.storage.sync.get("intervalId", ({ intervalId }) => {
  changeButtonStyle(intervalId);
});
