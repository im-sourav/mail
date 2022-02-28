// varivales ------------------------------------
const gmail = document.getElementById("gmail");
const message = document.getElementById("message");
const subject = document.getElementById("subject");
const content = document.getElementById("content");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const add = document.getElementById("add");
const countV = document.querySelector("#count p");
let Doc = [];
let delay = 1; // in second
let startIs = false;
let count = 0;

// functions -----------------------------------
const addDoc = (Mail, Message, Subject) => {
    content.innerHTML += `
        <div class="split">
            <div class="delete">Delete</div>
            <div class="mail">Mail: ${Mail}</div>
            <div class="message">Message: ${Message}</div>
            <div class="subject">Subject: ${Subject}</div>
        </div>`;
};
const sendMail = (Mail, Subject, Message) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "wwwapp.cloud@gmail.com",
        Password: "hsxjslabrswetlht",
        From: "wwwapp.cloud@gmail.com",
        To: Mail,
        Subject: Subject,
        Body: Message,
    }).then((e) => {
        console.log(e);
    });
};
const clear = () => {
    Doc = [];
    content.innerHTML = "";
    count = 0;
    countV.innerHTML = count;
};
const chackOneMail = (Mail) => {
    for (let i = 0; i < Doc.length; i++) {
        if (Doc[i].mail == Mail) return 0;
    }
    return 1;
}
const deleteBtnEvent = () => {
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((e, i) => {
        e.addEventListener("click", () => {
            const x = document.querySelectorAll(".split")[i];
            x.style.height = 0;
            setTimeout(() => {
                deleteElemene(i)
            }, 300)
        })
    })
}
const deleteElemene = (index) => {
    Doc.splice(index, 1);
    content.innerHTML = "";
    Doc.forEach(e => {
        addDoc(e.mail, e.message)
    })
    deleteBtnEvent();
}
const loop = () => {
    if(startIs){
        setTimeout(() => {
            loop();
            countV.innerHTML = count;
            count++;
            Doc.forEach(e => {
                console.log(e.mail)
                sendMail(e.mail, e.subject, e.message);
            })
        }, 1000 * delay);
    }
}
// event listener ---------------------
add.addEventListener("click", () => {
    let ml = gmail.value;
    let mes = message.value;
    let sub = subject.value;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ml)) || !chackOneMail(ml)) return;

    addDoc(ml, mes, sub);
    Doc.push({
        mail: ml,
        subject: sub,
        message: mes
    })
    deleteBtnEvent();
});

start.addEventListener("click", () => {
    if(!Doc.length) return;
    startIs = true;
    loop();
})
stop.addEventListener("click", () => {
    startIs = false;
})
reset.addEventListener("click", () => {
    clear();
})



