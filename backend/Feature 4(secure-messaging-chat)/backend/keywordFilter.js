const blockedWords = ["spam", "scam", "abuse", "offensive"];

function filterMessage(message) {
  return !blockedWords.some(word => message.toLowerCase().includes(word));
}

module.exports = { filterMessage };
