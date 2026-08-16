"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import VelocityMarquee from "@/components/ui/VelocityMarquee";
import styles from "./About.module.css";
import { useLang } from "@/lib/i18n";
import { ABOUT as aboutData } from "@/content/about";

type AboutData = {
  heading_1: string;
  heading_2: string;
  heading_em: string;
  heading_3: string;
  bio: string;
  profile_image: string | null;
  fr_heading_1: string;
  fr_heading_2: string;
  fr_heading_em: string;
  fr_heading_3: string;
  education_text: string;
  fr_education_text: string;
  cta_text: string;
  fr_cta_text: string;
  marquee_1: string[];
  marquee_2: string[];
  about_metric_1_val: string;
  about_metric_1_title: string;
  about_metric_1_desc: string;
  about_metric_2_val: string;
  about_metric_2_title: string;
  about_metric_2_desc: string;
  about_metric_3_val: string;
  about_metric_3_title: string;
  about_metric_3_desc: string;
  about_metric_4_val: string;
  about_metric_4_title: string;
  about_metric_4_desc: string;
};

export default function About() {
  const root = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  
  const loading = false;

  useEffect(() => {
    const el = root.current;
    if (!el || loading || !aboutData || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      /* shared reveal grammar — same as hero: y + fade, soft expo */
      const reveal = (targets: gsap.TweenTarget, trigger: Element, vars: gsap.TweenVars = {}) =>
        gsap.from(targets, {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          ease: EASE.outExpo,
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: { trigger, start: "top 82%" },
          ...vars,
        });

      reveal([`.${styles.eyebrow}`, `.${styles.h2}`, `.${styles.bio}`], el.querySelector(`.${styles.header}`)!);
      
      const rightCol = el.querySelector(`.${styles.rightCol}`);
      if (rightCol) {
        gsap.from(rightCol, {
          x: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: EASE.outExpo,
          scrollTrigger: { trigger: rightCol, start: "top 82%" },
        });
      }

      /* metrics: reveal + count-up when the band enters */
      const band = el.querySelector(`.${styles.metrics}`);
      if (band) {
        reveal(`.${styles.metric}`, band, { stagger: 0.09 });
        ScrollTrigger.create({
          trigger: band,
          start: "top 84%",
          once: true,
          onEnter: () => {
            gsap.utils.toArray<HTMLElement>("[data-metric-count]").forEach((numEl) => {
              const target = Number(numEl.dataset.metricCount);
              const obj = { v: 0 };
              /* the markup ships the real number, so it is correct with no JS
                 at all; the count-up rewinds to zero only at the moment it is
                 actually about to run */
              numEl.textContent = "0";
              gsap.to(obj, {
                v: target,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = String(Math.round(obj.v));
                },
              });
            });
          },
        });
      }

      reveal(
        [`.${styles.edu}`, `.${styles.next}`],
        el.querySelector(`.${styles.edu}`)!,
        { stagger: 0.12 }
      );
    }, el);

    return () => ctx.revert();
  }, [loading, aboutData]);

  if (!aboutData) return <section className={styles.about} id="about" ref={root}></section>;

  const isFr = lang === "fr";

  return (
    <section className={styles.about} id="about" ref={root}>
      <VelocityMarquee rows={[
        { items: aboutData.marquee_1 || [], velocity: 34 },
        { items: aboutData.marquee_2 || [], velocity: -28, outline: true }
      ]} />

      <div className={styles.wrap}>
        <div className={styles.mainGrid}>
          <div className={styles.leftCol}>
            <div className={styles.header}>
              <p className={styles.eyebrow}>
                <span>01</span> {t("about.eyebrow")}
              </p>
              <h2 className={styles.h2}>
                {isFr && aboutData.fr_heading_1 ? aboutData.fr_heading_1 : aboutData.heading_1}<br />
                {isFr && aboutData.fr_heading_2 ? aboutData.fr_heading_2 : aboutData.heading_2} <em className={styles.serif}>{isFr && aboutData.fr_heading_em ? aboutData.fr_heading_em : aboutData.heading_em}</em>{(isFr && aboutData.fr_heading_3) ? aboutData.fr_heading_3 : aboutData.heading_3}
              </h2>
            </div>
            <p className={styles.bio}>{aboutData.bio}</p>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.profileCircle}></div>
            {aboutData.profile_image ? (
              <img 
                src={aboutData.profile_image.startsWith('http') ? aboutData.profile_image : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${aboutData.profile_image}`} 
                className={styles.profileImg} 
                alt="Profile" 
              />
            ) : (
              <img src="/images/portrait.png" className={styles.profileImg} alt="Profile" />
            )}
          </div>
        </div>

        <div className={styles.metrics}>
          {[
            { val: aboutData.about_metric_1_val, title: aboutData.about_metric_1_title, desc: aboutData.about_metric_1_desc },
            { val: aboutData.about_metric_2_val, title: aboutData.about_metric_2_title, desc: aboutData.about_metric_2_desc },
            { val: aboutData.about_metric_3_val, title: aboutData.about_metric_3_title, desc: aboutData.about_metric_3_desc },
            { val: aboutData.about_metric_4_val, title: aboutData.about_metric_4_title, desc: aboutData.about_metric_4_desc },
          ].map((m, idx) => (
            <div className={styles.metric} key={idx}>
              <div className={styles.metricNum}>
                {m.val.match(/\d+/) ? (
                  <>
                    {m.val.replace(/[\d+%\s].*/, '')}
                    <span data-metric-count={m.val.match(/\d+/)?.[0] || 0}>
                      {m.val.match(/\d+/)?.[0] || 0}
                    </span>
                    <i>{m.val.replace(/^.*?\d+/, '')}</i>
                  </>
                ) : (
                  <span className={styles.metricStatic}>{m.val}</span>
                )}
              </div>
              <div className={styles.metricLabel}>{m.title}</div>
              {m.desc && <div className={styles.metricDesc}>{m.desc}</div>}
            </div>
          ))}
        </div>

        <p className={styles.edu}>
          {isFr && aboutData.fr_education_text ? aboutData.fr_education_text : aboutData.education_text}
        </p>

        <div className={styles.next}>
          <Button href="#work" variant="dark" size="sm" arrow>
            {isFr && aboutData.fr_cta_text ? aboutData.fr_cta_text : aboutData.cta_text}
          </Button>
        </div>
      </div>
    </section>
  );
}
