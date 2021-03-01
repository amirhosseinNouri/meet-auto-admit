const red = "#DA3F2C";
const green = "#2C645B";

const saveId = (value) => {
  chrome.storage.sync.set({ intervalId: value }, function () {});
};

const handleClick = () => {
  chrome.storage.sync.get("intervalId", ({ intervalId }) => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        chrome.tabs.executeScript(null, {}, function () {
          chrome.tabs.executeScript(null, { file: "custom.js" });
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
    saveId(intervalId);
    changeButtonStyle(intervalId);
  });
};

const changeButtonStyle = (result) => {
  if (result) {
    start.style.backgroundColor = red;
    document.body.style.borderBottom = "7px solid " + green;
    start.innerText = "stop";
  } else {
    start.style.backgroundColor = green;
    document.body.style.borderBottom = "7px solid " + red;
    start.innerText = "start";
  }
};

document.querySelector("#start").addEventListener("click", handleClick);

// Initialize the intervalId.
chrome.storage.sync.get("intervalId", ({ intervalId }) => {
  changeButtonStyle(intervalId);
});
