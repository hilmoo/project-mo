import { MetaFunction } from "@remix-run/react";
import { loader } from "./loader";

export const meta: MetaFunction<typeof loader> = (data) => {
  return [
    { title: `${data.data?.name} | Mo` },
    { property: "description", content: `deadline: ${data.data?.deadline}` },
    {
      property: "og:title",
      content: `${data.data?.name} | Infolomba Mo`,
    },
    {
      property: "og:type",
      content: "information",
    },
    {
      property: "og:image",
      content: data.data?.image,
    },
    {
      property: "og:image:width",
      content: "700",
    },
    {
      property: "og:url",
      content: `https://hilmo.my.id/infolomba/detail/${data.data?.id}`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:description",
      content: `deadline: ${data.data?.deadline}`,
    },
    {
      property: "og:site_name",
      content: "Mo",
    },
    {
      name: "twitter:image:alt",
      content: data.data?.name,
    },
  ];
};
