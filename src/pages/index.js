import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import IndexSection from "../components/indexSection"

import traditionbackground from "../images/background/tradition.jpg"
import luxuryBackground from "../images/background/luxury.jpg"
import tableBackground from "../images/background/table.jpg"
import multifunctionBackground from "../images/background/multifunction.jpg"

export default function IndexPage({ data }) {
  console.log(data)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      {data.getAllMyList.edges.map((section, index) => {
        const { category } = section.node

        console.log(data.traditionImageQuery)

        let categoryImage = ""
        let categoryBackground = ""
        let backgroundColor = ""

        switch (category) {
          case "tradition":
            categoryBackground = traditionbackground
            categoryImage = data.traditionImageQuery
            backgroundColor = "ebecf1"
            break
          case "luxury":
            categoryBackground = luxuryBackground
            categoryImage = data.luxuryImageQuery
            backgroundColor = "000000"
            break
          case "table":
            categoryBackground = tableBackground
            categoryImage = data.tableImageQuery
            backgroundColor = "000000"
            break
          case "multifunction":
            categoryBackground = multifunctionBackground
            categoryImage = data.multifunctionImageQuery
            backgroundColor = "000000"
            break

          default:
            break
        }
        return (
          <IndexSection
            key={index}
            props={{ section, index, categoryBackground, categoryImage }}
          />
        )
      })}
    </Layout>
  )
}

export const listHomeQuery = graphql`
  query listHomeQuery {
    getAllMyList: allListHomeJson {
      edges {
        node {
          title
          subtitle
          text
          category
          layout {
            background {
              color
              position
            }
            title {
              text
              background
            }
            subtitle {
              text
              background
            }
          }
        }
      }
    }

    traditionImageQuery: file(relativePath: { eq: "tradition.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 640, maxHeight: 425) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    luxuryImageQuery: file(relativePath: { eq: "luxury.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    tableImageQuery: file(relativePath: { eq: "table.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    multifunctionImageQuery: file(relativePath: { eq: "multifunction.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
