import React, { useState, useEffect } from 'react';
import Nav from "@/components/layout/Nav";
import Scene from "@/components/layout/Scene";
import TunnelIntro from "@/components/sections/Intro/TunnelIntro";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Journey from "@/components/sections/Journey/LightJourney";
import DesignStack from "@/components/sections/Stack/DesignStack";
import Work from "@/components/sections/Work/Work";
import Experience from "@/components/sections/Experience/Experience";
import Certifications from "@/components/sections/Certifications/Certifications";

import { ConnectHero, ConnectForm } from "@/components/sections/Connect/Connect";
import SingleProject from "@/components/sections/ProjectShowcase/SingleProject";

import { PROJECTS } from "@/content/projects";
import { SKILLS } from "@/content/skills";
import { ABOUT } from "@/content/about";

export default function Home() {
  const projects = PROJECTS;
  const skills = SKILLS;
  const about = ABOUT;



  return (
    <>
      <Nav />
      <main>
        <Scene order={1} runway={6} id="intro" keepOnMobile>
          <TunnelIntro />
        </Scene>

        <Scene order={2} id="hero">
          <Hero about={about} />
        </Scene>

        <Scene order={3} id="about">
          <About />
        </Scene>

        <Scene order={4} runway={6} id="journey" keepOnMobile>
          <Journey />
        </Scene>

        <Scene order={5} id="stack">
          <DesignStack skills={skills} />
        </Scene>

        <Scene order={6} runway={4.5} id="work">
          <Work projects={projects} />
        </Scene>

        <Scene order={7} runway={4.4} id="experience">
          <Experience />
        </Scene>

        <Scene order={8} runway={3.5} id="credentials">
          <Certifications />
        </Scene>

        {projects && projects.map((project, index) => (
          <Scene key={project.id || index} order={9 + index} id={`project-${project.id || index}`} keepOnMobile>
            <SingleProject project={project} index={index} />
          </Scene>
        ))}

        <Scene order={9 + (projects?.length || 0)} id="contact" keepOnMobile>
          <ConnectHero />
        </Scene>

        <Scene order={10 + (projects?.length || 0)} id="contact-form" keepOnMobile>
          <ConnectForm />
        </Scene>
      </main>
    </>
  );
}
