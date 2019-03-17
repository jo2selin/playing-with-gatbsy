import React from "react"
import Link from "gatsby"
import Layout from "../components/layout"

const Articles = ({ data }) => (
  <Layout>
    <div>
      <h1 className="title">All articles</h1>
      <div className="columns">
        {data.allMarkdownRemark.edges.map(article => (
          <div key={article.node.id} className="column is-3">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  {/* <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"> */}
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left" />
                  <div className="media-content">
                    <p className="title is-4">
                      {article.node.frontmatter.title}
                    </p>
                    <p className="subtitle is-6">
                      {article.node.frontmatter.type} -{" "}
                      {article.node.frontmatter.category}
                    </p>
                  </div>
                </div>

                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <br />
                  <time dateTime="2016-1-1">
                    {article.node.frontmatter.date}
                  </time>
                  <Link to={article.node.frontmatter.path}>
                    <button class="button is-primary is-fullwidth">
                      See article
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query articlesQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
            subtitle
            type
            category
          }
        }
      }
    }
  }
`

export default Articles
