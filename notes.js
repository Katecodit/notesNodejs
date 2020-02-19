const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const notePath = path.join(__dirname, 'notes.json')

const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err)
        }

        try {
            callback(JSON.parse(content))
        } catch (e) {
            callback([])
        }
        console.log(content)
    })
}

const saveNotes = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) {
            throw new Error(err)
        }
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note =>  note.title === title)

        if (dublicateNote) {
            console.log(chalk.red.inverse('Заметка с таким названием уже существеует'))
        } else {
            notes.push({ title, text})
            saveNotes(notes)
            console.log(chalk.green.inverse('Заметка добавлена'))
        }
    })
}


const listNotes = () => {
    getNotes(notes => {
        if (notes.length) {
            console.log(chalk.inverse('Ваши заметки'))
            notes.forEach((note) => {
                console.log(note.title)
            })
        } else {
            console.log(chalk.blue('Заметок пока нет. Добавьте первую'))
        }
    })
}

const readNote = (title) => {
    getNotes(notes => {
        const note = notes.find(n => n.title === title)
        if (note) {
            console.log(chalk.inverse(note.title))
            console.log(note.text)
        } else {
            console.log(chalk.red.inverse(`Заметка с названием "$title" не найдена`))
        }

    })
}

const removeNote = (title) => {
    getNotes(notes => {
        const updateNotes = notes.filter(note => note.title !== title)

        if (updateNotes.length !== notes.length) {
            saveNotes(updateNotes)
            console.log(chalk.green('Заметка с названием ${title} была удалена успешно'))

        } else {
            console.log(chalk.red.inverse(`Заметка с названием "$title" не найдена`))
        }
    })
}

module.exports = {
    addNote, listNotes, readNote, removeNote
}
