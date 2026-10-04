import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const inside = (path) => { const rel = relative(root, path); return rel !== '..' && !rel.startsWith('..' + '/') && !rel.startsWith('..' + '\\') && !isAbsolute(rel); };
const files = await readdir(root, { recursive: true });
assert(files.includes('index.html'), 'src/index.html est obligatoire.');
for (const name of files.filter((name) => name.endsWith('.html'))) {
  const file = resolve(root, name);
  const html = await readFile(file, 'utf8');
  assert(/<html\b[^>]*lang="fr"/.test(html), `${name} : langue française manquante.`);
  assert(/<title>.+<\/title>/.test(html), `${name} : titre manquant.`);
  assert(/name="viewport"/.test(html), `${name} : viewport manquant.`);
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(value)) continue;
    assert(!value.startsWith('/'), `${name} : utiliser un chemin relatif (${value}).`);
    const [path, fragment] = value.split('#');
    const target = path ? resolve(dirname(file), decodeURIComponent(path.split('?')[0])) : file;
    assert(inside(target), `${name} : chemin hors de src (${value}).`);
    const info = await stat(target).catch(() => null);
    assert(info, `${name} : fichier absent (${value}).`);
    if (fragment && target.endsWith('.html')) {
      const content = target === file ? html : await readFile(target, 'utf8');
      assert(content.includes(`id="${decodeURIComponent(fragment)}"`), `${name} : ancre absente (${value}).`);
    }
  }
}
console.log('Vérification HTML et liens locaux : OK.');
