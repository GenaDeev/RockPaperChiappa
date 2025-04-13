import { Character, type GameProps } from "../types";
import { useState } from "preact/hooks";
import { Disclaimer } from "./Disclaimer";
import { characters } from "../db";
import {
  getRandomNumberByInterval,
  choiceIdToString,
  moodIdToString,
} from "../utils";

export const Game = ({ setUserScore, setGameActive }: GameProps) => {
  const [character, setCharacter] = useState<Character>(characters.chiappa);
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(true);
  const [mood, setMood] = useState<"happy" | "angry" | "neutral">("neutral");
  const [message, setMessage] = useState<string>("hola linda! vamos a jugar!");
  const [iaChoice, setIaChoice] = useState<
    "rock" | "paper" | "scissors" | null
  >(null);
  const [playerChoice, setPlayerChoice] = useState<
    "rock" | "paper" | "scissors" | null
  >(null);
  const [playerWonRound, setPlayerWonRound] = useState<boolean>(false);
  const [iaWonRound, setIaWonRound] = useState<boolean>(false);

  const possibleChoices: Array<"rock" | "paper" | "scissors"> = [
    "rock",
    "paper",
    "scissors",
  ];

  const handleStartGame = () => {
    setDisclaimerOpen(false);
    setUserScore(0);
    setGameActive(true);
  };

  const handleNewMessage = (mood: "happy" | "angry" | "neutral") => {
    const messages = character.messages[mood];
    const randomIndex = getRandomNumberByInterval(0, messages.length - 1);
    const newMessage = messages[randomIndex];
    if (newMessage === message) {
      handleNewMessage(mood);
      return;
    }
    setMessage(newMessage);
  };

  const handleUserSelect = (choice: "rock" | "paper" | "scissors") => () => {
    const ia = possibleChoices[getRandomNumberByInterval(0, 2)];
    setPlayerChoice(choice);
    setIaChoice(ia);

    if (ia === choice) {
      setPlayerWonRound(false);
      setIaWonRound(false);
      setMood("neutral");
      handleNewMessage("neutral");
      return;
    }

    const userWins =
      (choice === "rock" && ia === "scissors") ||
      (choice === "paper" && ia === "rock") ||
      (choice === "scissors" && ia === "paper");

    if (userWins) {
      setPlayerWonRound(true);
      setIaWonRound(false);
      setUserScore((prev) => prev + 1);
      setMood("angry");
      handleNewMessage("angry");
    }
    if (!userWins) {
      setIaWonRound(true);
      setPlayerWonRound(false);
      setUserScore(0);
      setMood("happy");
      handleNewMessage("happy");
    }
  };

  return disclaimerOpen ? (
    <Disclaimer handleStartGame={handleStartGame} />
  ) : (
    <div className="py-14 px-12 flex flex-col items-center justify-center h-full">
      {/* Mensaje y foto de la IA */}
      <div id="ia-section">
        <div className="flex items-center gap-2">
          <div className="frame w-[100px] h-[100px] aspect-square border-2 rounded-xl border-black dark:border-white">
            <img
              className="h-full w-full rounded-xl"
              alt={`${mood} ${character.name}`}
              src={`/assets/sprites/${
                character.id
              }/${mood}/${getRandomNumberByInterval(
                0,
                character.sprites[mood] - 1
              )}.webp`}
            ></img>
          </div>
          <div className="message text-2xl font-bold">
            <span className="block text-xs opacity-50">
              {character.name} -{" "}
              <span
                className={
                  "capitalize " +
                  (mood === "angry"
                    ? "text-red-500"
                    : mood === "happy"
                    ? "text-green-500"
                    : "text-neutral-300")
                }
              >
                {moodIdToString(mood)}
              </span>
            </span>
            <div className="message auto-scale-text text-2xl font-bold">
              {message}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-around">
        {/* Contenedor de la eleccion de la IA */}
        <div className="ia-choice p-4 mt-4 flex flex-col items-center gap-2 justify-center">
          <span>{character.name} eligio:</span>
          <div
            className={`bg-white dark:bg-black border-1 ${
              iaWonRound ? "border-green-500" : ""
            } w-[96px] h-[96px] rounded-xl`}
          >
            {iaChoice === "paper" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/paper.webp"
                alt={`${character.name} elige papel`}
              />
            )}
            {iaChoice === "rock" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/rock.webp"
                alt={`${character.name} elige piedra`}
              />
            )}
            {iaChoice === "scissors" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/scissors.webp"
                alt={`${character.name} elije tijera`}
              />
            )}
            {!iaChoice && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="16"
                    stroke-dashoffset="16"
                    d="M12 3c4.97 0 9 4.03 9 9"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.3s"
                      values="16;0"
                    />
                    <animateTransform
                      attributeName="transform"
                      dur="1.5s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    />
                  </path>
                  <path
                    stroke-dasharray="64"
                    stroke-dashoffset="64"
                    stroke-opacity="0.3"
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="1.2s"
                      values="64;0"
                    />
                  </path>
                </g>
              </svg>
            )}
          </div>
          <span className="capitalize">
            {iaChoice ? choiceIdToString(iaChoice) : "Pensando..."}
          </span>
        </div>
        <div className="text-center text-2xl font-bold">
          {iaWonRound
            ? `Gano ${character.name}!`
            : playerWonRound
            ? `Ganaste vos!`
            : `Empate`}
        </div>
        {/* Contenedor de la eleccion del usuario */}
        <div className="ia-choice p-4 mt-4 flex flex-col items-center gap-2 justify-center">
          <span>Vos elegiste:</span>
          <div
            className={`bg-white dark:bg-black border-1 ${
              playerWonRound ? "border-green-500" : ""
            } w-[96px] h-[96px] rounded-xl`}
          >
            {playerChoice === "paper" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/paper.webp"
                alt={`Vos elegis papel`}
              />
            )}
            {playerChoice === "rock" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/rock.webp"
                alt={`Vos elegis piedra`}
              />
            )}
            {playerChoice === "scissors" && (
              <img
                className="h-full w-full rounded-xl"
                src="/assets/scissors.webp"
                alt={`Vos elegis tijera`}
              />
            )}
            {!playerChoice && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="16"
                    stroke-dashoffset="16"
                    d="M12 3c4.97 0 9 4.03 9 9"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.3s"
                      values="16;0"
                    />
                    <animateTransform
                      attributeName="transform"
                      dur="1.5s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    />
                  </path>
                  <path
                    stroke-dasharray="64"
                    stroke-dashoffset="64"
                    stroke-opacity="0.3"
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="1.2s"
                      values="64;0"
                    />
                  </path>
                </g>
              </svg>
            )}
          </div>
          <span className="capitalize">
            {playerChoice ? choiceIdToString(playerChoice) : "Pensando..."}
          </span>
        </div>
      </div>
      <div className="user-input flex gap-2 items-center justify-center">
        {possibleChoices.map((option) => (
          <button
            key={option}
            className="w-[80px] h-[80px] flex flex-col items-center justify-center"
            onClick={handleUserSelect(option)}
          >
            <img src={`/assets/${option}.webp`} className="w-full" />
            <span className="text-[12px] leading-none mt-1">
              Elegir {choiceIdToString(option)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
