const baseURL = "https://deptraikhoait.github.io/nguoitinhmuahe.github.io/";
const linkvertiseBase = "https://linkvertise.com/1308163/link-test-anti-bypass";

function generateVerifier() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

document.getElementById("linkvertiseBtn").addEventListener("click", function(e) {
    e.preventDefault();
    const verifier = generateVerifier();
    sessionStorage.setItem("linkVerifier", verifier);
    sessionStorage.removeItem("generatedCode");
    const returnURL = `${baseURL}?verifier=${verifier}`;
    const url = new URL(linkvertiseBase);
    url.searchParams.set("o", "sharing");
    url.searchParams.set("return_to", returnURL);
    console.log("Redirecting to:", url.toString());
    window.location.href = url.toString();
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const verifier = urlParams.get("verifier");
    const referrer = document.referrer;
    const codeDisplay = document.getElementById("codeDisplay");
    const storedVerifier = sessionStorage.getItem("linkVerifier");
    const storedCode = sessionStorage.getItem("generatedCode");

    console.log("Referrer:", referrer);
    console.log("Verifier from URL:", verifier);
    console.log("Stored Verifier:", storedVerifier);

    if (storedCode) {
        codeDisplay.style.display = "block";
        codeDisplay.textContent = storedCode;
    }
    else if (verifier && storedVerifier === verifier && referrer.includes("linkvertise.com")) {
        sessionStorage.removeItem("linkVerifier");
        const randomCode = generateCode();
        sessionStorage.setItem("generatedCode", `Your Code: ${randomCode}`);
        codeDisplay.style.display = "block";
        codeDisplay.textContent = `Your Code: ${randomCode}`;
    } else if (referrer.includes("linkvertise.com")) {
        const randomCode = generateCode();
        sessionStorage.setItem("generatedCode", `Your Code: ${randomCode} (Premium Access)`);
        codeDisplay.style.display = "block";
        codeDisplay.textContent = `Your Code: ${randomCode} (Premium Access)`;
    } else {
        codeDisplay.style.display = "block";
        codeDisplay.textContent = "Access Denied: Invalid Access";
    }
};
