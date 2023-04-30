

const NoteForm = ({addNote, newNote, setNewNote}) => {
  return (
    <form onSubmit={addNote}>
      <input 
        value={newNote}
        onChange={({target})=>setNewNote(target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm