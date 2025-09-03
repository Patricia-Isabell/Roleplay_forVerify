export default function Status() {
  if (!ch) return <div className="card">Lädt...</div>;

  return (
    <section className="stack">
      <div className="card">
        <h2>Charakterstatus</h2>
        <p>
          <strong>Name:</strong> {ch.name || "Schüler"}
        </p>
      </div>
      <div className="kpi">
        <Stat label="Mathematik=M1" value={ch.stats.math} />
        <Stat label="Physik=P1" value={ch.stats.math} />
        <Stat label="Chemie=C1" value={ch.stats.math} />
        <Stat label="Technisches Zeichnen=D1" value={ch.stats.math} />
        <Stat
          label="Betriebswirtschaftslehre=BWL2"
          value={ch.stats.economics}
        />
        <Stat label="Rechnungswesen=RW2" value={ch.stats.economics} />
        <Stat label="Wirtschaftsgeografie=WG2" value={ch.stats.economics} />
        <Stat label="Spanisch=S3A" value={ch.stats.foreign_language} />
        <Stat label="Französich=F3A" value={ch.stats.foreign_language} />
        <Stat label="Latein=L3A" value={ch.stats.foreign_language} />
        <Stat label="Kunst=K3B" value={ch.stats.artistic_creativ} />
        <Stat label="Musik=M3B" value={ch.stats.artistic_creativ} />
        <Stat label="Werken=W3B" value={ch.stats.artistic_creativ} />
        <Stat
          label="Textiles Gestalten=G3B"
          value={ch.stats.artistic_creativ}
        />
      </div>
      ;
      <div className="kpi">
        <Stat label="Motivation" value={ch.motivation} />
        <Stat label="Stress" value={ch.stress} />
        <Stat label="Woche" value={`${ch.week}/10`} />
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card">
      <div className="val">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
