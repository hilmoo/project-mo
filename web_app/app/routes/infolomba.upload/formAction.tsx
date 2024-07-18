import axios from "axios";

import { CompetitionForm } from "~/types/infolomba";

export async function handleForm(
  data: CompetitionForm,
  endpoint: string,
  captcha_key: string,
) {
  console.log(data.image);
  const form = new FormData();
  form.append(
    "data",
    JSON.stringify({
      name: data.name,
      description: data.description,
      organizer: data.organizer,
      url: data.url,
      category: data.category,
      deadline: data.deadline,
    }),
  );
  form.append("captcha", captcha_key);
  if (data.image && data.image.length > 0) {
    form.append("image", data.image[0]);
  }
  if (data.img_url && data.img_url.trim().length > 0) {
    form.append("img_url", data.img_url);
  }

  try {
    const response = await axios.post(`${endpoint}infolomba/upload`, form, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
