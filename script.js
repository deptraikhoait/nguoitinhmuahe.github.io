(function() {
    var _0xbase = "https://deptraikhoait.github.io/nguoitinhmuahe.github.io/";
    var _0xlink = "https://linkvertise.com/1308163/link-test-anti-bypass";

    document.getElementById("linkvertiseBtn").addEventListener("click", function(e) {
        e.preventDefault();
        var verifier = Math.random().toString(36).substring(2, 10).toUpperCase();
        sessionStorage.setItem("linkVerifier", verifier);
        var returnURL = `${_0xbase}?verifier=${verifier}`;
        var url = new URL(_0xlink);
        url.searchParams.set("o", "sharing");
        url.searchParams.set("return_to", returnURL);
        window.location.href = url.toString();
    });

    window.onload = function() {
        var params = new URLSearchParams(window.location.search);
        var verifier = params.get("verifier");
        var referrer = document.referrer;
        var display = document.getElementById("codeDisplay");
        var storedVerifier = sessionStorage.getItem("linkVerifier");

        if (verifier && storedVerifier === verifier && referrer.includes("linkvertise.com")) {
            sessionStorage.removeItem("linkVerifier");
            display.style.display = "block";
            display.textContent = `Verifier của bạn: ${verifier}\nDùng lệnh "?verify ${verifier}" trong Discord để nhận key!`;
        } else {
            display.style.display = "block";
            display.textContent = "Access Denied: Invalid Access";
        }
    };
})();
