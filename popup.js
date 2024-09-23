document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector('input[type="checkbox"]');
  chrome.storage.sync.get(['enabled'], function (result) {
    checkbox.checked = result.enabled !== undefined ? result.enabled : false;
  });
  checkbox.addEventListener('click', function () {
    chrome.storage.sync.set({ enabled: checkbox.checked });
  });
});