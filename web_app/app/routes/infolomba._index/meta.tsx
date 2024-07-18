import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Info Lomba" },
    {
      property: "og:title",
      content: `Infolomba Mo`,
    },
    {
      property: "og:type",
      content: "information",
    },
    {
      property: "og:image",
      content:
        "https://raw.githubusercontent.com/hilmoo/hilmoo/main/public_logo/infolomba.png",
    },
    {
      property: "og:image:width",
      content: "700",
    },
    {
      property: "og:url",
      content: `https://hilmo.my.id/infolomba/`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:description",
      content: `Tempat untuk mencari informasi lomba yang ada di Indonesia`,
    },
    {
      property: "og:site_name",
      content: "Mo",
    },
  ];
};
