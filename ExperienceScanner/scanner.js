chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let elem = document.querySelector(".jobs-description__container");

    if(elem == null) {
        sendResponse({
            error: "Please navigate to a job description on LinkedIn and reactivate the extension."
        });

        return;
    }

    let content = elem.innerText;

    sendResponse({
        description: content
    });
});