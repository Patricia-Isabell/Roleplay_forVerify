/* "use client";

import { useEffect, useMemo, useState } from "react";
import { loadCharacter, ensureCharacter, resetCharacter } from "../lib/storage";
import { useRouter } from "next/navigation";

const SUGGESTIONS = {
  math: ["Mathematik=M1", "Physik=P1", "Chemie=C1", "Technisches Zeichnen=D1"],
  economics: [
    "Betriebswirtschaftslehre=BWL2",
    "Rechnungswesen=RW2",
    "Wirtschaftsgeografie=WG2",
  ],
  forgeign_language: ["Spanisch=S3A", "Französich=F3A", "Latein=L3A"],
  artistic_creativ: [
    "Kunst=K3B",
    "Musik=M3B",
    "Werken=W3B",
    "textiles Gestalten=G3B",
  ],
};

export default function FinalPage() {
  const router = useRouter();
  const [ch, setCh] = useState(null);

  useEffect(() => {
    setCh(loadCharacter() || ensureCharacter());
  }, []);

  const topKeys = useMemo(() => {
    if (!ch) return [];
    const entries = Object.entries(ch.stats);
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 3).map(([k]) => k);
  }, [ch]);

  if (!ch) return <div className="card">Wird geladen...</div>;

  const message = witty(ch);

  return (
    <section className="stack">
      <div className="card stack">
        <h2>Glückwunsch, {ch.name || "Schüler"}!</h2>
        <p>
          Du hast die 10-wöchige Reise abgeschlossen. Hier sind passende
          Kursvorschläge für dich:
        </p>
        <ul>
          {topKeys
            .flatMap((k) => SUGGESTIONS[k].slice(0, 2))
            .slice(0, 4)
            .map((course, i) => (
              <li key={i}>{course}</li>
            ))}
        </ul>
        <p style={{ opacity: 0.8, marginTop: ".5rem" }}>
          <em>{message}</em>
        </p>

        <div className="row" style={{ marginTop: ".8rem" }}>
          <a href="/status">
            <button className="secondary">Status anzeigen</button>
          </a>
          <button
            onClick={() => {
              resetCharacter();
              router.push("/");
            }}
          >
            Nochmal spielen
          </button>
        </div>
      </div>
    </section>
  );
}

function witty(ch) {
  const top = Object.entries(ch.stats).sort((a, b) => b[1] - a[1])[0]?.[0];
  const lines = {
    artistic_creativ:
      "Kunst ist ein großartiger Ausgleich für den Schulstress – Volltreffer!",
    math: "Zahlen sind deine Sprache – schwierige Aufgaben schrecken dich nicht.",
    economics: "Deine Wissbegier ist groß, die Wirtschaft ruft nach dir!",
    foreign_language:
      "Dein Wortverständnis und deine Sprachlogik sind stark, und sprachlich denken steht dir gut.",
  };
  return (
    lines[top] ||
    "Mit deinen vielseitigen Interessen kannst du in vielen Fächern erfolgreich sein!"
  );
}
 */
