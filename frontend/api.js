// 웹 브라우저 테스트 시: http://localhost:8000
// 모바일 기기 테스트 시: http://본인IP:8000
const BASE_URL = "http://127.0.0.1:8000";

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return await response.json();
};

export const chatWithAI = async (message, major) => {
    const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, major }),
    });
    return await response.json();
};