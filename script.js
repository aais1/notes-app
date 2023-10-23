const addBtn = document.getElementById('add')
const deletAll=document.querySelector('.delt');
const notes = JSON.parse(localStorage.getItem('notes'))
let counter=0;
if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())
deletAll.addEventListener('click',deleteAllNotes)

function addNewNote(text = '') {
    counter++;
    checkNotes()
    
    const note = document.createElement('div')
    note.classList.add('note','scaleUp')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" style="resize: none;" placeholder="Enter Note"></textarea>
    `
   
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text;
    
    main.innerHTML = marked(text);
    textArea.focus();

    deleteBtn.addEventListener('click', () => {
        counter--;
        checkNotes()
        note.remove()
        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function deleteAllNotes(){
    counter=0;
    checkNotes()
    const noteElements = document.querySelectorAll('.note');

    noteElements.forEach(note => {
        note.remove();
    });

    
    notes.length = 0;


    updateLS();
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

function checkNotes(){
    counter>=2?deletAll.classList.remove('hidden'):deletAll.classList.add('hidden');
}