import 'server-only';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let client: S3Client | null = null;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getClient() {
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${requireEnv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
        secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }
  return client;
}

function publicBaseUrl() {
  return requireEnv('R2_PUBLIC_URL').replace(/\/$/, '');
}

export function publicUrlForKey(key: string) {
  return `${publicBaseUrl()}/${key}`;
}

export function isR2Url(url: string) {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');
  return !!base && url.startsWith(`${base}/`);
}

export function keyFromPublicUrl(url: string): string | null {
  if (!isR2Url(url)) return null;
  return url.slice(publicBaseUrl().length + 1) || null;
}

export async function createPresignedUpload(params: { key: string; contentType: string; contentLength: number }) {
  const command = new PutObjectCommand({
    Bucket: requireEnv('R2_BUCKET'),
    Key: params.key,
    ContentType: params.contentType,
    ContentLength: params.contentLength,
  });
  return getSignedUrl(getClient(), command, { expiresIn: 300 });
}

export async function deleteR2Objects(urls: Array<string | null | undefined>) {
  const keys = Array.from(
    new Set(urls.map((url) => (url ? keyFromPublicUrl(url) : null)).filter((key): key is string => !!key)),
  );
  if (keys.length === 0) return;

  const bucket = requireEnv('R2_BUCKET');
  const results = await Promise.allSettled(
    keys.map((key) => getClient().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))),
  );
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Failed to delete R2 object "${keys[index]}":`, result.reason);
    }
  });
}
