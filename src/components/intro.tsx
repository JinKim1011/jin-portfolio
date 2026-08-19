"use client";

import SocialLink from "./ui/social-link";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "./icons";

export default function Intro() {
  return (
    <div className="text-content-muted text-caption flex flex-col gap-3 pt-10 pb-8">
      <p>
        <span>I'M </span>
        <SocialLink
          href="https://www.linkedin.com/in/jinsu-kim-293b43bb/"
          label="JIN"
          rightIcon={LinkedInLogoIcon}
          target="_blank"
          rel="noopener noreferrer"
        />
        <span> A DESIGN ENGINEER BASED IN BERLIN.</span>
      </p>
      <p>
        <span>DESIGN ONLY HAS VALUE ONCE IT </span>{" "}
        <SocialLink
          href="https://github.com/JinKim1011"
          label="SHIPS"
          rightIcon={GitHubLogoIcon}
          target="_blank"
          rel="noopener noreferrer"
        />
        ,
        <br />
        <span>AND PRODUCTION IS WHERE EVERY DOT </span>
        <SocialLink
          href="mailto:jinsu.kim1011@gmail.com?subject=Let%27s%20connect&body=Hi%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20connect.%0A%0A"
          label="CONNECTS"
          rightIcon={MailIcon}
        />
        .
      </p>
    </div>
  );
}
