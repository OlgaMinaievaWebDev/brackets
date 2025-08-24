module.exports = function check(str, bracketsConfig) {
  const BRACKET_OPEN = new Set();
  const BRACKET_PAIR = {};
  const SAME_SYMBOLS = new Set();

  bracketsConfig.forEach(([open, close]) => {
    BRACKET_OPEN.add(open);
    BRACKET_PAIR[close] = open;
    if (open === close) SAME_SYMBOLS.add(open);
  });

  const stack = [];
  let isValid = true;

  str.split('').every((char) => {
    if (SAME_SYMBOLS.has(char)) {
      if (stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (BRACKET_OPEN.has(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        isValid = false;
        return false; // остановка every
      }
      const topCharInStack = stack[stack.length - 1];
      if (BRACKET_PAIR[char] === topCharInStack) {
        stack.pop();
      } else {
        isValid = false;
        return false;
      }
    }
    return true;
  });

  return isValid && stack.length === 0;
};
