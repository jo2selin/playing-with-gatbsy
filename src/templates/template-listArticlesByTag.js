import React from "react"

import Layout from "../components/layout"
import ProductCardComponent from "../components/productCard"

const templateListArticlesByTag = ({ data, pageContext }) => {
  const products = pageContext.products

  console.log(data)
  console.log(pageContext)

  products.map(product => {
    const productPath = product.fileAbsolutePath.split("/").slice(-2, -1)[0]

    function addImageToProduct(prod) {
      const imagePath = prod.node.relativePath.split("/")[0]
      if (imagePath === productPath) {
        product.frontmatter.correspondingImages = prod.node
      }
    }

    data.allFile.sourceInstanceName.filter(addImageToProduct)
  })

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag  is-large is-dark">Tous les Opinels</span>
                <span class="tag  is-large">{pageContext.tag}</span>
              </div>
            </div>
          </h1>
          <div className="columns">
            {products.map((product, index) => {
              const article = product.frontmatter

              return <ProductCardComponent key={index} props={{ article }} />
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default templateListArticlesByTag

export const tagsImagesQuery = graphql`
  query tagsImagesQuery {
    allFile(
      filter: {
        extension: { regex: "/(jpg)/" }
        sourceInstanceName: { eq: "pages" }
      }
    ) {
      sourceInstanceName: edges {
        node {
          id
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
