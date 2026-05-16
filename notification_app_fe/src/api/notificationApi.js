import axios from "axios";
import { Log } from "../utils/logger";

const BASE_URL =
    "http://4.224.186.213/evaluation-service/notifications";

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5rZXRraXNhbi5jaGF2aGFuMjAyMkB2aXRzdHVkZW50LmFjLmluIiwiZXhwIjoxNzc4OTI4MTAzLCJpYXQiOjE3Nzg5MjcyMDMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyMjE5YjcyNy0zZjkwLTRkYWYtOTRjYS1mYmFmNjZjODM5ZGMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYW5rZXQga2lzYW4gY2hhdmhhbiIsInN1YiI6IjRhYzYxNzExLWEwYjUtNGE3NC05NmE2LWY0MzhlNzQ1NzcxMSJ9LCJlbWFpbCI6InNhbmtldGtpc2FuLmNoYXZoYW4yMDIyQHZpdHN0dWRlbnQuYWMuaW4iLCJuYW1lIjoic2Fua2V0IGtpc2FuIGNoYXZoYW4iLCJyb2xsTm8iOiIyMm1pczExMTYiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI0YWM2MTcxMS1hMGI1LTRhNzQtOTZhNi1mNDM4ZTc0NTc3MTEiLCJjbGllbnRTZWNyZXQiOiJqVm5qanJjdWFxQ0RrQUJKIn0.rzZPFI2-BrzKZpl7y6LZVumGPrN2EQTxZ9-ROJTXRGI";

export async function fetchNotifications() {
    try {
        await Log(
            "frontend",
            "info",
            "api",
            "Fetching notifications started"
        );

        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        await Log(
            "frontend",
            "info",
            "api",
            "Notifications fetched successfully"
        );

        return response.data;
    } catch (error) {
        await Log(
            "frontend",
            "error",
            "api",
            error.message
        );

        return { notifications: [] };
    }
}