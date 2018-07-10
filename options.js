// Saves options to chrome.storage.sync.
function save_options() {
    var blacklist = document.getElementById('blacklist').value;
    chrome.storage.sync.set({
        blacklist: blacklist
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        blacklist: ''
    }, function(items) {
        document.getElementById('blacklist').value = items.blacklist;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);