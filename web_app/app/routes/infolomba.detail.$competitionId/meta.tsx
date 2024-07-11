import { MetaFunction } from "@remix-run/react";
import { loader } from "./loader";

export const meta: MetaFunction<typeof loader> = (data) => {
  return [
    { title: data.data?.name },
    {
      name: data.data?.name + "oleh" + data.data?.organizer,
      content:
        data.data?.description +
        "deadline" +
        data.data?.deadlineSTR +
        "kategori" +
        data.data?.category.join(", "),
    },
  ];
};
