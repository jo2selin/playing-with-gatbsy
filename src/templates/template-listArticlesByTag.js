import React from "react"

import Layout from "../components/layout"
import ProductCardComponent from "../components/productCard"

const templateListArticlesByTag = ({ data, pageContext }) => {
  const products = pageContext.products

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
      <div className="columns">
        {products.map((product, index) => {
          const article = product.frontmatter

          return <ProductCardComponent key={index} props={{ article }} />
        })}
      </div>
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
