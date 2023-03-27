const passwordOutput = document.querySelector("[data-password]"),
copyBtn = document.querySelector("[data-copy]"),
overline = document.querySelector("[data-overline]"),
passwordStatus = document.querySelector("[data-password-status]"),
passwordLength = document.querySelector("[data-password-length]"),
passwordRange = document.querySelector("[data-password-range]"),
checkboxInputs = document.querySelectorAll("[data-input]"),
generateBtn = document.querySelector("[data-generateBtn]");

// will make random password from these inputs
const inputs = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    spacialchar: "!@#$%^&**/+"
};

// updating password length value
passwordRange.addEventListener("input", (e) => {
    let passwordLengthValue = e.target.value;
    passwordLength.textContent = passwordLengthValue;
});

// generating random password
const generateRandomPassword = () => {

    let passwordInputs = "";

    // looping checkbox and checking the checked input and storing its input
    checkboxInputs.forEach((input) => {
        if(input.checked){
            passwordInputs += inputs[input.name];
        }
    });

    generatingPassword(passwordInputs);
    updatePasswordStrength();
}

const generatingPassword = (rawPassword) => {
    // incase user not select any checkbox then we show him alert
    if(rawPassword === ""){
        alert("please select atleast on checkbox");
        return;
    }

    // getting password length from range value
    let passLength = passwordRange.value;
    let randomPassword = "";

    // looping and generating a random password
    for(let i = 0; i < passLength; i++){
        const randomIndex = Math.floor(Math.random() * rawPassword.length);
        randomPassword += rawPassword[randomIndex];
    }

    passwordOutput.value = randomPassword;
}

// upading password strength indicator according to password length and changing color in 3 breakpoints
const updatePasswordStrength = () => {
    let passLength = passwordRange.value,
    passwordlengthPercent = (passLength / 30) * 100;
    overline.style.width = passwordlengthPercent + "%";
    
    if(passLength <= 10){
        passwordStatus.textContent = "Weak";
        passwordStatus.style.color = "hsl(3, 61%, 51%)";
        overline.style.backgroundColor = "hsl(3, 61%, 51%)";
    } else if(passLength <= 20) {
        passwordStatus.textContent = "Medium";
        passwordStatus.style.color = "hsl(34, 92%, 58%)";
        overline.style.backgroundColor = "hsl(34, 92%, 58%)";
    } else if(passLength <= 30) {
        passwordStatus.textContent = "Strong";
        passwordStatus.style.color = "hsl(121, 65%, 60%)";
        overline.style.backgroundColor = "hsl(121, 65%, 60%)";
    }
}

// copying password on click of copy icon
copyBtn.addEventListener("click", () => {
    const password = passwordOutput.value;
    //copying in clipboard
    navigator.clipboard.writeText(password);

    // adding active class
    const copyAnimation = document.querySelector(".copy");
    copyAnimation.classList.add("active");

    // removing active class after 1 second
    setTimeout(() => {
        copyAnimation.classList.remove("active");
    }, 1000)
});

generateBtn.addEventListener("click", generateRandomPassword);
window.addEventListener("DOMContentLoaded", generateRandomPassword);
window.addEventListener("DOMContentLoaded", updatePasswordStrength);