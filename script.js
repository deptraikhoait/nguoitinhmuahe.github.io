(function() {
    const BASE_URL = "https://deptraikhoait.github.io/nguoitinhmuahe.github.io/";
    const LINKVERTISE_URL = "https://linkvertise.com/1308163/link-test-anti-bypass";
    const BOT_HOST = "http://14.228.97.135:5000"; // Thay bằng IP host
    const SECRET_KEY = "jhcxbvburehgguiswwdhgfygsduvggre876yt985uishvuifdhg78934yuigfshdviu#t89y34578y&*"; // Thay bằng key bí mật
function generateVerifier() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${timestamp}-${random}`;
    }

    document.getElementById("linkvertiseBtn").addEventListener("click", function(e) {
        e.preventDefault();
        const verifier = generateVerifier();
        const returnURL = `${BASE_URL}?verifier=${verifier}`;
        const url = new URL(LINKVERTISE_URL);
        url.searchParams.set("o", "sharing");
        url.searchParams.set("return_to", returnURL);
        console.log("Step 1: Redirecting to:", url.toString());
        window.location.href = url.toString();
    });

    window.onload = async function() {
        console.log("Step 2: window.onload triggered");
        const urlParams = new URLSearchParams(window.location.search);
        const verifier = urlParams.get("verifier");
        const referrer = document.referrer;
        const currentURL = window.location.href;
        const codeDisplay = document.getElementById("codeDisplay");

        console.log("Step 3: Verifier từ URL:", verifier);
        console.log("Step 4: Referrer:", referrer);
        console.log("Step 5: URL hiện tại:", currentURL);

        codeDisplay.style.display = "block";

        if (!verifier) {
            codeDisplay.textContent = "Access Denied: Verifier không tồn tại trong URL!";
            console.log("Step 6: Verifier không tồn tại!");
            return;
        }

        console.log("Step 7: Verifier tồn tại, gửi request đến bot...");
        codeDisplay.textContent = "Đang lấy code, vui lòng chờ...";

        try {
            const response = await fetch(`${BOT_HOST}/getkey`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Secret-Key': SECRET_KEY
                },
                body: JSON.stringify({ verifier, referrer, currentURL })
            });
            console.log("Step 8: Đã gửi request, chờ phản hồi...");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Step 9: Response từ bot:", data);

            if (data.code) {
                codeDisplay.textContent = `Code của bạn: ${data.code}\nDùng lệnh "?redeem ${data.code}" hoặc "/redeem ${data.code}" trong Discord để nhận role!\nCode sẽ hết hạn sau 5 phút.\nHiện có ${data.key_count} key đang hoạt động.`;
                console.log("Step 10: Nhận key thành công!");
            } else {
                codeDisplay.textContent = `Lỗi từ bot: ${data.error}`;
                console.log("Step 11: Bot trả về lỗi!");
            }
        } catch (error) {
            codeDisplay.textContent = "Lỗi kết nối bot, kiểm tra host hoặc IP!";
            console.error("Step 12: Fetch error:", error);
        }
    };
})();
