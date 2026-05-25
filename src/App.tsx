import { HeroSection } from "./components/HeroSection";
import { QuranVerse } from "./components/QuranVerse";
import { NamesSection } from "./components/NamesSection";
import { EventDetails } from "./components/EventDetails";
import { CountdownTimer } from "./components/CountdownTimer";
import { Instructions } from "./components/Instructions";
import { ClosingSection } from "./components/ClosingSection";
import { Divider } from "./components/decorative/Divider";

export default function App() {
  return (
    <main className="min-h-dvh">
      <HeroSection />
      <Divider className="my-4" />
      <QuranVerse />
      <Divider className="my-4" />
      <NamesSection />
      <Divider className="my-4" />
      <EventDetails />
      <Divider className="my-4" />
      <CountdownTimer />
      <Divider className="my-4" />
      <Instructions />
      <Divider className="my-4" />
      <ClosingSection />
    </main>
  );
}
