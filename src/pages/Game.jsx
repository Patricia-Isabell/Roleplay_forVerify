import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import EVENTS from "../data/events.json";
import FRAGEN from "../data/fragen.json";
import { ensureCharacter, saveCharacter, resetCharacter } from "../lib/storage";
import { applyEffects, runRequirement } from "../lib/engine";

export default function Game() {
  const [ch, setCh] = useState(() => ensureCharacter());
  const [result, setResult] = useState(null);

  // Wurde diese Seite mit state { source: "fragen" } aufgerufen?
  const { state } = useLocation();
  const useFragen = state?.source === "fragen";

  // ---------- FRAGEN-MODUS (Quiz) Hilfsfunktionen ----------
  // Falls fragen.json ein anderes Schema nutzt, hier vereinheitlichen.
  // Wenn die Felder identisch mit dem erwarteten Schema sind, kannst du
  // normalizeFragenItem einfach durch (q) => q ersetzen.
  function normalizeFragenItem(q) {
    const choices = q.options ?? q.choices ?? q.answers ?? [];

    // Korrekte Antwort als Index ermitteln (verschiedene mögliche Felder)
    let correctIndex = undefined;

    if (typeof q.correctIndex === "number") {
      correctIndex = q.correctIndex;
    } else if (typeof q.answerIndex === "number") {
      correctIndex = q.answerIndex;
    } else if (q.correct !== undefined) {
      const idx = choices.findIndex((c) => String(c) === String(q.correct));
      correctIndex = idx >= 0 ? idx : undefined;
    } else if (q.answer !== undefined) {
      const idx = choices.findIndex((c) => String(c) === String(q.answer));
      correctIndex = idx >= 0 ? idx : undefined;
    }

    return {
      id: q.id,
      prompt: q.question ?? q.prompt ?? q.text ?? "",
      choices,
      correctIndex,
      category: q.category ?? "misc",
    };
  }

  // Fragen-Pool anhand der in Wahlpflichtfächerwahl gespeicherten Präferenzen
  const fragenPool = useMemo(() => {
    const all = (FRAGEN ?? []).map(normalizeFragenItem);

    // 1) Höchste Priorität: explizit gespeicherte Frage-IDs
    if (Array.isArray(ch.questionIds) && ch.questionIds.length > 0) {
      const filtered = all.filter((q) => ch.questionIds.includes(q.id));
      if (filtered.length > 0) return filtered;
    }
    // 2) Alternativ: gewählte Kategorien
    if (
      Array.isArray(ch.questionCategories) &&
      ch.questionCategories.length > 0
    ) {
      const filtered = all.filter((q) =>
        ch.questionCategories.includes(q.category)
      );
      if (filtered.length > 0) return filtered;
    }
    // 3) Fallback: alle Fragen
    return all;
  }, [ch]);

  // Frage passend zur aktuellen Woche auswählen (Woche 1 → Index 0)
  const fragenItem = useMemo(() => {
    if (!fragenPool.length) return null;
    const idx = (Math.max(1, ch.week) - 1) % fragenPool.length;
    return fragenPool[idx];
  }, [fragenPool, ch.week]);

  // ---------- EVENTS-MODUS (Story) ----------
  const event = useMemo(() => {
    const idx = (Math.max(1, ch.week) - 1) % EVENTS.length;
    return EVENTS[idx];
  }, [ch.week]);

  // Charakterzustand bei jeder Änderung persistieren
  useEffect(() => {
    saveCharacter(ch);
  }, [ch]);

  // ---------- EVENTS: Wahl treffen ----------
  function chooseEventChoice(choice) {
    setResult(null);
    if (choice.requires) {
      const run = runRequirement(choice.requires, ch);
      if (run.ok) {
        const next = applyEffects(ch, choice.successEffects || { week: 1 });
        setCh(next);
        setResult({
          ok: true,
          text: choice.successText || "Erfolg!",
          details: run.details,
        });
      } else {
        const next = applyEffects(
          ch,
          choice.failEffects || { stress: 1, week: 1 }
        );
        setCh(next);
        setResult({
          ok: false,
          text: choice.failText || "Leider nicht geklappt.",
          details: run.details,
        });
      }
    } else {
      const next = applyEffects(ch, choice.effects || { week: 1 });
      setCh(next);
      setResult({ ok: true, text: "Entscheidung angewandt." });
    }
  }

  // ---------- FRAGEN: Antwort wählen ----------
  function answerQuestion(answerIdx) {
    setResult(null);
    if (!fragenItem) return;

    const isCorrect =
      typeof fragenItem.correctIndex === "number" &&
      answerIdx === fragenItem.correctIndex;

    // Effekte bei Antwort (nach Bedarf anpassen):
    // Richtig: Motivation +1, Woche +1
    // Falsch:  Stress +1,       Woche +1
    const effects = isCorrect
      ? { motivation: 1, week: 1 }
      : { stress: 1, week: 1 };

    const next = applyEffects(ch, effects);
    setCh(next);

    setResult({
      ok: isCorrect,
      text: isCorrect ? "✔ Richtig! Gute Arbeit." : "✖ Falsch. Weiter geht’s!",
    });
  }

  // ---------- Gemeinsame Fortschrittskarte ----------
  function ProgressCard() {
    return (
      <div className="card stack">
        <h3>Dein Fortschritt</h3>
        <div className="row">
          <div className="kpi">
            <span className="badge">Stress</span> {ch.stress}
          </div>
          <div className="kpi">
            <span className="badge">Motivation</span> {ch.motivation}
          </div>
          <div className="kpi">
            <span className="badge">Aufgabe</span> {ch.week}
          </div>
        </div>
        <div className="row">
          <a href="/status">
            <button className="secondary">Status ansehen</button>
          </a>
        </div>
        <div className="row">
          <a href="/final">
            <button className="ghost">Zum Finale</button>
          </a>
          <button
            className="danger"
            onClick={() => {
              resetCharacter();
              setCh(ensureCharacter());
              setResult(null);
            }}
          >
            Neu starten
          </button>
        </div>
        <small className="help">
          Hinweis: „Neu starten“ setzt deinen Charakter und den Spielfortschritt
          zurück.
        </small>
      </div>
    );
  }

  // ---------- Render ----------
  if (useFragen) {
    // FRAGEN (Quiz)
    return (
      <section className="stack">
        <div className="card stack">
          <h2>Woche {ch.week}</h2>

          {!fragenItem ? (
            <>
              <p>
                Für deine gewählten Bereiche wurden keine passenden Fragen
                gefunden.
              </p>
              <small className="help">
                Tipps: Wähle in „Wahlpflichtfächerwahl“ andere Bereiche aus oder
                prüfe den Inhalt von <code>fragen.json</code>.
              </small>
            </>
          ) : (
            <>
              <p style={{ marginTop: "-.3rem" }}>
                Frage aus Kategorie: <strong>{fragenItem.category}</strong>
              </p>
              <p className="question">{fragenItem.prompt}</p>

              <div className="row">
                {(fragenItem.choices ?? []).map((choice, i) => (
                  <div key={i} className="stack" style={{ minWidth: 220 }}>
                    <button onClick={() => answerQuestion(i)}>
                      {String(choice)}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {result && (
          <div className={result.ok ? "success" : "alert"}>
            <strong>{result.ok ? "✔ Erfolg:" : "✖ Fehlversuch:"}</strong>{" "}
            {result.text}
          </div>
        )}

        <ProgressCard />
      </section>
    );
  }

  // EVENTS (Story) – unverändert
  return (
    <div className="containergame">
      <section className="stack">
        <div className="card stack">
          <h2>Aufgabe {ch.week}</h2>
          <p style={{ marginTop: "-.3rem" }}>
            Ereignis: <strong>{event.title}</strong>
          </p>
          <p>{event.desc}</p>
          <div className="row">
            {event.choices.map((c) => (
              <div key={c.id} className="stack" style={{ minWidth: 220 }}>
                <button onClick={() => chooseEventChoice(c)}>{c.label}</button>
                {c.requires && (
                  <small className="help">
                    Erforderlich:{" "}
                    {c.requires.anyOf
                      .map((r) =>
                        r.stat
                          ? `${r.stat} ≥ ${r.gte ?? "?"}`
                          : `${r.roll} ≥ ${r.gte ?? "?"}`
                      )
                      .join(" oder ")}
                  </small>
                )}
              </div>
            ))}
          </div>
        </div>

        {result && (
          <div className={result.ok ? "success" : "alert"}>
            <strong>{result.ok ? "✔ Erfolg:" : "✖ Fehlversuch:"}</strong>{" "}
            {result.text}
          </div>
        )}

        <ProgressCard />
      </section>
    </div>
  );
}
