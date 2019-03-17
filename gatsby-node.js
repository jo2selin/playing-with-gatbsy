const path = require("path")

// Generating all Tags page
const createTagsPage = (createPage, products) => {
  const tagIndexTemplate = path.resolve("src/templates/template-tag.js")
  const allTags = {}

  products.map(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.map(tag => {
        if (!allTags[tag]) {
          // Unknow tag, creating new Tag array
          allTags[tag] = []
        }
        // push to corresponding Tag array
        allTags[tag].push(node)
      })
    }
  })
  console.log(allTags)
}

// Generating Product Page

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve("src/templates/template-article.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              title
              path
              date
              subtitle
              type
              category
              tags
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    const products = res.data.allMarkdownRemark.edges

    createTagsPage(createPage, products)

    products.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
