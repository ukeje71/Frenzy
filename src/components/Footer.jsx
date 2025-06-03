import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-teal-800 w-full ">
      <footer className=" pt-7 pb-7 md:w-[700px] lg:w-[1100px] m-auto items-center grid md:grid-cols-2 lg:grid-cols-5 text-center text-white">
        <span class="f-span">
          <h3>Frenzy</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <input
            className="border-1 outline-0 text-center p-1 h-10 rounded-xl border-green-600 "
            type="email"
            placeholder="Enter Your email"
            required
          />
        </span>
        <span>
          <h3>Support</h3>
          <p>69 Tan Lap,Di An,Binh Duong, Viet Nam</p>
          <p>Frenzy@gmail.com</p>
          <p>+88015-88888-9999</p>
        </span>
        <span>
          <h3>Account</h3>
          <p>My Account</p>
          <p>Login/Signup/Register</p>
          <p>Cart</p>
        </span>
        <span>
          <h3>Quick Link</h3>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>FAQ</p>
        </span>
        <div>
          <h3>Contact</h3>
          <span className="flex justify-center gap-4 ">
            <a
              href="https://www.facebook.com/profile.php?id=100092532492898"
              target="blank 2"
            >
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <LinkedinIcon />
            </a>
            <a href="https://www.linkedin.com/in/ukeje-isaac-7280a1332?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0qnIOQ9VSb2cZfIaI7fRbQ%3D%3D">
              <InstagramIcon />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
