export const Header = ({
  userScore,
  highScore,
  gameActive,
}: {
  userScore: number;
  highScore: number;
  gameActive: boolean;
}) => {
  return (
    <>
      <nav className="h-full w-full">
        <ul className="h-full flex items-center justify-around p-2">
          <li className={!gameActive ? "invisible" : ""}>
            Puntaje actual: {userScore}
          </li>
          <img
            draggable={false}
            src="/assets/logo-wide.webp"
            alt="Logo de RockPaperChiappa"
            title="Rock Paper Chiappa"
            className="w-[30vw] mt-[3vw] z-20 select-none pointer-events-none"
          />
          <li className={!gameActive ? "invisible" : ""}>
            Puntaje max: {highScore}
          </li>
        </ul>
      </nav>
    </>
  );
};
