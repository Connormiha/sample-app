module.exports = {
    plugins: [
        require('postcss-custom-properties'),
        require('postcss-nested'),
        require('postcss-each')({
            plugins: {
                beforeEach: [
                    require('postcss-nested')
                ]
            }
        }),
        require('autoprefixer')({
            browsers: ['Chrome 72', 'Firefox 65', 'Safari 11', 'ie 11']
        })
    ]
}
