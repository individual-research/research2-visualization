module.exports = {
  apps: [
    {
      name: 'ResearchServer',
      exec_mode: 'cluster',
      instances: 'max',
      script: './dist/index.js',
      env: {
        PORT: '8081',
      },
    },
  ],
};
