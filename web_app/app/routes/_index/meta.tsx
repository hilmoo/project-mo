import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Mo" },
    {
      property: "og:title",
      content: `Hello dari Mo`,
    },
    {
      property: "og:type",
      content: "information",
    },
    {
      property: "og:image",
      content:
        "https://raw.githubusercontent.com/hilmoo/hilmoo/main/public_logo/logotext.png",
    },
    {
      property: "og:image:width",
      content: "700",
    },
    {
      property: "og:url",
      content: `https://hilmo.my.id/`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:description",
      content: `Jadi gini... ya udah gitu aja`,
    },
    {
      property: "og:site_name",
      content: "Mo",
    },
  ];
};
