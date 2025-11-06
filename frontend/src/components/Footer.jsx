import React from "react";
import { footerStyles as styles } from "../assets/dummyStyles";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GiCarKey } from "react-icons/gi";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarked,
  FaMapMarkedAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.topElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.roadLine} />
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link to="/" className="flex items-center justify-center">
              <div className={styles.logoContainer}>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[1em] w-auto block"
                  style={{ display: "block", objectFit: "contain" }}
                />
                <span className={styles.logoText}>Imbesu</span>
              </div>
            </Link>
            <p className={styles.description}>
              Premium car rental services with the latest models and exceptional
              services. Drive your dream car today
            </p>

            <div className={styles.socialIcons}>
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
                FaYoutube,
              ].map((Icon, i) => (
                <a href="#" key={i} className={styles.socialIcon}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          {/* //quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>
              Quick Links
              <span className={styles.underline} />
            </h3>
            <ul className={styles.linkList}>
              {["Home", "Cars", "Contact Us"].map((link, i) => (
                <li key={i}>
                  <a
                    href={
                      link === "Home"
                        ? "/"
                        : link === "Contact Us"
                        ? "/contact"
                        : "/cars"
                    }
                    className={styles.linkItem}
                  >
                    <span className={styles.bullet}></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>
              Contact Us
              <span className={styles.underline} />
            </h3>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FaMapMarkedAlt className={styles.contactIcon} />
                <span>
                  Office 8B Ramjis complex corner 11th Avenue and Robert
                  Mugabe way ,Bulawayo
                </span>
              </li>
              <li className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+263771447759</span>
              </li>
              <li className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>wendy@imbesucarrental.co.zw</span>
              </li>
            </ul>
            <div className={styles.hoursContainer}>
              <h4 className={styles.hoursTitle}>Business Hours</h4>

              <div className={styles.hoursText}>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 8:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>
              Newletter
              <span className={styles.underline}></span>
            </h3>
            <p className={styles.newsletterText}>
              Subscribe fro special offers and updates
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email adress"
                className={styles.input}
              />
              <button type="submit" className={styles.subscribeButton}>
                <GiCarKey className="mr-2 text-lg sm:text-1xl" />
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Imbesu Car Rentals all rights
            reserved
          </p>
          <p className="mt-3 md:mt-0">
            Developed By{" "}
            <a
              href="https://wa.me/263780328658"
              target="_blank"
              rel="noopener noreffer"
              className={styles.designerLink}
            >
              Thando Mpofu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
