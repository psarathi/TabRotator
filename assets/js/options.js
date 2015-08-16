var _storeKey = "__tabrotator_key__",
    _settings = amplify.store.localStorage(_storeKey),
    statusTxt = $('#statusTxt');
$('#timeout').val((_settings ? _settings.interval : _DEFAULT_INTERVAL));
$('#save').on('click', function () {
    var timeout = $('#timeout').val(),
        newTimeout = parseInt(timeout, 10);
    if (!isNaN(newTimeout)) {
        if (_settings) {
            _settings['interval'] = newTimeout;
            amplify.store.localStorage(_storeKey, _settings);
        } else {
            amplify.store.localStorage(_storeKey, {currentInterval:[], interval: newTimeout});
        }
        statusTxt.css("color", "green").text("Interval saved successfully, please restart the rotator");
        setTimeout(function() {
            statusTxt.text('');
        }, 5000);
    }
});