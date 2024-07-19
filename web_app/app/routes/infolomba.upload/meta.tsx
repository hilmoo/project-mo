import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Upload Lomba" },
    {
      property: "description",
      content: "Upload lombamu disini, dan bantu orang lain menemukan lombamu",
    },
    {
      property: "og:title",
      content: `Upload Lomba`,
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
      content: `https://hilmo.my.id/infolomba/upload`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:description",
      content: `Upload lombamu disini, dan bantu orang lain menemukan lombamu`,
    },
    {
      property: "og:site_name",
      content: "Mo",
    },
  ];
};
