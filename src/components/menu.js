import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const Menu = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "logo.jpg" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <nav
          className="navbar is-secondary"
          role="navigation"
          aria-label="main navigation"
        >
          <Link to="/">
            <Img
              sizes={data.file.childImageSharp.fixed}
              style={{ width: "188px", height: "82px", margin: "auto" }}
            />
          </Link>
        </nav>
      </>
    )}
  />
)

export default Menu
