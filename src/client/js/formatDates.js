export function formatDate(dateObject) {
    const parts = {
        year: dateObject.getFullYear(),
        month: dateObject.getMonth() + 1,
        day: dateObject.getDate(),
    };

    return `${parts.year}-${parts.month}-${parts.day}`;
}