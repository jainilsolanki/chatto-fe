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

    // used for removing logs in staging and keeping logs in dev
    compiler: {
        removeConsole:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "staging" ? { exclude: ["error"] } : false,
    },

};

module.exports = withPWA(nextConfig)
