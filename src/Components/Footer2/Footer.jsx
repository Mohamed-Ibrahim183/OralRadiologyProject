import React from 'react';
 import './footerstyles.css';
import './footer.css';
import fb from '../assets/facebook.svg';
import insta from '../assets/instagram.svg';
import linkedin from '../assets/linkedin.svg';
import twitter from '../assets/x-twitter.svg';
const FooterLinkSection = ({ title, links }) => (
  <div className="sb__footer-links_div">
    <h4>{title}</h4>
    {links.map((link, index) => (
      <a href={link.href} key={index}>
        <p>{link.label}</p>
      </a>
    ))}
  </div>
);
const SocialMediaIcon = ({ href, src, alt }) => (
  <a href={href} className="socialmedia-icon">
    <img src={src} alt={alt} />
  </a>
);const Footer2 = () => {
    const year = new Date().getFullYear();
    const academicLinks = [
      { label: 'For Students', href: '/students' },
      { label: 'For Faculty', href: '/faculty' },
      { label: 'Submission Guidelines', href: '/guidelines' },
    ];
    const resourceLinks = [
      { label: 'Help Center', href: '/help' },
      { label: 'X-Ray Film Submission', href: '/submission' },
      { label: 'Evaluation System', href: '/evaluation' },
    ];
    const universityLinks = [
      { label: 'About MSA University', href: '/about-msa' },
      { label: 'Faculty of Dentistry', href: '/dentistry' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Academic Calendar', href: '/calendar' },
    ];
    return (
      <footer className="footer">
          <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
        <div className="sb__footer section_padding">
          <div className="sb__footer-links">
            <FooterLinkSection title="Academic Services"  links={academicLinks} />
            <FooterLinkSection title="Resources & Support" links={resourceLinks} />
            <FooterLinkSection title="University Information" links={universityLinks} />
            <div className="sb__footer-links_div">
              <h4>Find Us On</h4>
              <div className="socialmedia">
                <SocialMediaIcon href="https://facebook.com" src={fb} alt="Facebook" />
                <SocialMediaIcon href="https://twitter.com" src={twitter} alt="Twitter" />
                <SocialMediaIcon href="https://linkedin.com" src={linkedin} alt="LinkedIn" />
                <SocialMediaIcon href="https://instagram.com" src={insta} alt="Instagram" />
              </div>
            </div>
          </div>
          <hr />
          <div className="sb__footer-below">
            
            <p className='ymeenseeka'>©{year} MSA University Faculty of Dentistry. All rights reserved.</p>
            <div className="sb__footer-below-links">
              <a href="/terms"><p>Terms & Conditions</p></a>
              <a href="/privacy"><p>Privacy Policy</p></a>
              <a href="/security"><p>Data Security</p></a>
              <a href="/cookies"><p>Cookie Policy</p></a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer2;
