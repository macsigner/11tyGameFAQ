const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-toc');
const util = require('util');

module.exports = function(eleventyConfig) {
    // Add console
    eleventyConfig.addFilter('console', function(value) {
        const str = util.inspect(value);
        console.log(str);
    });
    eleventyConfig.addPlugin(pluginTOC);
    // Disable ignoring files to keep walkthrough content seperate
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.setLibrary(
        'md',
        markdownIt().use(markdownItAnchor)
    )
    eleventyConfig.addPassthroughCopy('./src/assets/');
    eleventyConfig.addPassthroughCopy({
        './node_modules/prismjs/themes/prism.css': '/assets/css/prism.css',
    });

    return {
        dir: {
            input: 'src',
            output: 'public',
        }
    }
}
