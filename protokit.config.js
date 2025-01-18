module.exports = {
    network: 'testnet',
    zkSnark: {
      curve: 'bn128',
      circuitsPath: './contracts',
    },
    build: {
      outDir: './build',
      optimizationLevel: 2,
    },
    deployment: {
      contracts: './contracts',
      networkConfig: './network.json',
    },
  };