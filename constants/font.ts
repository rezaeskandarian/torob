import localFont from "next/font/local";

const iranYekan = localFont({
  src: [
    {
      path: "../public/iranyekanwebregular.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/iranyekanwebregular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/iranyekanwebregular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/iranyekanwebbold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/iranyekanwebbold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/iranyekanwebbold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export { iranYekan };
