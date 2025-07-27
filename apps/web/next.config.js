/** @type {import('next').NextConfig} */
const nextConfig = {
    // this removes the types safty and i have added it 
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
