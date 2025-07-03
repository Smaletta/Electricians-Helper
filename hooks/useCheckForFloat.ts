// Function to check if text input field has any number and fill with 0 if it doesn't.
export default function useCheckForFloat(string: string) {
    if (isNaN(parseFloat(string))) {
        return "";
    } else if (string.includes('.')) {
        return (string);
    } else {
        return (string);
    }
}