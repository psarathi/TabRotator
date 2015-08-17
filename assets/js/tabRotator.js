var _storeKey = "__tabrotator_key__", _settings, _interval, _DEFAULT_INTERVAL = 10000;
function getLatestTimeout() {
    _settings = amplify.store.localStorage(_storeKey) || {currentInterval: null, interval: _DEFAULT_INTERVAL};
    _interval = _settings.interval;
}
function setBadge(on) {
    if (on) {
        chrome.browserAction.setBadgeBackgroundColor({color: "#49E20E"});
        chrome.browserAction.setBadgeText({text: "ON"});
        return;
    }
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
    chrome.browserAction.setBadgeText({text: "OFF"});
}
function tabRotateHandler() {
    getLatestTimeout();
    if (_settings.currentInterval) {
        clearInterval(_settings.currentInterval);
        _settings.currentInterval = null;
        amplify.store.localStorage(_storeKey, _settings);
        setBadge(false);
        return;
    }
    chrome.tabs.getAllInWindow(function (tabs) {
        var counter = 0;
        chrome.tabs.highlight({windowId: tabs[counter].windowId, tabs: [tabs[counter].index]});
        counter++;
        var currentInterval = setInterval(function () {
            if (counter >= tabs.length) {
                counter = 0;
            }
            chrome.tabs.highlight({windowId: tabs[counter].windowId, tabs: [tabs[counter].index]});
            counter++;
        }, _interval);
        setBadge(true);
        _settings.currentInterval = currentInterval;
        amplify.store.localStorage(_storeKey, _settings);
    });
}
chrome.browserAction.onClicked.addListener(tabRotateHandler);
setBadge(false);

