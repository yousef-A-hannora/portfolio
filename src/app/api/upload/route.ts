import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { auth } from '@/auth';
import { createPresignedUpload, publicUrlForKey } from '@/lib/r2';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

const uploadSchema = z.object({
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'], {
    errorMap: () => ({ message: 'Only JPG, PNG, WebP, GIF and AVIF images are allowed.' }),
  }),
  size: z
    .number()
    .int()
    .positive()
    .max(MAX_FILE_SIZE, 'Image must be 10 MB or smaller.'),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = uploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid upload.' }, { status: 400 });
  }

  const { contentType, size } = parsed.data;
  const key = `projects/${new Date().getFullYear()}/${randomUUID()}.${EXTENSIONS[contentType]}`;

  try {
    const uploadUrl = await createPresignedUpload({ key, contentType, contentLength: size });
    return NextResponse.json({ uploadUrl, publicUrl: publicUrlForKey(key) });
  } catch (error) {
    console.error('Failed to create presigned upload URL:', error);
    return NextResponse.json({ error: 'Upload is not configured correctly on the server.' }, { status: 500 });
  }
}
