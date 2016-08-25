export default {
  isVesperExport: file =>
    file.webkitRelativePath.startsWith('Vesper Export ƒ'),

  isNotDSStore: file =>
    !(file.webkitRelativePath.endsWith('.DS_Store')),

  isPicture: file =>
    file.webkitRelativePath.match(/^Vesper Export ƒ\/(Active|Archived) Notes\/Pictures\//),

  isNote: file =>
    file.webkitRelativePath.endsWith('.txt'),

  isArchived: file =>
    file.webkitRelativePath.match(/^Vesper Export ƒ\/Archived Notes\//),

  getFolder: archived =>
    `Vesper Export ƒ/${archived ? 'Archived' : 'Active'} Notes/Pictures/`,

  readText: file => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },
};
