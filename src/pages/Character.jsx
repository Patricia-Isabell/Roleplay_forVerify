import { useEffect, useState } from "react";
import { ensureCharacter, saveCharacter, resetCharacter } from "../lib/storage";

export default function Character() {
  const [ch, setCh] = useState(() => ensureCharacter());

  useEffect(() => {
    saveCharacter(ch);
  }, [ch]);

  function setStat(key, value) {
    const v = Math.max(0, Math.min(10, Number(value) || 0));
    setCh((prev) => ({ ...prev, stats: { ...prev.stats, [key]: v } }));
  }

  return (
    <section className="card stack">
      <h2>Charakter erstellen</h2>
      <p>
        Verteile deine Startwerte (0–10). Höhere Werte erleichtern passende
        Entscheidungen.
      </p>

      <div className="row">
        <label>
          <small className="help">Name</small>
          <br />
          <input
            type="text"
            placeholder="Dein Name"
            value={ch.name}
            onChange={(e) => setCh({ ...ch, name: e.target.value })}
          />
        </label>

        <button
          className="ghost"
          onClick={() => {
            resetCharacter();
            setCh(ensureCharacter());
          }}
        >
          Zurücksetzen
        </button>
      </div>

      <div className="gridcharacter">
        {/* Mathematik */}
        <div className="stat stat-math">
          <div className="label">Mathematik</div>
          <div className="bar">
            <span style={{ width: ch.stats.math * 10 + "%" }}></span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={ch.stats.math}
            onChange={(e) => setStat("math", e.target.value)}
          />
          <small className="help">Wert: {ch.stats.math}/10</small>
        </div>

        {/* Sprache */}
        <div className="stat stat-language">
          <div className="label">Sprache</div>
          <div className="bar">
            <span style={{ width: ch.stats.language * 10 + "%" }}></span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={ch.stats.language}
            onChange={(e) => setStat("language", e.target.value)}
          />
          <small className="help">Wert: {ch.stats.language}/10</small>
        </div>

        {/* Naturwissenschaften */}
        <div className="stat stat-science">
          <div className="label">Naturwissenschaften</div>
          <div className="bar">
            <span style={{ width: ch.stats.science * 10 + "%" }}></span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={ch.stats.science}
            onChange={(e) => setStat("science", e.target.value)}
          />
          <small className="help">Wert: {ch.stats.science}/10</small>
        </div>

        {/* Kreativität */}
        <div className="stat stat-creativity">
          <div className="label">Kreativität</div>
          <div className="bar">
            <span style={{ width: ch.stats.creativity * 10 + "%" }}></span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={ch.stats.creativity}
            onChange={(e) => setStat("creativity", e.target.value)}
          />
          <small className="help">Wert: {ch.stats.creativity}/10</small>
        </div>

        {/* Sozial */}
        <div className="stat stat-social">
          <div className="label">Sozial</div>
          <div className="bar">
            <span style={{ width: ch.stats.social * 10 + "%" }}></span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={ch.stats.social}
            onChange={(e) => setStat("social", e.target.value)}
          />
          <small className="help">Wert: {ch.stats.social}/10</small>
        </div>
      </div>

      <small className="help">
        Tipp: Motivation wirkt sich positiv auf Erfolge aus; hoher Stress kann
        dir Steine in den Weg legen.
      </small>

      <div className="row">
        <a href="/game">
          <button>Weiter zum Spiel</button>
        </a>
        <a href="/status">
          <button className="secondary">Status ansehen</button>
        </a>
      </div>
    </section>
  );
}
