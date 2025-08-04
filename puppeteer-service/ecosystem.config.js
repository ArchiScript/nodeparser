module.exports = {
  apps: [
    {
      name: "scrapper",
      script: "./index.js",
      exec_mode: "cluster",
      instances: "max", // Utilizes all available CPU cores
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production"
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/log/pm2/scrapper-error.log",
      out_file: "/var/log/pm2/scrapper-out.log",
      merge_logs: true
    },
    {
      name: "deploy-webhook",
      script: "./deploy/deploy-webhook.js",
      exec_mode: "fork", // webhook usually does not need cluster mode
      instances: 1,
      watch: false,
      max_memory_restart: "150M",
      env: {
        NODE_ENV: "production"
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/log/pm2/deploy-webhook-error.log",
      out_file: "/var/log/pm2/deploy-webhook-out.log",
      merge_logs: true
    }
  ]
};
