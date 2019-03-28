import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { FaAmazon } from "react-icons/fa"

import Layout from "../components/layout"
import ProductTagsComponent from "../components/productTags"

export default function Template({ data }) {
  const article = data.getArticle
  const { title, subtitle, category, type, tags, amazon } = article.frontmatter

  console.log("Article data")
  console.log(data)
  console.log(amazon)

  // matching image article
  const allImages = data.getAllImages.sourceInstanceName
  const productPath = data.getArticle.fileAbsolutePath
    .split("/")
    .slice(-2, -1)[0]

  allImages.filter(prod => {
    const imagePath = prod.node.relativePath.split("/")[0]
    if (imagePath === productPath) {
      // console.log(`Pushing ${imagePath} to product`)
      article.correspondingImages = prod.node
    }
  })

  return (
    <Layout>
      <section className="section">
        <div className="columns">
          <div className="column is-one-third">
            <Img sizes={article.correspondingImages.childImageSharp.fluid} />
          </div>
          <div className="column">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: article.html }} />

            {amazon && (
              <>
                <hr />
                <a
                  href={`https://amzn.to/${amazon}`}
                  target="_blank"
                  className="button"
                  style={{ background: "#ff9900", borderColor: "#b36c01" }}
                >
                  <span className="icon">
                    <FaAmazon />
                  </span>
                  <span>Acheter sur amazon</span>
                </a>
              </>
            )}
            <hr />
            <ProductTagsComponent props={{ tags, category, type }} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const articleQuery = graphql`
  query ArticleByPath($path: String!) {
    getArticle: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      fileAbsolutePath
      frontmatter {
        title
        date
        subtitle
        type
        category
        tags
        amazon
      }
    }

    getAllImages: allFile(
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
