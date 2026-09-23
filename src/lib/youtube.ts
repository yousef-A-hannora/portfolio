const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

export function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^(www|m|music)\./, '');
    let id: string | null = null;

    if (host === 'youtu.be') {
      id = parsed.pathname.slice(1).split('/')[0] ?? null;
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') {
        id = parsed.searchParams.get('v');
      } else {
        const match = parsed.pathname.match(/^\/(embed|shorts|live|v)\/([^/?#]+)/);
        if (match) id = match[2];
      }
    }

    return id && YOUTUBE_ID_REGEX.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

export function getYouTubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
