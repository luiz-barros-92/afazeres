const tarefaInput = document.getElementById('tarefaInput');
const adicionarBtn = document.getElementById('adicionarBtn');
const lista = document.getElementById('lista');

adicionarBtn.addEventListener('click', () => {
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
  });

  removerBtn.addEventListener('click', () => {
    lista.removeChild(itemTarefa);
  });

  itemTarefa.appendChild(removerBtn);
   lista.appendChild(itemTarefa);
  
   tarefaInput.value = '';
 });

 window.onload = function() {
  document.getElementById("ano").innerHTML = new Date().getFullYear();
 }