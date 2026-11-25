"use client";

import SocialLink from "@/components/ui/social-link";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "@/components/icons";
import { TerminalLoading } from "@/components/loading";
import CareerLink from "@/components/ui/career-link";
import RevealEffect from "@/components/effects/reveal-effect";
import { careerLinkItems } from "@/lib/constants/career";
import { contact } from "@/lib/constants/contact";

export default function Intro() {
  return (
    <div className="text-content-muted text-caption border-stroke flex flex-col border-b-[0.5px] py-11">
      <RevealEffect>
        <p className="mb-4">
          <span>I&apos;M </span>
          <SocialLink
            href="https://www.linkedin.com/in/jinsu-kim-293b43bb/"
            label="JIN"
            rightIcon={LinkedInLogoIcon}
            target="_blank"
          />
          <span> A DESIGNER BASED IN BERLIN.</span>
        </p>
      </RevealEffect>

      <RevealEffect delay={0.08}>
        <p>
          <span>DESIGN ONLY HAS VALUE ONCE IT </span>
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

      <div className="mt-4 flex flex-col">
        <TerminalLoading
          aria-hidden="true"
          className="-ml-2 [--duration:1.2s]"
        />
        {careerLinkItems.map((item) => (
          <CareerLink key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
