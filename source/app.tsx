import React, {useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	const [commands, setCommands] = useState<string[]>([]);
	const [currentInput, setCurrentInput] = useState('');
	const {exit} = useApp();

	useInput((input, key) => {
		if (key.ctrl && input === 'c') {
			exit();
			return;
		}

		if (key.return) {
			if (currentInput.length > 0) {
				setCommands(prev => [...prev, currentInput]);
				setCurrentInput('');
			}
			return;
		}

		if (key.backspace || key.delete) {
			setCurrentInput(prev => prev.slice(0, -1));
			return;
		}

		if (input && !key.ctrl && !key.meta && !key.shift) {
			setCurrentInput(prev => prev + input);
		}
	});

	return (
		<Box flexDirection="column">
			<Text>
				Hello, <Text color="green">{name}</Text>! Type commands and press Enter. Press Ctrl+C to exit.
			</Text>
			<Text> </Text>

			{commands.map((command, index) => (
				<Text key={index}>
					You just wrote: {command}
				</Text>
			))}

			<Text>
				&gt; {currentInput}<Text color="gray">█</Text>
			</Text>
		</Box>
	);
}
