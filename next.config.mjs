/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	env: {
		DATABASE_URL: "postgresql://commerce_owner:lxMBtqrZ3yC5@ep-dark-salad-a1wn834t.ap-southeast-1.aws.neon.tech/commerce?sslmode=require"
	}
};

export default nextConfig;
