//we need a function to ensure an input box is not empty
const validInput = (input) => {
    if (input === '') {
        return false;
    } else {
        return true;
    }
}

export default validInput;