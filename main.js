const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient));

//CRUD - Create
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client); 
    setLocalStorage(dbClient);
}

//CRUD - Read
const readClient = () => getLocalStorage();

//CRUD - Update
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
} 

//CRUD - Delete
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index,1);
    setLocalStorage(dbClient);
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

//Interações
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client);
        updateTable();
        closeModal();
        console.log("Cadastrando Cliente");
    }
}

const createRow = (client, index) => {
    if (!client) {
        console.log('teste');
        return;
    } 
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    console.log("True")
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const editDelete = (event) => {
    if (event.target.type == "button") {

        const [action, index] = event.target.id.split("-");
        if (action == "edit") {
            console.log("Editando o cliente!");
        } else {
            console.log("Deletando o cliente!");
        }

        console.log(action, index)
    }
}

updateTable();

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);