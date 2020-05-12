export function generateCourseID(courseName: string) {
  let newName = courseName.replace(/\s+/g, '-').toLowerCase();
  newName = newName.replace(/[&^%$#@!<>_]/g, '');
  return newName;
}
