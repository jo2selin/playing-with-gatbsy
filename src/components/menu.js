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
          className="navbar is-fixed-top is-secondary"
          role="navigation"
          aria-label="main navigation"
        >
          <Link to="/" style={{ margin: "auto" }}>
            <Img
              fixed={data.file.childImageSharp.fixed}
              style={{
                width: "188px",
                height: "82px",
                margin: "auto",
                display: "block",
              }}
            />
          </Link>
        </nav>
      </>
    )}
  />
)

export default Menu
