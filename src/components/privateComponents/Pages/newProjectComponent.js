import React from "react";
import { Link } from "gatsby";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import NewProject from "../../pages/newProject";
import CardBody from "reactstrap/lib/CardBody";
import ProjectCard from "../Components/projectCard";
import ProjectSection from "../Components/projectSection";
import ProjectsSelector from "../Components/projectsSelector";

class NewProjectComponent extends React.Component {
  render() {
    return (
      <>
        <Container style={{maxWidth: '100%', marginBottom: '3em'}}>
          <Card className="shadow">
            <ProjectsSelector />
          </Card>
        </Container>
        <Container style={{maxWidth: '100%'}}>
          <Row>
            <Col>
              <Card className="shadow">
                <CardBody className="pt-0">
                  <ProjectSection title="Blog Posts">
                    <ProjectCard title="General" description="Other options don't fit? Create a general article." icon="single-copy-04" to="/app/general-blog" />
                    <ProjectCard title="News" description="News blog posts are great for sharing your company's latest updates." icon="single-copy-04" to="/app/news-blog" />
                    <ProjectCard title="Guide" description="Guides are perfect for sharing your company's expertise." icon="single-copy-04" to="/app/guide-blog" />
                    <ProjectCard title="Listicle" description="Is your blog post a list of tips, products, or anything else? Create a listicle." icon="single-copy-04" to="/app/list-blog" />
                    <ProjectCard title="Review" description="Review posts are excellent for sharing your experiences and/or opinions on a product or service." icon="single-copy-04" to="/app/review-blog" />
                  </ProjectSection>
                  <ProjectSection title="Emails">
                    <ProjectCard title="Welcome" description="Thank new subscribers and introduce them to your company." icon="email-83" to="/app/welcome-email" />
                    <ProjectCard title="Informative" description="Share information your subscribers would find helpful." icon="email-83" to="/app/info-email" />
                    <ProjectCard title="Abandoned Cart" description="Remind customers to complete an unfinished purchase." icon="email-83" to="/app/abandoned-cart-email" />
                    <ProjectCard title="Cancellation" description="Inform customers that their order or subscription has been cancelled." icon="email-83" to="/app/cancellation-email" />
                    <ProjectCard title="Announcement" description="New product? Big news? Share it in an announcement." icon="email-83" to="/app/announcement-email" />
                    <ProjectCard title="Sales" description="Drive conversions with an email made to sell." icon="email-83" to="/app/sales-email" />
                  </ProjectSection>
                  <ProjectSection title="General Copy">
                    <ProjectCard title="AIDA" description="Attention, Interest, Desire, Action" icon="notification-70" to="/app/aida-copy" />
                    <ProjectCard title="PAS" description="Problem, Agitate, Solution" icon="notification-70" to="/app/pas-copy" />
                    <ProjectCard title="BAB" description="Before, After, Bridge" icon="notification-70" to="/app/bab-copy" />
                    <ProjectCard title="4 P's" description="Picture, Promise, Prove, Push" icon="notification-70" to="/app/4p-copy" />
                  </ProjectSection>
                  <ProjectSection title="Website Content">
                    <ProjectCard title="Landing Page" description="Generate landing pages that tell the story of your product or service." icon="laptop" to="/app/landing-page" />
                    <ProjectCard title="Product Description" description="Generate product descriptions that entice customers to purchase." icon="laptop" to="/app/product-description" />
                    <ProjectCard title="Frequently Asked Questions" description="Generate questions that customers will likely ask." icon="laptop" to="/app/faq" />
                  </ProjectSection>
                  <ProjectSection title="Ads">
                    <ProjectCard title="Facebook Ad" description="Create Facebook ads that drive traffic, generate leads, or sell products." icon="notification-70" to="/app/facebook-ad" />
                    <ProjectCard title="LinkedIn Ad" description="Create ads that target more business-oriented customers." icon="notification-70" to="/app/linkedin-ad" />
                    <ProjectCard title="Search Ad" description="Create ads for search engines like Google that appear alongside search results." icon="notification-70" to="/app/search-ad" />
                  </ProjectSection>
                  <ProjectSection title="Ideas">
                    <ProjectCard title="Blog Ideas" description="Generate blog ideas based on your industry." icon="bulb-61" to="/app/blog-ideas" />
                  </ProjectSection>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default NewProjectComponent;
