(function() {
    const BASE_URL = "https://deptraikhoait.github.io/nguoitinhmuahe.github.io/";
    const LINKVERTISE_URL = "https://linkvertise.com/1308163/link-test-anti-bypass";
    const BOT_HOST = "http://14.228.97.135:5000"; // Thay bằng IP host
    const SECRET_KEY = "jhcxbvburehgguiswwdhgfygsduvggre876yt985uishvuifdhg78934yuigfshdviu"; // Thay bằng key bí mật
function generateVerifier() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${timestamp}-${random}`;
    }

    document.getElementById("linkvertiseBtn").addEventListener("click", function(e) {
        e.preventDefault();
        const verifier = generateVerifier();
        localStorage.setItem("tempVerifier", verifier);
        const returnURL = `${BASE_URL}/verify.html?verifier=${verifier}`; // Chuyển sang trang verify.html
        const url = new URL(LINKVERTISE_URL);
        url.searchParams.set("o", "sharing");
        url.searchParams.set("return_to", returnURL);
        console.log("Redirecting to:", url.toString());
        window.location.href = url.toString();
    });
})();
