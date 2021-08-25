/*
  File defining client only routes
*/

import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../../components/privateRoute"
import NewProject from "../../components/pages/newProject"
import GeneralBlog from "../../components/pages/generalBlog"
import NewsBlog from "../../components/pages/newsBlog"
import GuideBlog from "../../components/pages/guideBlog"
import ListBlog from "../../components/pages/listBlog"
import ReviewBlog from "../../components/pages/reviewBlog"
import WelcomeEmail from "../../components/pages/welcomeEmail"
import InfoEmail from "../../components/pages/infoEmail"
import AnnouncementEmail from "../../components/pages/announcementEmail"
import NewsletterEmail from "../../components/pages/newsletterEmail"
import AbandonedCartEmail from "../../components/pages/abandonedCartEmail"
import CancellationEmail from "../../components/pages/cancellationEmail"
import SalesEmailPage from "../../components/pages/salesEmail"
import AIDACopy from "../../components/pages/aidaCopy"
import PASCopy from "../../components/pages/pasCopy"
import BABCopy from "../../components/pages/babCopy"
import ppppCopy from "../../components/pages/ppppCopy"
import landingPage from "../../components/pages/landingPage"
import productDescription from "../../components/pages/productDescription"
import faq from "../../components/pages/faq"
import FBAd from "../../components/pages/fbAd"
import LIAd from "../../components/pages/liAd"
import searchAd from "../../components/pages/searchAd"
import blogIdeas from "../../components/pages/blogIdeas"

const App = () => {
  return (
    <Router basepath="/app">
        <PrivateRoute path="/" component={NewProject} />
        <PrivateRoute path="/general-blog" component={GeneralBlog} />
        <PrivateRoute path="/news-blog" component={NewsBlog} />
        <PrivateRoute path="/guide-blog" component={GuideBlog} />
        <PrivateRoute path="/list-blog" component={ListBlog} />
        <PrivateRoute path="/review-blog" component={ReviewBlog} />
        <PrivateRoute path="/welcome-email" component={WelcomeEmail} />
        <PrivateRoute path="/info-email" component={InfoEmail} />
        <PrivateRoute path="/announcement-email" component={AnnouncementEmail} />
        <PrivateRoute path="/newsletter-email" component={NewsletterEmail} />
        <PrivateRoute path="/abandoned-cart-email" component={AbandonedCartEmail} />
        <PrivateRoute path="/cancellation-email" component={CancellationEmail} />
        <PrivateRoute path="/sales-email" component={SalesEmailPage} />
        <PrivateRoute path="/aida-copy" component={AIDACopy} />
        <PrivateRoute path="/pas-copy" component={PASCopy} />
        <PrivateRoute path="/bab-copy" component={BABCopy} />
        <PrivateRoute path="/4p-copy" component={ppppCopy} />
        <PrivateRoute path="/landing-page" component={landingPage} />
        <PrivateRoute path="/product-description" component={productDescription} />
        <PrivateRoute path="/faq" component={faq} />
        <PrivateRoute path="/facebook-ad" component={FBAd} />
        <PrivateRoute path="/linkedin-ad" component={LIAd} />
        <PrivateRoute path="/search-ad" component={searchAd} />
        <PrivateRoute path="/blog-ideas" component={blogIdeas} />
    </Router>
  )
}

export default App