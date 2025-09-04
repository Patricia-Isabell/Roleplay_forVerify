/* export default function Character() {
  return (
    <section className="card stack">
      <h2>Willkommen zum Schulabenteuer 🎓</h2>
      <p>
        Forme deinen Charakter mit deinen Entscheidungen, entdecke deine
        Fähigkeiten und erhalte am Ende der 10. Woche die für dich am besten
        passende Unterrichtsempfehlung.
      </p>
      <div className="row">
        <a href="/character">
          <button>Charakter Erstellen</button>
        </a>
        <a href="/game">
          <button className="secondary">Spiel Fortsetzen</button>
        </a>
        <a href="/status">
          <button className="ghost">Status Anzeigen</button>
        </a>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import {
  ensureCharacter,
  saveCharacter,
  loadCharacter,
  resetCharacter,
} from "../lib/storage";
import { useRouter } from "next/navigation"; */

export default function Character() {
  const router = useRouter();
  const [form, setForm] = useState(() => ensureCharacter());

  useEffect(() => {
    const existing = loadCharacter();
    if (existing) setForm(existing);
  }, []);

  function updateStat(key, val) {
    setForm((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: Number(val) },
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const cleaned = {
      ...form,
      name: form.name?.trim() || "Student",
      week: 1,
      stress: Number(form.stress) || 2,
      motivation: Number(form.motivation) || 3,
    };
    saveCharacter(cleaned);
    router.push("/game");
  }

  return (
    <section className="stack">
      <div className="row">
        <h2>Charakter Erstellen</h2>
        <span className="badge">Anfangswerte 0–10</span>
      </div>

      <form onSubmit={onSubmit} className="card stack">
        <div className="grid-2">
          <div className="stack">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name eingeben"
            />
          </div>

          <div className="stack">
            <label>Motivation</label>
            <input
              type="number"
              min="0"
              max="10"
              value={form.motivation}
              onChange={(e) =>
                setForm({ ...form, motivation: Number(e.target.value) })
              }
            />
          </div>

          <div className="stack">
            <label>Stress</label>
            <input
              type="number"
              min="0"
              max="10"
              value={form.stress}
              onChange={(e) =>
                setForm({ ...form, stress: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <h3>Interessen / Anfangspunkte</h3>
        <div className="grid-2">
          <Field
            label="math"
            val={form.stats.math}
            onChange={(v) => updateStat("math", v)}
          />
          <Field
            label="economics"
            val={form.stats.economics}
            onChange={(v) => updateStat("economics", v)}
          />
          <Field
            label="foreign_languages"
            val={form.stats.foreign_languages}
            onChange={(v) => updateStat("foreign_languages", v)}
          />
          <Field
            label="artistic_creativ"
            val={form.stats.artistic_creativ}
            onChange={(v) => updateStat("artistic_creativ", v)}
          />
        </div>
        <div className="row">
          <button type="submit">Speichern und Spiel starten</button>
          <button
            type="button"
            className="secondary"
            onClick={() => resetCharacter()}
          >
            Zurücksetzen
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, val, onChange }) {
  return (
    <div className="stack">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        max="10"
        value={val}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
