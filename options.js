window.addEventListener("load", () => {
    let keyInput = document.querySelector('.options .row.api-key input[type="text"]');
    let saveBtn = document.querySelector('.options .row.api-key input[type="button"]');

    saveBtn.addEventListener("click", () => {
        const newKey = keyInput.value;
        if(newKey.trim().length > 0) {
            chrome.storage.sync.set({ apiKey: newKey });
        }
    });

    chrome.storage.sync.get("apiKey", (result) => {
        if(typeof result.apiKey === "undefined") {
            keyInput.value = "";
        } else {
            keyInput.value = result.apiKey;
        }
    });
});