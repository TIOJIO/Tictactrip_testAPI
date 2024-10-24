import { Request, Response, NextFunction } from 'express';

export const justifyText = (req: Request, res: Response, next: NextFunction) => {
  const text = req.body.text;
  
  // Vérification que req.body est une chaîne de caractères
  if (typeof text !== 'string') {
    return res.status(400).send({ error: 'Invalid input, expected a string.' });
  }

  const justifiedText = justify(text);
  res.send(justifiedText);
};

const justify = (text: string): string => {
  const words = text.split(' ');
  let lines: string[] = [];
  let line = '';

  words.forEach(word => {
    // Check if adding the next word exceeds 80 characters
    if ((line + (line ? ' ' : '') + word).length <= 80) {
      line += (line ? ' ' : '') + word; // Only add space if it's not the first word
    } else {
      lines.push(line); // Push the current line
      line = word; // Start a new line with the current word
    }
  });

  if (line) {
    lines.push(line); // Push the last line
  }

  // Justify each line except the last line (since the last line doesn't need justification)
  return lines.map((line, index) => (index === lines.length - 1 ? line : adjustLine(line))).join('\n');
};

const adjustLine = (line: string): string => {
  let spacesToAdd = 80 - line.length;
  let words = line.split(' ');

  // Distribute spaces only if the line has more than one word
  if (words.length > 1) {
    let gaps = words.length - 1;

    // Add spaces evenly between words
    while (spacesToAdd > 0) {
      for (let i = 0; i < gaps && spacesToAdd > 0; i++) {
        words[i] += ' ';
        spacesToAdd--;
      }
    }
  }

  return words.join(' ');
};
