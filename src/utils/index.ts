export const getRandomNumberByInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const choiceIdToString = (choiceId: "rock" | "paper" | "scissors" | null): "piedra" | "papel" | "tijeras" | "" => {
  switch (choiceId) {
    case "rock":
      return "piedra"; 
    case "paper":
      return "papel";
    case "scissors":
      return "tijeras"
    default:
      return ""; 
  }
}

export const moodIdToString = (moodId: "happy" | "neutral" | "angry" | null): "feliz" | "neutral" | "enojado" | "" => {
  switch (moodId) {
    case "happy":
      return "feliz"; 
    case "neutral":
      return "neutral";
    case "angry":
      return "enojado"
    default:
      return ""
  }
}