"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { divisions } from "@/content/divisions";
import { DivisionGlyph } from "@/components/visuals/DivisionGlyph";

/** Interactive, accessible tab interface for the four business divisions. */
export function DivisionExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const d = divisions[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % divisions.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + divisions.length) % divisions.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = divisions.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="grid border border-line bg-white lg:grid-cols-12">
      <div role="tablist" aria-label="Business divisions" aria-orientation="vertical" className="border-line lg:col-span-5 lg:border-r">
        {divisions.map((div, i) => {
          const selected = i === active;
          return (
            <button
              key={div.slug}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group relative flex w-full items-start gap-5 border-line px-6 py-6 text-left transition-colors duration-300 md:px-8 md:py-7 ${
                i > 0 ? "border-t" : ""
              } ${selected ? "bg-paper" : "hover:bg-paper/60"}`}
            >
              <span
                aria-hidden
                className={`absolute top-0 left-0 h-full w-[3px] origin-top bg-brand-red transition-transform duration-500 ease-out-quint ${
                  selected ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <span className={`eyebrow pt-1.5 ${selected ? "text-brand-red-700" : "text-slate"}`}>{div.index}</span>
              <span className="flex-1">
                <span className={`block text-h3 font-medium transition-colors ${selected ? "text-ink" : "text-slate group-hover:text-ink"}`}>
                  {div.shortName}
                </span>
                <span className="eyebrow mt-2 block text-slate">{div.kicker}</span>
              </span>
              <ArrowRight
                aria-hidden
                className={`mt-2 size-5 shrink-0 transition-all duration-300 ${selected ? "translate-x-0 text-brand-blue-600 opacity-100" : "-translate-x-2 opacity-0"}`}
              />
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="relative overflow-hidden lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={d.slug}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-full gap-8 border-t border-line p-6 md:grid-cols-[1fr_minmax(0,14rem)] md:p-10 lg:border-t-0"
          >
            <div className="flex flex-col">
              <h3 className="text-h3 font-medium text-balance">{d.name}</h3>
              <p className="mt-4 leading-relaxed text-slate">{d.summary}</p>
              <ul className="mt-6 grid gap-2.5 text-[0.95rem]">
                {d.services.slice(0, 5).map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-brand-blue" />
                    {s.title}
                  </li>
                ))}
                {d.services.length > 5 && <li className="pl-4.5 text-sm text-slate">+ {d.services.length - 5} more services</li>}
              </ul>
              <Link
                href={`/services/${d.slug}`}
                className="group mt-8 inline-flex items-center gap-2 self-start font-medium text-brand-blue-600 md:mt-auto md:pt-8"
              >
                <span className="link-underline">Explore {d.shortName.toLowerCase()}</span>
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="hidden md:block">
              <DivisionGlyph slug={d.slug} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
