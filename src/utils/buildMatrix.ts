export const makeMatrix = (input: string): string[][] => {
  let lines = input.split("\n");

  lines = lines.filter((line) => line !== "");

  const matrix = lines.map((line) => line.replace(";", "").replaceAll(",", "").split(" "));

  return matrix;
}