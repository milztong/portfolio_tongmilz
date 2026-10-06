import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tongmilz.com";
  const routes = [
    "",
    "/en",
    "/about",
    "/projects",
    "/projects/Jinodo",
    "/projects/StockPrediction",
    "/projects/GenerativeAI",
    "/projects/Fitnessapp",
    "/projects/VR_Swingman",
    "/projects/Praktikumsformular",
    "/work",
    "/work/Datev",
    "/work/Kontron",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/en" ? "monthly" : "yearly",
    priority: route === "" || route === "/en" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));
}
