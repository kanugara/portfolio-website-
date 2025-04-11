document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rock", "paper", "scissors"];
    const buttons = document.querySelectorAll(".choice");
    const userChoiceSpan = document.querySelector("#user-choice span");
    const computerChoiceSpan = document.querySelector("#computer-choice span");
    const resultSpan = document.querySelector("#result span");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const userChoice = button.dataset.choice;
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = getResult(userChoice, computerChoice);

            // Update the UI
            userChoiceSpan.textContent = userChoice;
            computerChoiceSpan.textContent = computerChoice;
            resultSpan.textContent = result;
        });
    });

    function getResult(user, computer) {
        if (user === computer) {
            return "It's a tie!";
        }
        if (
            (user === "rock" && computer === "scissors") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissors" && computer === "paper")
        ) {
            return "You win!";
        }
        return "You lose!";
    }
});