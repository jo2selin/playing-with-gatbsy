import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

import image404 from "../images/404.jpg"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section className="section">
      <div className="container">
        <h1 className="title">Cette page n'existe pas.</h1>
        <Link to={"/"}>
          <div className="button">Retour à l'accueil</div>
        </Link>
        <hr />
        <img src={image404} alt="404" style={{ margin: "auto" }} />
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
