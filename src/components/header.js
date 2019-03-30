import PropTypes from "prop-types"
import React from "react"
import Menu from "../components/menu"

const Header = ({ siteTitle }) => <Menu />

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
