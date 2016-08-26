/*global Trello*/

export const authorize = () => {
  Trello.authorize({
    name: 'vesper-trello',
    scope: {
      read: true,
      write: true,
    },
    expiration: '1day',
  });
};

export const authorized = () => {
  Trello.authorize({ interactive: false });
  return Trello.authorized();
};

// promisified version of Trello
const request = (method, url, options) =>
  new Promise((resolve, reject) => Trello[method](url, options, resolve, reject));

// create the Trello Board
const createBoard = () =>
  request('post', '/boards', {
    name: 'Vesper',
    defaultLists: false, // don't include the default lists
  });

// create a list on the Board
const createList = board =>
  request('post', '/lists', {
    name: 'Notes',
    idBoard: board.id,
  });

const createCard = (card, picture) => {
  if(picture) {
    // the official Trello client.js sends everything via JSON, so file uploads don't work
    const body = new FormData();
    body.append('token', Trello.token());
    body.append('key', Trello.key());
    body.append('fileSource', picture);
    Object.keys(card).forEach(key => body.append(key, card[key]));

    return fetch('https://api.trello.com/1/cards', { method: 'POST', body })
      .then(response => response.json());
  } else {
    return request('post', '/cards', card);
  }
}

const archiveCard = card =>
  request('put', `/cards/${card.id}/closed`, { value: true });

// delete all the default labels
const clearLabels = async board => {
  const labels = await request('get', `/boards/${board.id}/labels`);
  return Promise.all(
    labels.map(
      label =>
        request('delete', `/labels/${label.id}`)
    )
  );
};

// Trello's available label colors
const COLORS = ['green', 'yellow', 'red', 'orange', 'purple',
  'blue', 'sky', 'lime', 'pink', 'black'];

// create new labels using the tags from all the notes
const createLabels = (board, tags) =>
  Promise.all(
    tags.map((tag, i) =>
      request('post', `/boards/${board.id}/labels`, {
        name: tag,
        color: COLORS[i % COLORS.length], // variety of colors
      })
    )
  );

// gets all the unique tags from the notes
const getTags = notes => {
  // use Set to prevent duplicate entries
  const tagsSet = new Set();
  for(const note of notes) {
    for(const tag of note.tags) {
      tagsSet.add(tag);
    }
  }
  return Array.from(tagsSet);
}

// delete and create the board's labels
const recreateLabels = async (board, notes) => {
  await clearLabels(board);

  const labels = await createLabels(board, getTags(notes));

  return labels.reduce(
    (map, label) =>
      map.set(label.name, label.id)
  , new Map());
}

export const importNotes = async (notes, updateProgress) => {
  // create a new trello board
  const board = await createBoard();

  const [tagIds, list] = await Promise.all([
    recreateLabels(board, notes), // add tags to the board as labels
    createList(board), // create a new Trello list
  ]);

  let completed = 0;
  updateProgress(completed);

  await Promise.all(
    notes.map(async note => {
      const newCard = {
        name: note.title,
        desc: note.text,
        idList: list.id,
      };

      if (note.tags) {
        newCard.idLabels = note.tags.map(tag => tagIds[tag]);
      }

      let card = await createCard(newCard, note.picture);

      if (note.archived) {
        await archiveCard(card);
      }

      updateProgress(++completed);
      return card;
    })
  );

  return board.shortUrl;
};
