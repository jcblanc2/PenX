// format the texte
export function formatText(inputText) {
    const maxLength = 188;

    inputText = removeHtmlTags(inputText);
    if (inputText.length > maxLength) {
        return inputText.substring(0, maxLength - 3) + '...';
    }

    return inputText;
}

// format the date
export function formatDate(inputDate) {
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
}

// remove all html tags 
export const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

// Compute the time interval to read the contents
export function calculateReadingTime(article) {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 200;

    // Counting the number of words in the article
    const wordCount = article.split(/\s+/).length;

    // Calculating the reading time in minutes
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    return `${readingTimeMinutes} min read`;
}

// Generate colors
export function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#FFFFFF'); // Avoid white

    return color;
}