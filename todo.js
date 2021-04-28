let indexs = [];
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);
const list = document.getElementById('list');
const pagaSize = 3;
initialDrow();
function initialDrow() {
    console.log(todos);
    todos.forEach(e => {
        add(e.title);
        if (e.done) {
            toggleCheck(indexs.length - 1);
        }
    });
}
function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function add(title) {
    const input = document.getElementById('text');
    let text = input.value;
    if (title) {
        text = title;
    }
    console.log(text);
    if (text !== '') {
        const index = indexs.push(text) - 1;
        list.innerHTML = `<div class="listItem filtered" id="${index}"><div>${text}</div>
    <div>
        <button class="actions check" onclick="toggleCheck(${index})">✓</button>
        <button class="actions edit" onclick="edit(${index})" >✎</button>
        <button class="actions delete" onclick="deleteItem(${index})">X</button>
    </div>
</div>` + list.innerHTML;
        input.value = '';
        regeneratePaginator();
    }
    ;
    if (!title) {
        todos.push({
            title: text,
            done: false
        });
        save();
    }
}
function deleteItem(index) {
    const listItem = document.getElementById(index.toString());
    const title = listItem.firstChild.innerText;
    listItem.remove();
    regeneratePaginator();
    todos = todos.filter(el => {
        return el.title !== title;
    });
    console.log(todos);
    save();
}
function toggleCheck(index) {
    const listItem = document.getElementById(index.toString());
    const text = listItem.firstChild;
    const todo = todos.find(el => {
        return el.title === text.innerText;
    });
    console.log(todo);
    if (text.style.textDecoration === 'line-through') {
        text.style.textDecoration = 'none';
        listItem.classList.remove('done');
        todo.done = false;
    }
    else {
        todo.done = true;
        text.style.textDecoration = 'line-through';
        listItem.classList.add('done');
    }
    ;
    save();
}
function edit(index) {
    const listItem = document.getElementById(index.toString());
    const firstChild = listItem.firstChild;
    if (firstChild.tagName !== 'INPUT') {
        const firstValue = firstChild.innerHTML;
        const todo = todos.find(el => {
            return el.title === firstValue;
        });
        listItem.firstChild.remove();
        console.log(firstValue);
        const input = document.createElement('input');
        input.value = firstValue;
        input.onkeyup = (e) => {
            if (e.keyCode === 13) {
                console.log(input.value);
                const secondValue = input.value;
                input.remove();
                const newText = document.createElement("div");
                newText.innerText = secondValue;
                listItem.insertBefore(newText, listItem.firstChild);
                todo.title = secondValue;
                save();
                if (todo.done) {
                    toggleCheck(index);
                }
            }
        };
        listItem.insertBefore(input, listItem.firstChild);
    }
}
function onClear() {
    list.innerHTML = '';
    indexs = [];
    let filters = getElementsByClassName('filter');
    filters.forEach((element) => {
        element.classList.remove('active-filter');
    });
    document.getElementById('all').classList.add('active-filter');
    todos = [];
    save();
}
function done() {
    const listItems = getElementsByClassName('listItem');
    listItems.forEach((element) => {
        element.classList.remove('filtered');
        element.style.display = 'none';
    });
    let doneItems = getElementsByClassName('done');
    doneItems.forEach((element) => {
        element.classList.add('filtered');
        element.style.display = 'flex';
    });
    let filters = getElementsByClassName('filter');
    filters.forEach((element) => {
        element.classList.remove('active-filter');
    });
    document.getElementById('done').classList.add('active-filter');
    regeneratePaginator();
}
function allin() {
    const listItems = getElementsByClassName('listItem');
    listItems.forEach((element) => {
        element.classList.add('filtered');
        element.style.display = 'flex';
    });
    const filters = getElementsByClassName('filter');
    filters.forEach((element) => {
        element.classList.remove('active-filter');
    });
    document.getElementById('all').classList.add('active-filter');
    regeneratePaginator();
}
function uncomplited() {
    const listItems = getElementsByClassName('listItem');
    listItems.forEach((element) => {
        element.classList.add('filtered');
        element.style.display = 'flex';
    });
    const doneItems = getElementsByClassName('done');
    doneItems.forEach((element) => {
        element.classList.remove('filtered');
        element.style.display = 'none';
    });
    const filters = getElementsByClassName('filter');
    filters.forEach((element) => {
        element.classList.remove('active-filter');
    });
    document.getElementById('uncomplited').classList.add('active-filter');
    regeneratePaginator();
}
function regeneratePaginator() {
    const listItemsLength = document.getElementsByClassName('filtered').length;
    const numofPages = Math.ceil(listItemsLength / pagaSize);
    const paginator = document.getElementById('paginator');
    paginator.innerHTML = '';
    for (let i = 1; i <= numofPages; i++) {
        paginator.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
    changePage(1);
}
function changePage(page) {
    const listItems = getElementsByClassName('filtered');
    const startIndex = (page - 1) * pagaSize;
    const pageItems = listItems.slice(startIndex, startIndex + pagaSize);
    listItems.forEach((element) => {
        element.style.display = 'none';
    });
    pageItems.forEach((element) => {
        element.style.display = 'flex';
    });
}
function enterOn(e) {
    if (e.keyCode === 13) {
        add();
    }
}
function getElementsByClassName(className) {
    return Array.from(document.getElementsByClassName(className));
}
