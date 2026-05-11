const nextConfig = {
  transpilePackages: ["@mirasly/contracts", "@mirasly/i18n", "@mirasly/ui", "@mirasly/db"],
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
