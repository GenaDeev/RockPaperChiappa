import type { StateUpdater, Dispatch } from "preact/hooks";

export type GameProps = {
  setUserScore: Dispatch<StateUpdater<number>>;
  setGameActive: Dispatch<StateUpdater<boolean>>;
};

export type Character = {
  id: string;
  name: string;
  messages: {
    happy: string[];
    neutral: string[];
    angry: string[];
  };
  sprites: {
    happy: number;
    neutral: number;
    angry: number;
  };
};