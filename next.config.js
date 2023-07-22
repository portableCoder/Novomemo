/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    basePath: '/Novomemo',
    assetPrefix: '/Novomemo',
    distDir: 'dist'
}


module.exports = nextConfig
