const fs = require('fs')


const AnswerCoctails = fs
  .readFileSync('./topics/coctailsname.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionCostails = fs
  .readFileSync('./topics/coctailsquestion.txt', 'utf-8')
  .split('\n');
  