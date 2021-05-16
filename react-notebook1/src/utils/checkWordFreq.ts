/**
 * Summary : function that checks the frequency of a given word in a text
 *
 * @param	{string} textValue to be checked the distance against refWord
 * @param {string} refWord  the reference word to check other words against it
 *
 * @returns {number} the frequencey of refWord inside the text 
 * */

interface Params {
	textValue: string;
	refWord: string;
}
interface WordObject {
	[index: string]: number;
}

const checkWordFreq = (params: Params): number => {
	const { textValue = "", refWord = "" } = params;
	const wordArray = textValue.split(/[ .?!,*'"]/);
	const freqObj = wordArray.reduce((acc: WordObject, curr) => {
		let currentWord = curr.toString();
		if (acc[currentWord]) {
			acc[currentWord] += 1;
		} else if (
			!acc[currentWord]
			// && currentWord !== refWord
		) {
			acc[currentWord] = 1;
		}
		return acc;
	}, {});
	return freqObj[refWord] ?? 0;
};

export default checkWordFreq;
