import { Request, Response ,NextFunction} from 'express';

export const justifyText = (req: Request, res: Response,next: NextFunction) => {
  const text = req.body.text;
  
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
    if ((line + word).length <= 80) {
      line += word + ' ';
    } else {
      lines.push(line.trim());
      line = word + ' ';
    }
  });

  if (line) {
    lines.push(line.trim());
  }

  return lines.map(line => adjustLine(line)).join('\n');
};

const adjustLine = (line: string): string => {
  let spacesToAdd = 80 - line.length;
  let words = line.split(' ');

  while (spacesToAdd > 0 && words.length > 1) {
    for (let i = 0; i < words.length - 1 && spacesToAdd > 0; i++) {
      words[i] += ' ';
      spacesToAdd--;
    }
  }

  return words.join(' ');
};
