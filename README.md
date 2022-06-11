[![Netlify Status](https://api.netlify.com/api/v1/badges/222f965c-0bcc-4cde-89fd-5742f88a5605/deploy-status)](https://app.netlify.com/sites/neanmi/deploys)

# Eleventy + Netlify CMS project template

## Structure

- [eleventy](eleventy/) - files that modify the 11ty behaviour (filters, shortcodes, passthroughs)
  - [passthrough.js](eleventy/passthrough.js) - list of files 11ty will pass through to the compiled output
  - [filter](eleventy/filter/) - 11ty filters
    - [date.js](eleventy/filter/date.js) - filters to format dates and times
  - [shortcode](eleventy/shortcode/) - 11ty shortcodes
    - [nodeEnv.js](eleventy/shortcode/nodeEnv.js) - shortcode to determine if production or dev environment
    - [paired](eleventy/shortcode/paired/)
      - [markdown.js](eleventy/shortcode/paired/markdown.js) - paired shortcode that renders markdown
- [src](src/) - source of the website
  - [\_data](src/_data/) - [global data files](https://www.11ty.dev/docs/data-global/)
  - [\_includes](src/_includes/) - [layouts](https://www.11ty.dev/docs/layouts/) directory
  - [admin](src/admin/) - assets and config for [netlify-cms](https://www.netlifycms.org/)
  - [assets](src/assets/) - css and js assets for the site
- [uploads](uploads/) - directory where uploads will be stored

## Planned Features

- auto compile and minify css and javascript
- move meta data to cms
