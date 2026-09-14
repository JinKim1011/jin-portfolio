"use client";

import SocialLink from "@/components/ui/social-link";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "@/components/icons";
import RevealEffect from "@/components/reveal-effect";
import { contact } from "@/lib/constants/contact";

export default function Intro() {
  return (
    <div className="text-content-muted text-caption border-stroke flex flex-col border-b-[0.5px] py-14">
      <RevealEffect>
        <p className="mb-4">
          <span>I'M </span>
          <SocialLink
            href="https://www.linkedin.com/in/jinsu-kim-293b43bb/"
            label="JIN"
            rightIcon={LinkedInLogoIcon}
            target="_blank"
          />
          <span> A DESIGN ENGINEER BASED IN BERLIN.</span>
        </p>
      </RevealEffect>

      <RevealEffect delay={0.08}>
        <p>
          <span>DESIGN ONLY HAS VALUE ONCE IT </span>{" "}
          <SocialLink
            href="https://github.com/JinKim1011"
            label="SHIPS"
            rightIcon={GitHubLogoIcon}
            target="_blank"
          />
          ,
        </p>
      </RevealEffect>

      <RevealEffect delay={0.16}>
        <p>
          <span>AND PRODUCTION IS WHERE EVERY DOT </span>
          <SocialLink href={contact} label="CONNECTS" rightIcon={MailIcon} />.
        </p>
      </RevealEffect>
    </div>
  );
}
