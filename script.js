/* global console, chrome */

(function() {
    "use strict";

    let observer = new MutationObserver(function (mutations) {
        labelClickables();
    });

    let config = {childList: true, subtree: true};

    function labelClickables() {
        let tags = ['a', 'link', 'script', 'iframe', 'button', 'textarea', 'input', 'select', 'details', 'button'];
        let roles = ['button' , 'tab' , 'link', 'checkbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio'];
        let selector = ':not('+tags.join('):not(')+'):not([role="'+roles.join('"]):not([role="')+"\"]):not([onclick]):not([jsaction])";
        let elements = document.body.querySelectorAll(selector);

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.style.cursor === "pointer" ||
                element.className !== "" &&
                element.computedStyleMap().get("cursor").value === "pointer" &&
                element.parentElement.computedStyleMap().get("cursor").value !== "pointer") {
                element.setAttribute('role', 'button');
            }
        }
    }

    function run() {
        chrome.storage.sync.get({
            blacklist: ''
        }, function(items) {
            let patterns = items.blacklist.split("\n");
            for (let i = 0; i < patterns.length; i++) {
                if (document.URL.indexOf(patterns[i]) > 0) {
                    return;
                }
            }
            labelClickables();
            observer.observe(document.body, config)
        });
    }

    run();

    document.addEventListener('page:load', run);
    document.addEventListener('ready', run);
    document.addEventListener('turbolinks:load', run);
})();