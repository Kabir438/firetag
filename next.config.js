/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    MONGO_URI: "mongodb+srv://kabir:r9!a-QwbnDQfgDD@main.jdrxb.mongodb.net/gov-project?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
