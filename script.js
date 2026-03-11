const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const clearBtn = document.getElementById("clear");
const lengthInput = document.getElementById("length");
const strengthText = document.getElementById("strength");
const uppercase = document.getElementById("uppercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");

const reqLetters = document.getElementById("reqLetters");
const reqNumbers = document.getElementById("reqNumbers");
const reqSymbols = document.getElementById("reqSymbols");

const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+";

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let requiredLetters = reqLetters.value;
    let requiredNumbers = reqNumbers.value;
    let requiredSymbols = reqSymbols.value;

    // VALIDATION
    if (requiredNumbers.length > 0 && !includeNumbers.checked) {
        alert("You entered required numbers but 'Include Numbers' is not selected.");
        return;
    }

    if (requiredSymbols.length > 0 && !includeSymbols.checked) {
        alert("You entered required symbols but 'Include Symbols' is not selected.");
        return;
    }

    let required = requiredLetters + requiredNumbers + requiredSymbols;

    let length = parseInt(lengthInput.value);

    if (required.length > length) {

        let confirmTrim = confirm(
            "Required characters exceed password length. Trim them?"
        );

        if (!confirmTrim) return;

        required = required.substring(0, length);

    }

    // CHARACTER POOL
    let chars = lowerChars;

    if (uppercase.checked) chars += upperChars;
    if (includeNumbers.checked) chars += numberChars;
    if (includeSymbols.checked) chars += symbolChars;

    // GENERATE PASSWORD
    let remaining = length - required.length;

    let password = required;

    for (let i = 0; i < remaining; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    // SHUFFLE PASSWORD
    password = shuffle(password);

    passwordBox.value = password;
    checkStrength(password);
}

function shuffle(str) {
    return str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

function checkStrength(password){

let strength = "Weak";

if(password.length >= 12 &&
uppercase.checked &&
includeNumbers.checked &&
includeSymbols.checked){
strength = "Strong";
}
else if(password.length >= 8){
strength = "Medium";
}

strengthText.textContent = "Strength: " + strength;

}

copyBtn.addEventListener("click", () => {

if(passwordBox.value === ""){
alert("Generate a password first.");
return;
}

navigator.clipboard.writeText(passwordBox.value);

copyBtn.textContent = "Copied!";

setTimeout(()=>{
copyBtn.textContent = "Copy";
},1500);

});

clearBtn.addEventListener("click", () => {
    if (confirm("Clear all inputs?")) {
        // clear fields
    }
    passwordBox.value = "";
    reqLetters.value = "";
    reqNumbers.value = "";
    reqSymbols.value = "";

    lengthInput.value = 12;

    uppercase.checked = false;
    includeNumbers.checked = false;
    includeSymbols.checked = false;

});