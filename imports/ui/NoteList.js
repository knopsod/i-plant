import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes'
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

// 1. Create new file. Setup default export for functional component
// 2. Pick some text
// 3. Setup NoteList to render empty note message when notes array is empty

export const NoteList = (props) => {
  return (
    <div>
    <NoteListHeader />
    { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
      {props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note} />
      })}
      NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
