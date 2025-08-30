module.exports = {
    apps: [
      {
        name: 'chemitec',
        script: 'dist/main.js',
        // في الشيرد غالبًا خليك على عملية واحدة
        instances: 1,
        exec_mode: 'fork',
        watch: false,
        max_memory_restart: '256M',
        env: {
          NODE_ENV: 'production'
          // متسيّبش PORT هنا لو هتستخدم cPanel Node App
          // PM2 ممكن يديله PORT يدوي لو هتشتغل على بورت ثابت برا Passenger
        }
      }
    ]
  };