let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice")
let msg = document.querySelector("#msg")
const userscorepara = document.querySelector("#user-score")
const compscorepara = document.querySelector("#comp-score")

const gencompchoice = () => {
    const option = ["rock", "paper", "scissors"]
    const indexid = Math.floor(Math.random() * 3)
    return option[indexid]
}

const draw = () => {
    msg.innerText = "Game was draw play again"
    msg.style.background = "#081b31";
}

const showwiner = (userwin, userchoice, compchoice) => {
    if (userwin) {
        userscore++;
        userscorepara.innerHTML = userscore;
        msg.innerText = `You win! 😊 Your ${userchoice} beats ${compchoice}`
        msg.style.background = "green";
    }
    else {
        compscore++;
        compscorepara.innerHTML = compscore;
        msg.innerText = `You lose 😔 ${compchoice} beats Your ${userchoice}`
        msg.style.background = "red";
    }
}

const playGame = (userchoice) => {
    console.log("User choice", userchoice)
    const compchoice = gencompchoice();
    console.log("compchoice", compchoice)

    if (userchoice === compchoice) {
        draw()
    }
    else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = compchoice === "paper" ? false : true;
        }
        else if (userchoice === "paper") {
            userwin = compchoice === "scissors" ? false : true;
        }
        else {
            userwin = compchoice === "rock" ? false : true;
        }
        showwiner(userwin, userchoice, compchoice);
    }

}

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userchoice = choice.getAttribute("id")
        playGame(userchoice);
    })
})



