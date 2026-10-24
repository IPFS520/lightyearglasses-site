module.exports = {
  apps: [
    {
      name: "lightyear-site",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/var/www/lightyear-site",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "localhost",
      },
      error_file: "/var/log/lightyear-site-error.log",
      out_file: "/var/log/lightyear-site-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
