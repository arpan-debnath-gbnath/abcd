let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let textspeak = new SpeechSynthesisUtterance(text);
    textspeak.rate = 1;
    textspeak.pitch = 1;
    textspeak.volume = 1;
  // textspeak.lang = "hi-gb";
    window.speechSynthesis.speak(textspeak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);
    if (hours >= 0 && hours < 12) {
        speak("Good morning, sir or mam ..... How can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon, sir or mam.... How can I help you?");
    } else {
        speak("Good evening, sir or mam.... How can I help you?");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, sir. What can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Arpan.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(`Today is ${date}`);
    } else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
