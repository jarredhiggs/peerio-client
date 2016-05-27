// THIS FILE IS COMPILED WITH BABEL FROM application/jsx SOURCE, DON'T EDIT .js FILE

Peerio.Notes = {};
(function() {
    'user strict';

    var ev = new Event('NotesUpdated');

    Peerio.Notes.fireUpdated = function() {
        document.dispatchEvent(ev);
    }

    Peerio.Notes.create = function(name, text) {
        Peerio.user.notes.push({id: Date.now(), name: name, text: text});
        Peerio.Notes.fireUpdated();
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        document.getElementsByClassName('notesSidebarAddNote')[0].addEventListener('click', Peerio.Notes.create.bind(null, 'new note', ''));
    });
})();

Peerio.UI.controller('notesSection', function() {
    'use strict';
    console.log('NOTES section');
    var editorOptions = {
        toolbar: {
            buttons: [
                'bold', 'italic', 'underline', 'strikethrough',
                //'subscript',
                //'superscript',
                //'orderedlist',
                //'unorderedlist',
                //'indent',
                //'outdent',
                //'h1',
                'h2',
                'h3',
                //'h4',
                //'justifyLeft',
                //  'justifyCenter',
                //    'justifyRight',
                //    'justifyFull',
                //    'quote',
                //    'pre',
                'removeFormat'
            ]
        }
    };
    //--------------------------------------------------------------------------
    var NotesView = React.createClass({
        getInitialState: function() {
            return {selectedId: null};
        },
        handleSelected: function(id) {
            this.setState({selectedId: id});
        },
        componentDidMount: function() {
            // we only mount notes view once per app session lifetime
            document.addEventListener('NotesUpdated', this.forceUpdate.bind(this, null));
        },
        render: function() {
            if (!Peerio.user || !Peerio.user.notes)
                return;

            return <div style={{
                display: 'table-row'
            }}>
                <NoteList selectedId={this.state.selectedId} onSelected={this.handleSelected}></NoteList>
                <Note selectedId={this.state.selectedId}></Note>
            </div>;
        }
    });
    //--------------------------------------------------------------------------
    var Note = React.createClass({
        render: function() {
            var id = this.props.selectedId;
            if (id == null)
                return null;

            var note = Peerio.user.notes.find(function(n) {
                return n.id === id
            });
            if (!note)
                return null;

            return <div className="note">
                <input type="text" className="note-name" placeholder='Note name' value={note.name}/>
                <TextEditor options={editorOptions} id={this.props.selectedId} text={note.text}></TextEditor>
            </div>;
        }
    });
    //--------------------------------------------------------------------------
    var NoteList = React.createClass({

        render: function() {
            return <div className="note-list">
                <div className="note-toolbar">
                    <button className="fontAwesome clear" data-utip-l10n="remove" data-utip-gravity="ne" data-utip="Remove">&#xf014;</button>
                </div>
                {Peerio.user.notes.map(function(note) {
                    return <NoteListItem key={note.id} id={note.id} name={note.name} onSelected={this.props.onSelected} selected={this.props.selectedId == note.id}></NoteListItem>
                }, this)}
            </div>;
        }
    });

    var NoteListItem = React.createClass({
        handleSelected: function() {
            this.props.onSelected(this.props.id);
        },
        render: function() {
            var classes = "note-list-item" + (this.props.selected
                ? " selected"
                : "");
            return <div className ={classes} onClick={this.handleSelected}>{this.props.name}</div>;
        }
    });

    //--------------------------------------------------------------------------
    React.render(React.createElement(NotesView, null), document.getElementById('notesView'));
});