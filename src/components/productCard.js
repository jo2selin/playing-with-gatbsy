import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import ProductTagsComponent from "../components/productTags"
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
            <ProductTagsComponent props={{ tags, category, type }} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductCardComponent
