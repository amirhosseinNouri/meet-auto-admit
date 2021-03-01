const red = "#DA3F2C";
const green = "#2C645B";

const saveId = (value) => {
  chrome.storage.sync.set({ intervalId: value }, function () {
    //   alert('saved')
  });
};

const restoreId = () => {
  chrome.storage.sync.get("intervalId", (data) => {
    let { intervalId } = data;

    if (!intervalId) {
      // alert('null')
      intervalId = setInterval(() => {
        let elems = [...document.querySelectorAll(".CwaK9")];
        if (elems.length > 0) {
          elems[1].click();
        }
      }, 1000);
    //   alert(intervalId);
    } else {
      // alert('not null')
      clearInterval(intervalId);
      intervalId = null;
    }
    saveId(intervalId);
    setButtonStyle(intervalId);
  });
};

const setButtonStyle = (result) => {
  if (result) {
    //   alert('null')
    start.style.backgroundColor = red;
    document.body.style.borderBottom = "7px solid " + green;
    start.innerText = "stop";
  } else {
    //   alert('not null')
    start.style.backgroundColor = green;
    document.body.style.borderBottom = "7px solid " + red;
    start.innerText = "start";
  }
};

document.querySelector("#start").addEventListener("click", restoreId);
chrome.storage.sync.get("intervalId", ({ intervalId }) => {
  setButtonStyle(intervalId);
});
