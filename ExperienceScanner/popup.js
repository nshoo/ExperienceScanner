const Status = Object.freeze({
    LOADING: "loading",
    ERROR: "error",
    INFO: "info",
    WELCOME: "welcome"
});

const activeQuery = { active: true, currentWindow: true };
function queryCallback(key, tabs) {
    let current = tabs[0];
    console.log(current);

    chrome.scripting.executeScript({
        target: { tabId: current.id },
        files: ["scanner.js"]
    });

    setTimeout(() => {
        chrome.tabs.sendMessage(current.id, "wow", (response) => {
            if("error" in response) {
                renderError(response.error);
            } else {
                JobClassifier.extract(key, response.description).then(result => {
                    renderInfo(result);
                });
            }
        })
    }, 1000);
}

window.addEventListener("load", () => {
    chrome.storage.sync.get("apiKey", (result) => {
        if(typeof result.apiKey === "undefined" || result.apiKey === "") {
            renderWelcome();
        } else {
            renderLoading();
            chrome.tabs.query(activeQuery, queryCallback.bind(null, result.apiKey));
        }
    });
});

function renderYears(amount) {
    let yearsElem = document.querySelector(".data .years");

    if(amount === false) {
        yearsElem.innerHTML = "N/A";
    } else {
        yearsElem.innerHTML = `${amount}+`;
    }
}

function renderInfo(result) {
    let kind = result.classification.toLowerCase();
    let classElem = document.querySelector(".data .experience");

    if(kind.indexOf("no") > -1) {
        classElem.innerHTML = "None";
        classElem.style.background = "green";
        renderYears(false);
    } else if(kind.indexOf("some") > -1) {
        classElem.innerHTML = "Some";
        classElem.style.background = "yellow";
        renderYears(false);
    } else {
        classElem.innerHTML = "Minimum";
        classElem.style.background = "orange";
        renderYears(result.minimum);
    }

    popupState(Status.INFO);
}

function loadingVisible(visible) {
    let loading = document.querySelector(".loading");
    loading.style.display = visible ? "flex" : "none";
}

function errorVisible(visible) {
    let error = document.querySelector(".error");
    error.style.display = visible ? "flex" : "none";
}

function infoVisible(visible) {
    let info = document.querySelector(".info");
    info.style.display = visible ? "flex" : "none";
}

function welcomeVisible(visible) {
    let welcome = document.querySelector(".welcome");
    welcome.style.display = visible ? "flex" : "none";
}

function popupState(status) {
    if(status == Status.LOADING) {
        loadingVisible(true);
        errorVisible(false);
        infoVisible(false);
        welcomeVisible
    } else if(status == Status.ERROR) {
        loadingVisible(false);
        errorVisible(true);
        infoVisible(false);
        welcomeVisible(false);
    } else if(status == Status.INFO) {
        loadingVisible(false);
        errorVisible(false);
        infoVisible(true);
        welcomeVisible(false);
    } else if(status == Status.WELCOME) {
        loadingVisible(false);
        errorVisible(false);
        infoVisible(false);
        welcomeVisible(true);
    }
}

function renderError(message) {
    let error = document.querySelector(".error");
    error.innerHTML = message;
    popupState(Status.ERROR);
}

function renderLoading() {
    popupState(Status.LOADING);
}

function renderWelcome() {
    popupState(Status.WELCOME);
}