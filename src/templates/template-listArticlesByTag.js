import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductCardComponent from "../components/productCard"

const templateListArticlesByTag = ({ data, pageContext }) => {
  const products = pageContext.products

  // console.log(data)
  // console.log(pageContext)

  products.forEach(product => {
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
      <SEO
        title={`Opinel recherche ${pageContext.tag}`}
        keywords={["opinel", "recherche"]}
      />
      <section className="section">
        <div className="container">
          <h1 className="title">
            <div className="control">
              <div className="tags has-addons">
                <span className="tag  is-large is-dark">Les Opinels</span>
                <span className="tag  is-large">{pageContext.tag}</span>
              </div>
            </div>
          </h1>
          <div className="columns is-multiline">
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
