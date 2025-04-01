import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
  images: {
    domains: ["cloud.appwrite.io"],
  },
};

export default nextConfig;
