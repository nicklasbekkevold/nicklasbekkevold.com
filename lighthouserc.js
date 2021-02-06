module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assertions: {
      'categories:performance': ['error', { minScore: 0.9 }],
      'categories:accessibility': ['error', { minScore: 0.9 }],
      'categories:seo': ['warn', { minScore: 0.9 }],
    },
  },
};
