export const getFirstLetter = (words) => {
  if (!words) {
    return "";
  }
  return words.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "");
};
