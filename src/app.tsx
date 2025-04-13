// Preact imports
import { useState, useEffect } from "preact/hooks";

// Componentes
import { Game } from "./components/Game";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const App = () => {
  // Estado del juego
  const [userScore, setUserScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(false);

  // Calcula si el nuevo puntaje es mayor que el puntaje más alto y actualiza el estado de highScore si es el caso.
  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    if (userScore > highScore) {
      setHighScore(userScore);
      localStorage.setItem("highScore", userScore.toString());
    }
  }, [userScore, highScore]);

  return (
    <>
      <div className="fixed inset-0 -z-50 bg-pattern pointer-events-none"></div>
      <div className="h-full grid md:grid-cols-3 grid-rows-[10%_auto_10%] justify-items-center dark:text-white text-black">
        <header className="col-span-3 row-start-1 bg-neutral-700/50 w-full">
          <Header
            userScore={userScore}
            highScore={highScore}
            gameActive={gameActive}
          />
        </header>
        <main className="col-span-3 xl:col-start-2 xl:col-span-1 bg-neutral-100 dark:bg-neutral-950 row-start-2 w-full h-full">
          <Game setUserScore={setUserScore} setGameActive={setGameActive} />
        </main>
        <footer className="col-span-3 row-start-3 bg-neutral-700/50 w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
};
