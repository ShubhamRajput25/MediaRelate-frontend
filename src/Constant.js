export function formatDate(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diff = Math.floor((now - postDate) / 1000); // difference in seconds

    if (diff < 60) {
        return `${diff} second${diff === 1 ? '' : 's'} ago`;
    } else if (diff < 3600) { // less than an hour
        const minutes = Math.floor(diff / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diff < 86400) { // less than a day
        const hours = Math.floor(diff / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diff < 2592000) { // less than a month
        const days = Math.floor(diff / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (diff < 31536000) { // less than a year
        const months = Math.floor(diff / 2592000);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        const years = Math.floor(diff / 31536000);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}