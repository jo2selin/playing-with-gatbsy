import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Tilt from "react-tilt"

import homePageCss from "../components/cssComponents/homePage.module.scss"

const IndexSection = function indexsection(data) {
  const { section, index, categoryBackground, categoryImage } = data.props
  const { title, subtitle, text, category, layout } = section.node

  // console.log(section)

  return (
    <section
      key={index}
      className={homePageCss.sectionBackground}
      style={{
        backgroundColor: `rgb(${layout.background.color})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${layout.background.position}`,
        backgroundImage: `url(${categoryBackground})`,
      }}
    >
      <div className="container">
        <Tilt
          className="Tilt"
          options={{ scale: 1.05, max: 25 }}
          style={{
            transform: "perspective(1000px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className={
              "columns is-vcentered Tilt-inner " + homePageCss.sectionColumns
            }
          >
            <div
              className={
                "column is-one-third " + homePageCss.sectionColumnImage
              }
            >
              <Link to={`tags/${category}`}>
                <Img sizes={categoryImage.childImageSharp.fluid} />
              </Link>
            </div>
            <div className={"column " + homePageCss.sectionColumnDescription}>
              <Link to={`tags/${category}`}>
                <div className={homePageCss.titles}>
                  <h4
                    className={"subtitle " + homePageCss.sectionSubtitle}
                    style={{
                      color: `#${layout.subtitle.text}`,
                      background: `#${layout.subtitle.background}`,
                    }}
                  >
                    {title}
                  </h4>
                  <h1
                    className={"title " + homePageCss.sectionTitle}
                    style={{
                      color: `#${layout.title.text}`,
                      background: `rgba(${layout.title.background}, 0.8)`,
                    }}
                  >
                    {subtitle}
                  </h1>
                  <p
                    className={homePageCss.sectionParagraph}
                    style={{
                      color: `#${layout.title.text}`,
                      background: `rgba(${layout.title.background}, 0.9)`,
                    }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              </Link>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  )
}

export default IndexSection
