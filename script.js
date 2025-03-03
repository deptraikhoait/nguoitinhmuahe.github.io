(function() {
    const BASE_URL = "https://deptraikhoait.github.io/nguoitinhmuahe.github.io/";
    const LINKVERTISE_URL = "https://linkvertise.com/1308163/link-test-anti-bypass";
    const BOT_HOST = "http://14.228.97.135:5000"; // Thay bằng IP host
    const SECRET_KEY = "jhcxbvburehgguiswwdhgfygsduvggre876yt985uishvuifdhg78934yuigfshdviu"; // Thay bằng key bí mật
// Hàm sinh verifier với timestamp
    function generateVerifier() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${timestamp}-${random}`; // Ví dụ: "1H7K9P2-X7K9P2"
    }

    document.getElementById("linkvertiseBtn").addEventListener("click", function(e) {
        e.preventDefault();
        const verifier = generateVerifier();
        const returnURL = `${BASE_URL}?verifier=${verifier}`;
        const url = new URL(LINKVERTISE_URL);
        url.searchParams.set("o", "sharing");
        url.searchParams.set("return_to", returnURL);
        window.location.href = url.toString();
    });

    window.onload = async function() {
        const params = new URLSearchParams(window.location.search);
        const verifier = params.get("verifier");
        const referrer = document.referrer;
        const display = document.getElementById("codeDisplay");

        if (verifier) {  // Chỉ cần verifier tồn tại
            display.style.display = "block";
            display.textContent = "Đang lấy code, vui lòng chờ...";

            try {
                const response = await fetch(`${BOT_HOST}/getkey`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Secret-Key': SECRET_KEY
                    },
                    body: JSON.stringify({ verifier, referrer })
                });
                const data = await response.json();
                if (data.code) {
                    display.textContent = `Code của bạn: ${data.code}\nDùng lệnh "?redeem ${data.code}" hoặc "/redeem ${data.code}" trong Discord để nhận role!\nCode sẽ hết hạn sau 5 phút.\nHiện có ${data.key_count} key đang hoạt động.`;
                } else {
                    display.textContent = `Lỗi: ${data.error}`;
                }
            } catch (error) {
                display.textContent = "Lỗi hệ thống, vui lòng thử lại!";
                console.error(error);
            }
        } else {
            display.style.display = "block";
            display.textContent = "Access Denied: Invalid Access";
        }
    };
})();
