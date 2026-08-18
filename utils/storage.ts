import { browser } from "wxt/browser";

const INDEX_KEY = "_yt_cc_notes_index";

export interface NoteData {
  text: string;
  title?: string;
  thumbnailUrl?: string;
  /** ISO timestamp of last metadata sync with YouTube; absent/null = never synced. */
  syncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

function isOldFormat(value: unknown): value is string {
  return typeof value === "string";
}

function migrateValue(videoId: string, value: string): NoteData {
  const now = new Date().toISOString();
  const note: NoteData = {
    text: value,
    createdAt: now,
    updatedAt: now,
  };
  browser.storage.local.set({ [videoId]: note });
  return note;
}

async function getIndex(): Promise<string[]> {
  const result = await browser.storage.local.get(INDEX_KEY);
  return (result[INDEX_KEY] as string[]) ?? [];
}

async function setIndex(ids: string[]): Promise<void> {
  await browser.storage.local.set({ [INDEX_KEY]: ids });
}

export async function getAllNotes(): Promise<[string, NoteData][]> {
  const all = await browser.storage.local.get(null);
  const ids = await getIndex();
  const entries: [string, NoteData][] = [];
  for (const id of ids) {
    const raw = all[id];
    if (!raw) continue;
    if (isOldFormat(raw)) {
      const migrated = migrateValue(id, raw);
      entries.push([id, migrated]);
    } else {
      entries.push([id, raw as NoteData]);
    }
  }
  return entries;
}

export async function getNote(
  videoId: string,
): Promise<NoteData | null> {
  const raw = (await browser.storage.local.get(videoId))[videoId];
  if (!raw) return null;
  if (isOldFormat(raw)) return migrateValue(videoId, raw);
  return raw as NoteData;
}

export async function saveNote(
  videoId: string,
  text: string,
): Promise<void> {
  const existing = await getNote(videoId);
  const now = new Date().toISOString();
  const note: NoteData = {
    text,
    title: existing?.title,
    thumbnailUrl: existing?.thumbnailUrl,
    syncedAt: existing?.syncedAt,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  await browser.storage.local.set({ [videoId]: note });

  const index = await getIndex();
  if (!index.includes(videoId)) {
    index.push(videoId);
    await setIndex(index);
  }
}

export async function deleteNote(videoId: string): Promise<void> {
  await browser.storage.local.remove(videoId);

  const index = await getIndex();
  const filtered = index.filter((id) => id !== videoId);
  if (filtered.length !== index.length) {
    await setIndex(filtered);
  }
}

export async function updateNoteMeta(
  videoId: string,
  meta: { title?: string; thumbnailUrl?: string },
): Promise<void> {
  const note = await getNote(videoId);
  if (!note) return;
  if (meta.title !== undefined) note.title = meta.title;
  if (meta.thumbnailUrl !== undefined) note.thumbnailUrl = meta.thumbnailUrl;
  note.syncedAt = new Date().toISOString();
  await browser.storage.local.set({ [videoId]: note });
}
