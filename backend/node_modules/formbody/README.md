# formbody

`formbody` is a node.js middleware to handle `multipart/form-data`,
typescript friendly.

## Installation

```bash
npm i formbody
```

## Useabe

_typescript example_

```typescript
import { formbody } from 'formbody';

// ...

app.use(formbody);

app.all('/', (req: Request, res: Response) => {
  console.log(req.form.body);
  console.log(req.form.file('file'));
  console.log(req.form.get('name'));
  console.log(req.form.has('name'));

  // NOTE: this select will not return file type value
  console.log(req.form.select(['name', 'file']));

  res.sendStatus(200);
});
```

## Interfaces

```typescript
interface FormbodyFile {
  buffer: Buffer;
  filename: string;
  size?: number;
  mimetype?: string;
}

interface FormbodyItem {
  field: string;
  value?: string;
  file?: FormbodyFile;
}

interface Formbody {
  body: FormbodyItem[];
  get(key: string): string | undefined;
  file(key: string): FormbodyFile | undefined;
  has(key: string): boolean;
  select(fields: string[]): { [key: string]: string };
}
```
