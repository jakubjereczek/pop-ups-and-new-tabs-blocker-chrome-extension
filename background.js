let enabled = false;

chrome.storage.sync.get(["enabled"], function(result) {
  if (result.enabled !== undefined) {
    enabled = result.enabled;
    listen(enabled);
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.enabled) {
    enabled = changes.enabled.newValue; 
    listen(enabled);
  }
});

function listen(isEnabled) {
  if (isEnabled) {
    chrome.windows.onCreated.addListener(onWindowCreated);
    chrome.tabs.onCreated.addListener(onTabCreated);
  } else {
    chrome.windows.onCreated.removeListener(onWindowCreated);
    chrome.tabs.onCreated.removeListener(onTabCreated);
  }
}

function onWindowCreated(window) {
  if (enabled) {
    chrome.windows.remove(window.id);
  }
}

function onTabCreated(tab) {
  if (enabled) {
    chrome.tabs.remove(tab.id);
  }
}