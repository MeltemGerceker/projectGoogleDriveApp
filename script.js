const gLink = document.querySelector("#glink");
const btn = document.querySelector("#btn");
const downloadLink = document.querySelector("#download-link");
const embedAudio = document.querySelector("#embed-audio");
const embedVideo = document.querySelector("#embed-video");
const copyBtn = document.querySelector(".copy");
const copyAudioBtn = document.querySelector(".copy-audio");
const copyVideoBtn = document.querySelector(".copy-video");

const copyText = (target) => {
    var textToCopy = target.value;

    if (!navigator.clipboard) { // the old way
        document.execCommand("copy");
    } else {
        navigator.clipboard.writeText(textToCopy)
        .then(
            function() {
                alert("Link is copied to clipboard"); // success 
            })
        .catch(
            function() {
                alert("err"); // error
            });
    }
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const gLinkValue = gLink.value;

    if (gLinkValue.includes("https://drive.google.com/file/d/")) {

        // 1. Generate direct download link
        downloadLink.value = gLinkValue.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=download&id=")
                                       .replace("/view?usp=sharing", "");
        // 2. Generate embed audio tag
        embedAudio.value = `<audio width="300" height="32" controls="controls" src="${downloadLink.value}" type="audio/mp3></audio>`;

        // 3. Generate embed video/doc tag
        const videoLink = gLinkValue.replace("/view?usp=sharing", "");
        embedVideo.value = `<iframe src="${videoLink}" width="560" height="315"></iframe>`;
    } else {
        alert("Please enter a Google Drive file link.");
    }
});

copyBtn.addEventListener("click", (e) => {
    if (downloadLink.value == "") {
        alert("Please generate a download link.");
    } else {
        downloadLink.select();
        return copyText(downloadLink);
    }
});

copyAudioBtn.addEventListener("click", (e) => {
    if (downloadLink.value == "") {
        alert("Please generate a download link.");
    } else {
        downloadLink.select();
        return copyText(embedAudio);
    }
});

copyVideoBtn.addEventListener("click", (e) => {
    if (downloadLink.value == "") {
        alert("Please generate a download link.");
    } else {
        downloadLink.select();
        return copyText(embedVideo);
    }
});

