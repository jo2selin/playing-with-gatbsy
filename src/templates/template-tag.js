import React from "react"
import Layout from "../components/layout"

// import Img from "gatsby-image"

import TagsComponent from "../components/tags"

const templateTag = ({ data, pageContext }) => {
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

          return <TagsComponent key={index} props={{ article }} />
        })}
      </div>
    </Layout>
  )
}

export default templateTag

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
