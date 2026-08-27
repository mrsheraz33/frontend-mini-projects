let promp = document.querySelector("#prompt");
let submit = document.querySelector("#submit");
let chatcontainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let imageinput = document.querySelector("#image input");
let image = document.querySelector("#image img");

const api = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA2jp4LiSuYlqpLAq5yG-23CTpvWkFq6iY";

let user = {
    message: null,
    file: {
        mime_type: null,
        data: null
    }
}

async function generateResponse(aichatbox) {
let text = aichatbox.querySelector(".ai-chat-area")

    let RequestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{
                "parts": [{ "text": user.message }, (user.file.data ? [{ "inline_data": user.file }] : [])]
            }]
        })
    }

    try {
        let response = await fetch(api, RequestOption);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()
        text.innerHTML = apiResponse
        console.log(apiResponse)
    }
    catch (error) {
        console.log("Some Fetching Error Please Wait...")
    }

    finally {
        chatcontainer.scrollTo({ top: chatcontainer.scrollHeight, behavior: "smooth" })
        image.src = `img.svg`
        image.classList.remove("choose")
        user.file = {};
    }

}

function createchatebox(html, classes) {
    let div = document.createElement("div")
    div.innerHTML = html
    div.classList.add(classes)
    return div
}

function handlechatResponse(message) {
    user.message = message;
    let html = ` <img src="image/user.png" alt="" id="userimage" width="8%">
            <div class="user-chat-area">
                ${user.message}
${user.file.data ? `<img src="data:${user.file.mime_type}; base64,${user.file.data}" class ="chooseimg" />` : ""}
            </div>`
    promp.value = '';
    let userchatbox = createchatebox(html, "user-chat-box")
    chatcontainer.appendChild(userchatbox)

    chatcontainer.scrollTo({ top: chatcontainer.scrollHeight, behavior: "smooth" })

    setTimeout(() => {

        let html = `  <img src="image/ai.png" alt="" id="aiimage" width="10%">
            <div class="ai-chat-area">
            <img src="image/gif.gif" alt="" class="load" width="50">
            </div>`
        let aichatbox = createchatebox(html, "ai-chat-box")
        chatcontainer.appendChild(aichatbox)
        generateResponse(aichatbox)
    }, 500);
}

promp.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handlechatResponse(promp.value)
    }
});

submit.addEventListener('click', () => {
    handlechatResponse(promp.value)
})

imageinput.addEventListener("change", () => {
    const file = imageinput.files[0]
    if (!file) return;
    let reader = new FileReader()
    reader.onload = (e) => {
        let base64string = e.target.result.split(",")[1];
        user.file = {
            mime_type: file.type,
            data: base64string
        }
        image.src = `data:${user.file.mime_type}; base64,${user.file.data}`
        image.classList.add("choose")
    }
    reader.readAsDataURL(file);
})

imagebtn.addEventListener('click', () => {
    imagebtn.querySelector("input").click();
});
