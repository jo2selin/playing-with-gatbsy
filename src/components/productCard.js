import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import tagsPageCss from "../components/cssComponents/tags.module.scss"

const ProductCardComponent = function(data) {
  const {
    category,
    path,
    subtitle,
    tags,
    title,
    type,
    correspondingImages,
  } = data.props.article

  // console.log("TagsComponent")
  // console.log(data)

  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <figure className={`image is-4by3 ${tagsPageCss.is4by3}`}>
            <Img sizes={correspondingImages.childImageSharp.fluid} />
          </figure>
        </div>
        <div className="card-content">
          <Link to={path}>
            <div className="media">
              <div className="media-left" />
              <div className="media-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{subtitle}</p>
              </div>
            </div>
          </Link>
          <section className="section is-marginless">
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <Link to={`/tags/${type}`}>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Type</span>
                    <span className="tag">{type}</span>
                  </div>
                </Link>
              </div>
              <div className="control">
                <Link to={`/tags/${category}`}>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Category</span>
                    <span className="tag">{category}</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags">
              {tags &&
                tags.map((tag, index) => {
                  return (
                    <span key={index} className="tag is-light">
                      <Link style={{ color: "grey" }} to={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    </span>
                  )
                })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductCardComponent
