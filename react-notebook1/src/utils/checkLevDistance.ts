/**
 * Summary : function that check levestien distance
 *
 * @param {string} refWord : the reference word to check other words with it
 * @param	{string} word to be checked the ditance against refWord
 *
 * @returns the word if it pass the predefined levestien disatnce OR empty string
 * */

const MAX_lEV_DISTANCE = 1;
const checkLevDistance = (refWord = "", word = ""): string => {
	//fail early
	if (typeof refWord !== "string" || typeof word !== "string") {
		return "";
	}

	const track: number[][] = Array(word.length + 1)
		.fill(null)
		.map(() => Array(refWord.length + 1).fill(null));

	for (let i = 0; i <= refWord.length; i += 1) {
		track[0][i] = i;
	}
	for (let j = 0; j <= word.length; j += 1) {
		track[j][0] = j;
	}

	for (let j = 1; j <= word.length; j += 1) {
		for (let i = 1; i <= refWord.length; i += 1) {
			const deletion = track[j][i - 1] + 1;
			const insertion = track[j - 1][i] + 1;

			const indicator = refWord[i - 1] === word[j - 1] ? 0 : 1;
			const substitution = track[j - 1][i - 1] + indicator;

			track[j][i] = Math.min(deletion, insertion, substitution);
		}
	}
	const levDistance = track[word.length][refWord.length];
	return levDistance === MAX_lEV_DISTANCE ? word : "";
};

export default checkLevDistance;
