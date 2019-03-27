import React from "react"
import { Link } from "gatsby"

const ProductTagsComponent = function(data) {
  const { category, type, tags } = data.props
  // console.log("TagsComponent")
  console.log(data)

  return (
    <>
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
    </>
  )
}

export default ProductTagsComponent
