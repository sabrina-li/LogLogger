const presets = [
    [
        "@babel/preset-react",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage",
        },
    ],
];

module.exports = { presets };

// npx babel --watch public/jsx --out-dir public/js --presets @babel/preset-react