import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import checkLevDistance from "../utils/checkLevDistance";
import checkWordFreq from "../utils/checkWordFreq";
import usePersistedState from "../utils/usePersistedState";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

const Editor = () => {
	const classes = useStyles();
	const [textValue, setTextValue] = React.useState("Words Wor word");
	const [refWord, setRefWord] = React.useState("");
	const [wordFreq, setwordFreq] = React.useState(0);
	const [similarity, setSimilarity] = React.useState<string[]>([]);
	const [notebook, setNotebook] = usePersistedState("notebook", {
		refWord,
		textValue,
	});
	useEffect(() => {
		const { refWord, textValue } = notebook;
		setTextValue(textValue);
		setRefWord(refWord);
	}, [notebook]);

	const handleChangetTextValue = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		const targetValue = event.target.value;
		setTextValue(targetValue);
		setNotebook({ refWord, textValue: targetValue });
	};

	const handleChangeRefWord = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		const targetValue = event.target.value;
		setRefWord(targetValue);
		setNotebook({ textValue, refWord: targetValue });
	};

	useEffect(() => {
		if (!!refWord) {
			const wordFreq2 = checkWordFreq({ textValue, refWord });
			setwordFreq(wordFreq2);
			const mapped = textValue
				.split(" ")
				.filter((i) => !!i)
				.map((str) => checkLevDistance(refWord, str));
			
			setSimilarity(mapped);
		}
	}, [refWord, textValue]);

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			data-testid="editor-form"
		>
			<div>
				<TextField
					id="outlined-textarea"
					label="Multiline Placeholder"
					placeholder="Placeholder"
					multiline
					variant="outlined"
					value={textValue}
					onChange={handleChangetTextValue}
				/>
			</div>
			<div>
				<TextField
					id="outlined-basic"
					label="Outlined"
					variant="outlined"
					value={refWord}
					onChange={handleChangeRefWord}
				/>
			</div>
			<p>frequency :{wordFreq}</p>
			<div>
				Similar word/s :
				{similarity
					.filter((word) => word !== "")
					.map((word) => {
						return <Chip key={word} label={word} />;
					})}
			</div>
		</form>
	);
};

export default Editor;
