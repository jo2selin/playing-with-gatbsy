import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default function Template({ data }) {
  const article = data.markdownRemark
  const { tags } = article.frontmatter

  console.log(tags)
  return (
    <Layout>
      <div>
        <Link to="/articles">
          <button className="button is-primary">Tous les articles</button>
        </Link>
        <div className="colums">
          <div className="column">
            <h1 className="title">{article.frontmatter.title}</h1>
            <h2 className="subtitle">
              De la catégorie {article.frontmatter.category} appartenant a la
              collection {article.frontmatter.type}
            </h2>
            <div className="tags">
              <span className="tag is-primary">
                {article.frontmatter.category}
              </span>
              <span className="tag is-primary">{article.frontmatter.type}</span>
              {tags &&
                tags.map((tag, index) => {
                  return (
                    <span key={index} className="tag is-light">
                      {tag}
                    </span>
                  )
                })}
            </div>
            <p dangerouslySetInnerHTML={{ __html: article.html }} />
          </div>
          <div className="column" />
          <img src="https://picsum.photos/200/300/?random" alt="image random" />
        </div>
      </div>
    </Layout>
  )
}

export const articleQuery = graphql`
  query ArticleByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
`
