const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const tempClient = {
    nome: "Silas",
    email: "silas@gmail.com",
    celular: "73911112222",
    cidade: "Salvador"
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
        closeModal();
        console.log("Cadastrando Cliente");
    }
}

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveClient);