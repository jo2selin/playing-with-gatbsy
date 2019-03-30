import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { FaAmazon } from "react-icons/fa"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductTagsComponent from "../components/productTags"

export default function Template({ data }) {
  const article = data.getArticle
  const { title, subtitle, category, type, tags, amazon } = article.frontmatter

  // matching image article
  const allImages = data.getAllImages.sourceInstanceName
  const productPath = data.getArticle.fileAbsolutePath
    .split("/")
    .slice(-2, -1)[0]

  allImages.forEach(prod => {
    const imagePath = prod.node.relativePath.split("/")[0]
    if (imagePath === productPath) {
      article.correspondingImages = prod.node
    }
  })

  // Listing all categories from Products Markdown
  const allCategoriesFromMarkdown = []
  data.getAllCollections.edges.forEach(allProducts => {
    Object.values(allProducts.node.frontmatter).forEach(type => {
      if (!allCategoriesFromMarkdown.includes(type)) {
        allCategoriesFromMarkdown.push(type)
      }
    })
  })

  return (
    <Layout>
      <SEO title={title} keywords={tags} description={subtitle} />
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
          <div className="column is-one-fifth">
            <h2 className="title is-5">Découvrez les collections : </h2>
            <div className="tags">
              {allCategoriesFromMarkdown.map((category, index) => {
                return (
                  <span key={index} className="tag is-dark">
                    <Link to={`/tags/${category}`} style={{ color: "white" }}>
                      {category}
                    </Link>
                  </span>
                )
              })}
            </div>
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

    getAllCollections: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            type
            category
          }
        }
      }
    }
  }
`
