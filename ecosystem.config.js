module.exports = {
  apps: [
    {
      name: 'code-store-server',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      args: 'run preview'
    }
  ]
}
