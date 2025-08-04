const fs = require('fs');
const { Octokit } = require('@octokit/rest');

async function updateFile() {
  const octokit = new Octokit({ auth: process.env.GH_TOKEN });
  
  // Чтение новых пользователей из временного файла
  const newUsers = fs.readFileSync('new-users.txt', 'utf-8');
  
  // Получение текущего содержимого
  const { data } = await octokit.repos.getContent({
    owner: 'ваш-логин',
    repo: 'ваш-репозиторий',
    path: 'users.txt'
  });
  
  // Обновление содержимого
  const newContent = Buffer.from(data.content, 'base64').toString() + newUsers;
  
  // Запись обновления
  await octokit.repos.createOrUpdateFileContents({
    owner: 'ваш-логин',
    repo: 'ваш-репозиторий',
    path: 'users.txt',
    message: 'Добавлены новые пользователи',
    content: Buffer.from(newContent).toString('base64'),
    sha: data.sha
  });
}

updateFile();
