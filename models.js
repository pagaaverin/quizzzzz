const fs = require('fs')


const AnswerCoctails = fs
  .readFileSync('./topics/coctailsname.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionCostails = fs
  .readFileSync('./topics/coctailsquestion.txt', 'utf-8')
  .split('\n');
  
  const AnswerInvest = fs
  .readFileSync('./topics/ответы.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionInvest = fs
  .readFileSync('./topics/вопросы.txt', 'utf-8')
  .split('\n');