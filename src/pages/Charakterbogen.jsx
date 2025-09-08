/* import "/Charakterbogen.css"; */ // Dein CSS kann so eingebunden werden
export default function Charakterbogen() {
  return (
    <div>
      <header>
        <h1>Charakterbogen</h1>
      </header>
      <main>
        <form action="url" method="POST">
          <div className="slogan">
            <h2>Deine Stärken</h2>
            <div>
              <label>
                Dein Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Schlumpfine"
                  pattern="[a-zA-Z]+"
                  required
                  minLength="2"
                />
              </label>
            </div>
            <div>
              <label>
                Dein Lieblingsfach:
                <input
                  type="text"
                  name="subject"
                  placeholder="z. B. Mathe"
                  pattern="[a-zA-Z0-9@.]+"
                  required
                  minLength="2"
                />
              </label>
            </div>
          </div>
          <div>
            <h3>Deine Hobbys:</h3>
            <label>
              <input type="checkbox" name="hobbies" value="lesen" /> Lesen
            </label>
            <label>
              <input type="checkbox" name="hobbies" value="sport" /> Sport
            </label>
            <label>
              <input type="checkbox" name="hobbies" value="kochen" /> Kochen
            </label>
          </div>
          <button type="submit">Absenden</button>
        </form>
      </main>
    </div>
  );
}
