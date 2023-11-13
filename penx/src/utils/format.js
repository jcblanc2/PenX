export function formatText(inputText) {
    const maxLength = 188;

    if (inputText.length > maxLength) {
        return inputText.substring(0, maxLength - 3) + '...';
    }

    return inputText;
}

export function formatDate(inputDate) {
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
}

export const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return formatText(doc.body.textContent || "");
};
