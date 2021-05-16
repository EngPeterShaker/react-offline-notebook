import React, { useEffect } from "react";
import checkLevDistance from "../utils/checkLevDistance";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import checkWordFreq from "../utils/checkWordFreq";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));
interface Props {}

const Editor = (props: Props) => {
	const classes = useStyles();
	const [textValue, setTextValue] = React.useState("Words Wor word");
	const [refWord, setRefWord] = React.useState("");
	const [wordFreq, setwordFreq] = React.useState(0);
	const [similarity, setSimilarity] = React.useState<string[]>([]);

	const handleChangetTextValue = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setTextValue(event.target.value);
	};

	const handleChangRefWord = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setRefWord(event.target.value);
	};

	useEffect(() => {
		if (!!refWord) {
			const wordFreq2 = checkWordFreq({ textValue, refWord });
			setwordFreq(wordFreq2);
			const mapped = textValue.split(" ").map((str) => {
				return checkLevDistance(refWord, str);
			});
			setSimilarity(mapped);
		}
	}, [refWord, textValue]);

	// const test = checkLevDistance("hitting", "kit");

	return (
		<form className={classes.root} noValidate autoComplete="off">
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
					onChange={handleChangRefWord}
				/>
			</div>
			<p>frequency :{wordFreq}</p>
			<p>
				Similar word :
				{similarity
					.filter((word) => word !== "")
					.map((word) => {
						return <Chip label={word} />;
					})}
			</p>
		</form>
	);
};

export default Editor;
