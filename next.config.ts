/**import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here 

  images: {
    domains: ['www.flaticon.com'], // autorise les images venant de flaticon.com
  },
};

export default nextConfig;**/


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.flaticon.com'], // autoriser Flaticon
  },
};

module.exports = nextConfig;

