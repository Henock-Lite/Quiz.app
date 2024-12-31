class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  iscorrectanswer(choices) {
    return choices === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentindex = 0;
    this.score = 0;
  }

  getcurrentquestion() {
    return this.questions[this.currentindex];
  }

  guess(answer) {
    if (this.getcurrentquestion().iscorrectanswer(answer)) {
      this.score++;
    }
    this.currentindex++;
  }
  hasend() {
    return this.currentindex >= this.questions.length;
  }
}

display = {
  elementshown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  questions: function () {
    this.elementshown("question", quiz.getcurrentquestion().text);
  },

  choices: function () {
    let choices = quiz.getcurrentquestion().choices;

    let guesshandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizapp();
      };
    };

    for (let i = 0; i < choices.length; i++) {
      this.elementshown("choice" + i, choices[i]);
      guesshandler("guess" + i, choices[i]);
    }
  },

  progress: function () {
    this.elementshown(
      "progress",
      ` Question: ${quiz.currentindex + 1} sur ${quiz.questions.length}`
    );
  },
  endquiz: function () {
    let theEnd = ` <h1>Quiz Terminé </h1>
                   <h3>Votre score ${quiz.score++} / ${
      quiz.questions.length
    }</h3> 
    `;

    this.elementshown("quiz", theEnd);
  },
};

//logic game
function quizapp() {
  if (quiz.hasend()) {
    display.endquiz();
  } else {
    display.questions();
    display.choices();
    display.progress();
  }
}

//assignation
let quiz = new Quiz(questions);
quizapp();
