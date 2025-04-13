export const Disclaimer = ({handleStartGame}: {handleStartGame: () => void}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center max-w-120">
        ¡Bienvenido a <span className="text-red-400">Rock</span>,{" "}
        <span className="text-green-300">Paper</span>,{" "}
        <span className="text-blue-300">Chiappa</span>!
      </h1>
      <p className="text-lg mb-4">
        Para jugar, haz click en el botón de abajo.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleStartGame}
      >
        Jugar
      </button>
    </div>
  );
};
