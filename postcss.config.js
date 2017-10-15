module.exports = {
    plugins: {
        "postcss-import": {},
        "postcss-cssnext": {}, //Gives a warning about autoprefixer. Cssnano comes with a autoprefixer but isn't used with preset: default
        "cssnano": {
            preset: "default"
        }
    }
};
