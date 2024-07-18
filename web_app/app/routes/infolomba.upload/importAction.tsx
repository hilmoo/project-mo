import axios from "axios";

export async function handleGeminiForm(
  url_ig: string,
  endpoint: string,
  captcha: string,
) {
  try {
    const response = await axios.post(
      `${endpoint}infolomba/impor`,
      {
        url_ig,
        captcha,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

// export async function fetchImageIG(url: string) {
//   try {
//     const response = await axios.get(url, { responseType: "blob" });

//     const blob = response.data;
//     const fileName = "temp123";
//     const file = new File([blob], fileName, { type: blob.type });

//     return [file];
//   } catch (error) {
//     console.error("Error fetching the image:", error);
//     return [];
//   }
// }
