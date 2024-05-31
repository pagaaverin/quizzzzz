const inquirer = require("inquirer");
const play = require("play-sound")();
const fs = require("fs");
const chalk = require("chalk");

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

function askCoctailsQuestions(index = 0) {
  const questions = createQuestion(questionCostails, AnswerCoctails);
  const correctAnswers = {
    0: "Май-Тай",
    1: "Негрони",
    2: "Маргарита",
    3: "Олд-Фешн",
    4: "Белый-Русский",
  };

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

      askCoctailsQuestions(index + 1);
    });
  } else {
    console.log("Вопросы закончились. Спасибо за участие!🔥");
    chooseCategory();
  }
}
function askInvestQuestions(index = 0) {
  const questions = createQuestion(questionInvest, AnswerInvest);
  const correctAnswers = {
    0: " 17%",
    1: "Санкт-Петербурге",
    2: " акции",
    3: " одну акцию",
    4: " инвесторов часто подверженных эмоциональным реакциям на изменения цен акций и часто делающих инвестиционные решения на основе слухов или собственных предположений",
  };

  if (index < questions.length) {
    play.play(`./music/zvuk.mp3`);
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

      askInvestQuestions(index + 1);
    });
  } else {
    console.log("Вопросы закончились. Спасибо за участие!🔥");
    chooseCategory();
  }
}
let categoriesCompleted = {};
function chooseCategory() {
  if (Object.keys(categoriesCompleted).length === 2) {
    console.log("Спасибо за игру!");
    return;
  }
  const categories = ["Коктейли", "Инвестиции"];
  const choices = categories.map((category) => {
    if (categoriesCompleted[category]) {
      return `${category} (уже пройдено)`; // Добавляем метку к названию
    }
    return category;
  });
  inquirer
    .prompt([
      {
        type: "list",
        name: "category",
        message: "Выберите категорию вопросов:",
        choices: choices,
      },
    ])
    .then((answers) => {
      const selectedCategory = answers.category.replace(" (уже пройдено)", "");
      if (categoriesCompleted[selectedCategory]) {
        console.log(`Категория "${selectedCategory}" уже была пройдена.`);
        chooseCategory();
      } else {
        switch (selectedCategory) {
          case "Коктейли":
            askCoctailsQuestions();
            categoriesCompleted[selectedCategory] = true;
            break;
          case "Инвестиции":
            askInvestQuestions();
            categoriesCompleted[selectedCategory] = true;
            break;
          default:
            console.log("Категория не выбрана");
            break;
        }
      }
    });
}

chooseCategory();
