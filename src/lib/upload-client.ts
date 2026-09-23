export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export async function uploadImage(file: File): Promise<string> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only JPG, PNG, WebP, GIF and AVIF images are allowed.');
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image must be 10 MB or smaller.');
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType: file.type, size: file.size }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    uploadUrl?: string;
    publicUrl?: string;
    error?: string;
  };

  if (!response.ok || !payload.uploadUrl || !payload.publicUrl) {
    throw new Error(payload.error ?? 'Could not start the upload.');
  }

  const upload = await fetch(payload.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!upload.ok) {
    throw new Error('Upload to storage failed. Check your R2 bucket CORS settings.');
  }

  return payload.publicUrl;
}
