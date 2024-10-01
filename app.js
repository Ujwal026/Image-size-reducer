const uploadBox = document.querySelector(".upload-box"),
      previewImg = uploadBox.querySelector("img"),
      fileInput = uploadBox.querySelector("input[type='file']"),
      widthInput = document.querySelector("#width"),
      heightInput = document.querySelector("#height"),
      ratioInput = document.querySelector("#ratio"),
      qualityInput = document.querySelector("#quality"),
      downloadBtn = document.querySelector(".download-btn"); // Fixed selector

let ogImageRatio; 

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

heightInput.addEventListener("keyup", () => {
    const height = parseFloat(heightInput.value);
    const width = ratioInput.checked ? height * ogImageRatio : parseFloat(widthInput.value);
    widthInput.value = isNaN(width) ? "" : Math.floor(width);
});

widthInput.addEventListener("keyup", () => {
    const width = parseFloat(widthInput.value);
    const height = ratioInput.checked ? width / ogImageRatio : parseFloat(heightInput.value);
    heightInput.value = isNaN(height) ? "" : Math.floor(height);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas"); // Fixed method name
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = parseFloat(widthInput.value);
    canvas.height = parseFloat(heightInput.value);

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime() + ".jpg"; // Added file extension
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
