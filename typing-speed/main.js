const randomText = document.querySelector("#randomText")
const textInput = document.querySelector("#textInput")
const result = document.querySelector("#result")
const btn = document.querySelector("#btn")

const genrandomvalue = () => {
    let data = [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        "quam facilis possimus tempora minus ut voluptate officiis",
        "Eveniet amet eligendi molestiae eum magni vitae dolores dignissimos",
        "laboriosam dolores, quam facilis possimus tempora minus ut voluptate"
    ]
    let randomNum = Math.floor(Math.random() * data.length)
    return data[randomNum];
}

let startTime;
let endTime;

const myfun = () => {
    let wordlength = textInput.value.split(" ").length;
    let time = new Date();
    endTime = time.getTime();
    let completeTime = Math.round((endTime - startTime) / 1000);
    let speed = Math.floor((wordlength / completeTime) * 60)
    result.innerText = `You write ${wordlength} words in ${completeTime}'s : Your typing speed is ${speed} word per minutes`;
}

btn.addEventListener('click', () => {
    if (btn.innerText == "Start") {
        let time = new Date();
        startTime = time.getTime();
        btn.innerText = "Done";
        textInput.disabled = false;
        textInput.style.background = "#fff"
        let gen = genrandomvalue();
        randomText.innerText = gen;
    }
    else if (btn.innerText == "Done") {
        btn.innerText = "Start";
        textInput.disabled = true;
        textInput.style.background = "rgb(230, 230, 230)"
        myfun();
    }
})

