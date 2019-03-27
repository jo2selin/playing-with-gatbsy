import React from "react"
import { Link } from "gatsby"
import Layout from "./layout"

const Articles = ({ data }) => <Layout />

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
