//Objeto Despesa
class Expenses {
    constructor(year, month, day, type, drescription, moneyValue) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.drescription = drescription;
        this.moneyValue = moneyValue;
    }

    dataValidate() {

        for (let i in this) {

            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }

            return true;
                
        }
    }
};

//Objeto Data Base
class Db {
    constructor() {
        let id = localStorage.getItem('id');
        //Verificar o primeiro Id, caso seja nulo (sem id).
        //Insere um id de índice 0 com o método setItem.
        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    //Verificar se existe um Id no Local Storage
    getNextId() {
        let nextId = localStorage.getItem('id');
        //getItem => recuperar um dado no Local Storage

        return parseInt(nextId) + 1;
    }

    sendToLocalStorage(exp) {
        //Adicionar no Local Storage
        let id = this.getNextId();

        localStorage.setItem(id, JSON.stringify(exp));
        //setItem => inserir um dado no Local Storage

        localStorage.setItem('id', id);
    }

    recoverExpenses() {
        //Array de despesas
        let expenses = Array();


        let id = localStorage.getItem('id');
        //Recuperar despesas do Local Storage pelo índice
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let expense = JSON.parse(localStorage.getItem(i));

            //Índices removidos/ pular índice removido
            if (expense === null) {
                continue;
            }
            //Adiciona despesa no Array
            expenses.push(expense);
        }

        return expenses
    }
};

let db = new Db();

function expensesRegister() {
    //Valores dos campos
    let year = document.getElementById('ano');
    let month = document.getElementById('mes');
    let day = document.getElementById('dia');
    let type = document.getElementById('tipo');
    let drescription = document.getElementById('descricao');
    let moneyValue = document.getElementById('valor');  
    
    let expenses = new Expenses(
        year.value,
        month.value,
        day.value,
        type.value,
        drescription.value,
        moneyValue.value
    );
    
    if(expenses.dataValidate()) {
        //Enviar values para o Local Storage
        db.sendToLocalStorage(expenses);

        //Mudar o modal dinamicamente
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso.';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso.';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';
        
        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show');

        //Limpar campos
        year.value = ''
        month.value  = ''
        day.value = ''
        type.value = ''
        drescription.value = ''
        moneyValue.value = ''

    } else {
        //Mudar o modal dinamicamente
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Verifique se os campos foram preenchidos corretamente.';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-danger';

        //dialog de erro
        $('#modalRegistraDespesa').modal('show');
    }
    
}

//Carregar a lista de despesas
function expensesList() {
    let expenses = Array();

    expenses = db.recoverExpenses();

    //selecionando o tbody da tabela HTML
    let expensesList = document.getElementById('listaDespesas');

    //percorrer o Array despesas
    expenses.forEach(exp => {
        //Criando o TR
        let row = expensesList.insertRow();
        //Criando o Td
        row.insertCell(0).innerHTML = `${exp.day}/${exp.month}/${exp.year}`;

        //Ajudar tipo
        switch (exp.type) {
            case '1':
                exp.type = 'Alimentação'
            break;
            case '2':
                exp.type = 'Educação'
            break;
            case '3':
                exp.type = 'Lazer'
            break;
            case '4':
                exp.type = 'Saúde'
            break;
            case '5':
                exp.type = 'Transporte'
            break;
        }

        row.insertCell(1).innerHTML = exp.type;
        row.insertCell(2).innerHTML = exp.drescription;
        row.insertCell(3).innerHTML = exp.moneyValue;
    })
}