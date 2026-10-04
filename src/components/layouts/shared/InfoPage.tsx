import type { ComponentType, ReactElement } from "react";
import PageShell from "./PageShell";
// import PageHeader from "../../ui/Section/PageHeader";
import FeatureCard from "../../ui/CardItems/FeatureCard";
import Reveal from "../../ui/Motion/Reveal";
import PageHeader from "../home/PageHeader";

export interface InfoItem {
  readonly icon: ComponentType<{ className?: string }>;
  readonly title: string;
  readonly desc: string;
}

interface InfoPageProps {
  group: string;
  title: string;
  desc: string;
  heading: string;
  intro: string;
  items: readonly InfoItem[];
}

export default function InfoPage({ group, title, desc, heading, intro, items }: InfoPageProps): ReactElement {
  return (
    <PageShell>
      <PageHeader group={group} title={title} desc={desc} />
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{group}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{heading}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <FeatureCard icon={item.icon} title={item.title} desc={item.desc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
