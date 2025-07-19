const config = {
    plugins: {
        "@tailwindcss/postcss":             {},
        // fallback colors for older browsers
        // check https://github.com/tailwindlabs/tailwindcss/discussions/16392
        "@csstools/postcss-oklab-function": { "preserve": true },
    },
};

export default config;
