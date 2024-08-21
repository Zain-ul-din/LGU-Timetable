import { Encoding, createDecipheriv } from 'crypto';
import sha256 from 'crypto-js/sha256';

const getCredentials = () => ({
  key: Buffer.from(process.env.OPEN_DB_KEY || '', 'hex'),
  iv: Buffer.from(process.env.OPEN_DB_IV || '', 'hex')
});

export function decrypt<T = any>({
  algo,
  encoding,
  crypted
}: {
  algo: string;
  encoding: Encoding;
  crypted: string;
}) {
  const { key, iv } = getCredentials();
  const decipher = createDecipheriv(algo, key, iv);
  let decrypted = decipher.update(crypted, encoding, 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted) as T;
}

export function hashStr(str: string) {
  return sha256(str).toString();
}
