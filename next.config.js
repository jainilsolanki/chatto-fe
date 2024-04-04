const withPWA = require('next-pwa')({
    dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // used during port forwarding
    // experimental: {
    //     serverActions: {
    //         allowedOrigins: ["https://6n3kq20k-3000.inc1.devtunnels.ms", "localhost:3000"]
    //     }
    // }

};

module.exports = withPWA(nextConfig)