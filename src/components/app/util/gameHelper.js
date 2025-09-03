export function bestKey(stats) {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  const map = {
    math: [
      "Mathematik=M1",
      "Physik=P1",
      "Chemie=C1",
      "Technisches Zeichnen=D1",
    ],
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
  return map[entries[0][0]] || "Unbekannt";
}
