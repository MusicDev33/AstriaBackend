export function generateProfileURL(name: string) {
  let newName = name.replace(/\s+/g, '-').toLowerCase();
  newName = newName.replace(/[&^%$#@!<>_]/g, '');
  return newName;
}
