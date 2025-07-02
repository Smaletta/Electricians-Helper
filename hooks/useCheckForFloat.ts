// Function to check if text input field has any number and fill with 0 if it doesn't.
export default function useCheckForFloat(string: string) {
    if (isNaN(parseFloat(string))) {
        return 0;
    } else if (string.includes('.')) {
        return Number(parseFloat(string).toFixed(2));
    } else {
        return parseFloat(string);
    }
}