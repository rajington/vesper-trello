import fileHelper from './fileHelper';

const getPictures = files =>
  files
    .filter(fileHelper.isPicture)
    .reduce(
      (map, picture) =>
        map.set(picture.webkitRelativePath, picture)
    , new Map());

const createNotes = (files, pictures) =>
  files
    .filter(fileHelper.isNote);

export default {
  parseFiles(files) {
    const filteredFiles = Array.from(files)
      .filter(fileHelper.isVesperExport)
      .filter(fileHelper.isNotDSStore);

    if(filteredFiles.length === 0) {
      throw new Error('Could not find any notes.');
    }

    const pictures = getPictures(filteredFiles);
    const notes = createNotes(filteredFiles, pictures);

    return notes;
  }
}
