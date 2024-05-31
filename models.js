const fs = require("fs");

const AnswerCoctails = fs
  .readFileSync("./topics/coctailsname.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(","));

const questionCostails = fs
  .readFileSync("./topics/coctailsquestion.txt", "utf-8")
  .split("\n");

const AnswerInvest = fs
  .readFileSync("./topics/ответы.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(","));

const questionInvest = fs
  .readFileSync("./topics/вопросы.txt", "utf-8")
  .split("\n");

function createQuestion(listQuest, listAnswer) {
  const questions = [];

  for (let i = 0; i < listQuest.length; i++) {
    questions.push({
      type: "list",
      name: `${i}`,
      message: listQuest[i],
      choices: listAnswer[i],
      validate: (input) =>
        input ? true : "Пожалуйста, выберите один из вариантов.",
    });
  }
  return questions;
}
// console.log(createQuestion(questionCostails, AnswerCoctails));

function createQuestion(listQuest, listAnswer) {
  const questions = [];

  for (let i = 0; i < listQuest.length; i++) {
    questions.push({
      type: "list",
      name: `${i}`,
      message: listQuest[i],
      choices: listAnswer[i],
      validate: (input) =>
        input ? true : "Пожалуйста, выберите один из вариантов.",
    });
  }
  return questions;
}
console.log(createQuestion(questionInvest, AnswerInvest));



function askCoctailsQuestions(index = 0) {
  const questions = createQuestion(questionCostails, AnswerCoctails);
  const correctAnswers = {
    0: "Май-Тай",
    1: "Негрони",
    2: "Маргарита",
    3: "Олд-Фешн",
    4: "Белый-Русский",
  }

  if (index < questions.length) {
    play.play(`./music/icebaby.mp3`);
    inquirer.prompt([questions[index]]).then((answers) => {
      const questionKey = Object.keys(answers)[0];
      const userAnswer = answers[questionKey];
      const correctAnswer = correctAnswers[questionKey];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log(chalk.green("Правильный ответ!✅"));
      } else {
        console.log(
          chalk.red(`Неправильный ответ🚫. Правильный ответ: ${correctAnswer}`)
        );
      }

      // Переход к следующему вопросу
      askCoctailsQuestions(index + 1);
    });
  } else {
    console.log("Вопросы закончились. Спасибо за участие!🔥");
    chooseCategory();
  }
}


