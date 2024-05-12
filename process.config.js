module.exports = {
    apps: [
        {
            name: "ZIVO",
            cwd: "./",
            script: "./server.js",
            watch: false,
            env_production: {
                NODE_ENV: "procution",
            },
            env_development: {
                NODE_ENV: "development",
            },
            instances: 1,
            exec_mode: "cluster"
        },
    ],
};
