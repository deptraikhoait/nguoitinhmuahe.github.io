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
        localStorage.setItem("tempVerifier", verifier); // Lưu verifier tạm thời vào localStorage
        const returnURL = `${BASE_URL}?verifier=${verifier}`;
        const url = new URL(LINKVERTISE_URL);
        url.searchParams.set("o", "sharing");
        url.searchParams.set("return_to", returnURL);
        console.log("Redirecting to:", url.toString());
        window.location.href = url.toString();
    });

    window.onload = async function() {
        const urlParams = new URLSearchParams(window.location.search);
        const verifier = urlParams.get("verifier");
        const referrer = document.referrer;
        const codeDisplay = document.getElementById("codeDisplay");
        const storedVerifier = localStorage.getItem("tempVerifier");

        console.log("Verifier từ URL:", verifier);
        console.log("Stored Verifier từ localStorage:", storedVerifier);
        console.log("Referrer:", referrer);
        console.log("URL hiện tại:", window.location.href);

        // Kiểm tra verifier tạm thời
        if (!storedVerifier || storedVerifier !== verifier) {
            codeDisplay.style.display = "block";
            codeDisplay.textContent = "Access Denied: Verifier không hợp lệ hoặc không tồn tại!";
            console.log("Verifier không khớp hoặc không tồn tại trong localStorage!");
            return;
        }

        // Kiểm tra link vào web
        if (referrer && !referrer.includes("linkvertise.com")) {
            codeDisplay.style.display = "block";
            codeDisplay.textContent = "Access Denied: Nguồn không hợp lệ!";
            console.log("Referrer không từ Linkvertise!");
            return;
        }

        // Gửi request đến bot
        codeDisplay.style.display = "block";
        codeDisplay.textContent = "Đang lấy code, vui lòng chờ...";

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
            console.log("Response từ bot:", data);

            if (data.code) {
                localStorage.removeItem("tempVerifier"); // Xóa verifier tạm sau khi lấy code
                codeDisplay.textContent = `Code của bạn: ${data.code}\nDùng lệnh "?redeem ${data.code}" hoặc "/redeem ${data.code}" trong Discord để nhận role!\nCode sẽ hết hạn sau 5 phút.\nHiện có ${data.key_count} key đang hoạt động.`;
            } else {
                codeDisplay.textContent = `Lỗi từ bot: ${data.error}`;
            }
        } catch (error) {
            codeDisplay.textContent = "Lỗi kết nối bot, kiểm tra host!";
            console.error("Fetch error:", error);
        }
    };
})();
