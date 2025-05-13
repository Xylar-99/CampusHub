export interface FormbodyFile {
  buffer: Buffer;
  filename: string;
  size?: number;
  mimetype?: string;
}

export interface FormbodyItem {
  field: string;
  value?: string;
  file?: FormbodyFile;
}

export interface Formbody {
  body: FormbodyItem[];
  get(key: string): string | undefined;
  file(key: string): FormbodyFile | undefined;
  has(key: string): boolean;
  select(fields: string[]): { [key: string]: string };
}
