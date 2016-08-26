import fileHelper from './fileHelper';

const getPictures = files =>
  files
    .filter(fileHelper.isPicture)
    .reduce(
      (map, picture) =>
        map.set(picture.webkitRelativePath, picture)
    , new Map());

const parseNote = async (file, pictures) => {
  const text = await fileHelper.readText(file);

  const lines = text.split('\n');

  const note = {};

  // active or archived
  if (fileHelper.isArchived(file)) {
    note.archived = true;
  }

  // the first line is the title
  note.title = lines.shift();

  // unless it's an untitled photo
  if (note.title === '') {
    note.title = 'Untitled photo'; // what it says in Vesper
  }

  // unused lines
  lines.pop(); // separator
  lines.pop(); // modified date
  lines.pop(); // created date
  lines.pop(); // separator

  // every note has the tags field
  note.tags = lines.pop()
    .replace(/^Tags: /, '') // remove field name
    .split(', ') // break into multiple tags
    .filter(tag => tag); // remove empty tags

  lines.pop(); // separator

  // check for picture field
  if (lines.length >= 2 && lines[lines.length - 1].startsWith('Picture: ')) {
    const pictureLine = lines.pop();
    const pictureName = pictureLine.replace(/^Picture: /, '');
    const pictureFolder = fileHelper.getFolder(note.archived);
    const picturePath = pictureFolder + pictureName;
    note.picture = pictures.get(picturePath);
    lines.pop(); // separator
  }

  // remaining text
  note.text = lines.join('\n');

  return note;
};

const createNotes = (files, pictures) =>
  Promise.all(
    files
      .filter(fileHelper.isNote)
      .map(
        async file => await parseNote(file, pictures)
      )
  );

export const parseFiles = (files) => {
  const filteredFiles = Array.from(files)
    .filter(fileHelper.isVesperExport)
    .filter(fileHelper.isNotDSStore);

  if(filteredFiles.length === 0) {
    throw new Error('Could not find any notes.');
  }

  const pictures = getPictures(filteredFiles);
  const notes = createNotes(filteredFiles, pictures);

  return notes;
};
