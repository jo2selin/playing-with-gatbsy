import React from "react"
import { Link } from "gatsby"

const Menu = function menu() {
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Opinel
        </Link>

        <button
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to={"/articles"} className="navbar-item">
            Articles
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item" />
        </div>
      </div>
    </nav>
  )
}

export default Menu
