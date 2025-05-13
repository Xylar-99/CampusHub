import { NextFunction, Request, Response } from 'express';
import { inspect } from 'util';
import Busboy from 'busboy';
import { Formbody } from './formbody';

export const formbody = (req: Request, res: Response, next: NextFunction) => {
  if (req.method.toUpperCase() !== 'POST' || !req.is('multipart/form-data')) {
    return next();
  }

  const busboy = new Busboy({ headers: req.headers });
  const formbody = new Formbody();

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (!filename) {
      return;
    }

    const chunks: Uint8Array[] = [];

    file.on('data', (chunk) => {
      chunks.push(chunk);
    });

    file.on('error', (err) => {
      res.status(500).json({
        code: 'form_filter_error',
      });
    });

    file.on('end', () => {
      const finalBuffer = Buffer.concat(chunks);

      formbody.body.push({
        field: fieldname,
        file: {
          buffer: finalBuffer,
          size: finalBuffer.length,
          filename: filename,
          mimetype: mimetype,
        },
      });
    });
  });

  busboy.on('field', function (fieldname, val) {
    formbody.body.push({
      field: fieldname,
      value: inspect(val).replace(/(^')|('$)/g, ''),
    });
  });

  busboy.on('finish', function () {
    req.form = formbody;
    next();
  });

  req.pipe(busboy);
};
