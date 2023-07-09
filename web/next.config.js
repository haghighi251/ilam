// const nextConfig = {
//    reactStrictMode: true,
//    // add the following snippet
//    compiler: {
//       styledComponents: true,
//    },
//    experimental: {
//       serverActions: true,
//       serverComponents: true,
//       topLevelAwait: true,
//       serverComponentsExternalPackages: ['mongoose'],
//    },
// };

// module.exports = nextConfig;
// module.exports = {
//    webpack: (config) => {
//       // this will override the experiments
//       config.experiments = { ...config.experiments, topLevelAwait: true };
//       // this will just update topLevelAwait property of config.experiments
//       // config.experiments.topLevelAwait = true
//       return config;
//    },
// };

const nextConfig = {
   reactStrictMode: true,
   compiler: {
      styledComponents: true,
   },
   experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['mongoose'],
   },
};

module.exports = nextConfig;
