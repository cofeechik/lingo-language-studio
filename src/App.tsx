import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Languages } from "./components/Languages/Languages";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Languages />
      </main>
    </>
  );
}
