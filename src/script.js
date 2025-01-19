const tarefaInput = document.getElementById('tarefaInput');
const adicionarBtn = document.getElementById('adicionarBtn');
const lista = document.getElementById('lista');

window.onload = function() {
  document.getElementById("ano").innerHTML = new Date().getFullYear();
  carregarTarefas();
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.forEach(tarefa => {
    const itemTarefa = document.createElement('li');
    itemTarefa.textContent = tarefa.tarefa;
    itemTarefa.classList.toggle('completed', tarefa.concluida);
    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover';
    removerBtn.className = 'btn-remover';
    itemTarefa.addEventListener('click', () => {
      itemTarefa.classList.toggle('completed');
      atualizarTarefa(tarefa, itemTarefa.classList.contains('completed'));
      tarefaInput.focus();
    });

    removerBtn.addEventListener('click', () => {
      lista.removeChild(itemTarefa);
      removerTarefa(tarefa);
      tarefaInput.focus();
    });

    itemTarefa.appendChild(removerBtn);
    lista.appendChild(itemTarefa);
  });
}

function adicionarTarefa() {
  const tarefa = tarefaInput.value.trim();
  if (tarefa === '') {
    alert('Por favor, insira uma tarefa.');
    return;
  }
  const itemTarefa = document.createElement('li');
  itemTarefa.textContent = tarefa;
  const removerBtn = document.createElement('button');
  removerBtn.textContent = 'Remover';
  removerBtn.className = 'btn-remover';
  itemTarefa.addEventListener('click', () => {
    itemTarefa.classList.toggle('completed');
    atualizarTarefa({ tarefa, concluida: itemTarefa.classList.contains('completed') });
    tarefaInput.focus();
  });
  removerBtn.addEventListener('click', () => {
    lista.removeChild(itemTarefa);
    removerTarefa({ tarefa });
    tarefaInput.focus();
  });
  itemTarefa.appendChild(removerBtn);
  lista.appendChild(itemTarefa);
  tarefaInput.value = '';
  adicionarTarefaLocalStorage({ tarefa, concluida: false });
}

function adicionarTarefaLocalStorage(tarefa) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarTarefa(tarefa, concluida) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  const index = tarefas.findIndex(t => t.tarefa === tarefa.tarefa);
  if (index !== -1) {
    tarefas[index].concluida = concluida;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
}

function removerTarefa(tarefa) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  const index = tarefas.findIndex(t => t.tarefa === tarefa.tarefa);
  if (index !== -1) {
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
}

tarefaInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    adicionarTarefa();
    tarefaInput.focus();
  }
});

adicionarBtn.addEventListener('click', () => {
  adicionarTarefa();
  tarefaInput.focus();
});
