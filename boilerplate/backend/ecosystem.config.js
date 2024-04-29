module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/home/apps/backend/package/',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: 6,
      wait_ready: true,
      listen_timeout: 3000,
      kill_timeout: 3000,
      restart_delay: 3000,
      out_file: '~/apps/backend/logs/backend-api.log',
      error_file: '~/apps/backend/logs/backend-api.log',
      merge_logs: true,
      env: {
        NODE_ENV: 'development',
        SERVER_ENV: 'local',
      },
      env_dev: {
        NODE_ENV: 'development',
        SERVER_ENV: 'dev',
      },
      env_real: {
        NODE_ENV: 'production',
        SERVER_ENV: 'real',
      },
    },
  ],
}