import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { Languages } from "../sections/Languages";
import { Method } from "../sections/Method";
import { Courses } from "../sections/Courses";
import { Teachers } from "../sections/Teachers";
import { Pricing } from "../sections/Pricing";
import { Final } from "../sections/Final";

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Languages />
        <Method />
        <Courses />
        <Teachers />
        <Pricing />
        <Final />
      </main>
    </>
  );
}
