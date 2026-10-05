import ImageKit from "imagekit";
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || "";
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "";
export const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint: urlEndpoint.startsWith("http")
    ? urlEndpoint
    : `https://${urlEndpoint}`,
});
export async function uploadToImageKit(
  file,
  fileName,
  folder = "gatexpay_blog"
) {
  const base64File = Buffer.isBuffer(file) ? file.toString("base64") : file;
  const res = await imagekit.upload({
    file: base64File,
    fileName,
    folder: `GATEXPAY_IMAGES/${folder}`,
  });
  return {
    url: res.url,
    fileId: res.fileId,
    name: res.name,
  };
}
