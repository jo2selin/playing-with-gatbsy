const path = require("path")

// Generating all Tags page
const createListArticlesByTagPage = (createPage, products) => {
  const tagIndexTemplate = path.resolve(
    "src/templates/template-listArticlesByTag.js"
  )
  const allProducts = {}

  products.map(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.map(tag => {
        if (!allProducts[tag]) {
          // Unknow tag, creating new Tag array
          allProducts[tag] = []
        }
        // push to corresponding Tag array
        allProducts[tag].push(node)
      })
    }
  })

  // get Unique tags from Allproducts
  const tags = Object.keys(allProducts)
  tags.map((tag, index) => {
    const products = allProducts[tag]
    createPage({
      path: `/tags/${tag}`,
      component: tagIndexTemplate,
      context: {
        products,
        tag,
      },
    })
  })
}

// Generating Product Page

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve("src/templates/template-article.js")

  return graphql(`
    query frontmatterQuery {
      getMarkdown: allMarkdownRemark {
        edges {
          node {
            html
            id
            fileAbsolutePath
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
    // console.log("res")
    // console.log(res.data.getMarkdown)
    const products = res.data.getMarkdown.edges

    createListArticlesByTagPage(createPage, products)

    products.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
