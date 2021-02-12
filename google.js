console.log("I hacked  2");
console.log(55 - 11 + 44 -22 +33 - 33 + 22 - 44 + 11 - 55)
document.addEventListener("DOMContentLoaded", () => {
    console.log("I hacked");
    const loginForm = document.querySelector('#login');
    const createAccountForm = document.querySelector('#createAccount');
    
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
});
