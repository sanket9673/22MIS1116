import { Log } from "./logger";

const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

export async function getTopNotifications(
    notifications,
    limit = 10
) {
    await Log(
        "frontend",
        "info",
        "utils",
        "Priority calculation started"
    );

    const sorted = notifications.sort((a, b) => {
        const weightDiff =
            weights[b.Type] - weights[a.Type];

        if (weightDiff !== 0) {
            return weightDiff;
        }

        return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
        );
    });

    await Log(
        "frontend",
        "info",
        "utils",
        "Priority calculation completed"
    );

    return sorted.slice(0, limit);
}