import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const printCurrentWindow = async (imageRef) => {
  try {
    if (imageRef.current) {
      const dataURL = await htmlToImage.toPng(imageRef.current);
      const img = new Image();
      img.onload = () => {
        window.print();
      };
      img.src = dataURL;
    }
  } catch (e) {
    console.error("Error printing image", e);
  }
};

const printGivenHtml = async (imageRef) => {
  try {
    if (imageRef.current) {
      const dataURL = await htmlToImage.toPng(imageRef.current);
      const img = new Image();
      img.src = dataURL;
      const windowContent = `<img src="${dataURL}" />`;
      const newWindow = window.open("", "_blank");
      newWindow.document.open();
      newWindow.document.write(windowContent);
      newWindow.document.close();
      newWindow.print();
    }
  } catch (e) {
    console.error("Error printing image", e);
  }
};
const downloadPNG = async (imageRef) => {
  try {
    if (imageRef.current) {
      const dataURL = await htmlToImage.toPng(imageRef.current);
      const fileName = "generated-image.png";
      download(dataURL, fileName);
    }
  } catch (e) {
    console.error("Error generating image", e);
  }
};

export { printCurrentWindow, printGivenHtml, downloadPNG };
