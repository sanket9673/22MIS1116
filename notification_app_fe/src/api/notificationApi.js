import axios from "axios";

const BASE_URL = "/api/notifications";

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5rZXRraXNhbi5jaGF2aGFuMjAyMkB2aXRzdHVkZW50LmFjLmluIiwiZXhwIjoxNzc4OTMzNTU1LCJpYXQiOjE3Nzg5MzI2NTUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI1MTM2MDQ2Yi05MGM3LTQ2YjYtOTA3MC1mZDYwMzdjNzVhYWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYW5rZXQga2lzYW4gY2hhdmhhbiIsInN1YiI6IjRhYzYxNzExLWEwYjUtNGE3NC05NmE2LWY0MzhlNzQ1NzcxMSJ9LCJlbWFpbCI6InNhbmtldGtpc2FuLmNoYXZoYW4yMDIyQHZpdHN0dWRlbnQuYWMuaW4iLCJuYW1lIjoic2Fua2V0IGtpc2FuIGNoYXZoYW4iLCJyb2xsTm8iOiIyMm1pczExMTYiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI0YWM2MTcxMS1hMGI1LTRhNzQtOTZhNi1mNDM4ZTc0NTc3MTEiLCJjbGllbnRTZWNyZXQiOiJqVm5qanJjdWFxQ0RrQUJKIn0.LDFfaIcynThujEX6n9VCI5HenZX_gbeqp9TOrW31tT0";

export async function fetchNotifications() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (Array.isArray(response.data)) {
            return response.data;
        }

        if (response.data && Array.isArray(response.data.notifications)) {
            return response.data.notifications;
        }

        return [];
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please provide a new token.");
        }
        return [];
    }
}