import axios from "axios";
export const dynamic = "force-dynamic";
export const singleUpload = async (image: File) => {
  const data = await getUrl();
  console.log({ data });
  const body = new FormData();
  body.append("file", image, image.name);
  const response = await axios.post(data.data.result.uploadURL, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log({ response });
  return `${IMAGE_URL}/${response.data.result.id}/base`;
};

export const getUrl = async () => {
  const link = await axios.get("/api/fetchimageurl");
  console.log({ link });
  return link;
};
export const IMAGE_URL = "https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A";
