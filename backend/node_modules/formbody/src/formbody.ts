import { FormbodyFile, FormbodyItem, Formbody as Interface } from './types';

export class Formbody implements Interface {
  body: FormbodyItem[] = [];

  get(key: string): string | undefined {
    const item = this.body.find((item) => item.field === key);

    return item?.value;
  }

  file(key: string): FormbodyFile | undefined {
    const item = this.body.find((item) => item.field === key);

    return item?.file;
  }

  has(key: string): boolean {
    return this.get(key) !== void 0 || this.file(key) !== void 0;
  }

  select(fields: string[]): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    for (const field of fields) {
      const value = this.get(field);
      if (value !== void 0) {
        result[field] = value;
      }
    }

    return result;
  }
}
