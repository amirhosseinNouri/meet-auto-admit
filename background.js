// Initial intervalId value
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ intervalId: null }, function () {});
});
