const readline = require("readline-sync");
const play = require("play-sound")();

const questions = [
  {
    question:
      "He is Frodo's loyal friend who journeyed with him from Middle Earth to Mount Doom.\nA) Gandalf\nB) Samwise Gamgee\nC) Merry",
    answer: "B",
    hint: "He's a loyal companion and his name starts with 'S'",
  },
  {
    question:
      "What is the name of the Elven character with the blonde hair and blue eyes who was lethal with a bow?\nA) Legolas\nB) Boromir\nC) Elrond",
    answer: "A",
    hint: "His name starts with 'L'",
  },
  {
    question:
      "In 'The Lord Of The Rings: The Return Of The King,' which army does Aragorn summon using the Sword of Elendil?\nA) The Imperial Army \nB) The Army of the Dead\nC) The Army of the Undead",
    answer: "B",
    hint: "The army has a supernatural quality and is associated with death",
  },
  {
    question:
      "In 'Lord of the Rings: The Fellowship of the Ring,' Bilbo gives Frodo a powerful sword named 'Sting'. This weapon has the magical ability to glow blue when which specific race is nearby?\nA) Orcs\nB) Goblins\nC) Tribbles",
    answer: "A",
    hint: "The race is known for their brutality and association with evil",
  },
  {
    question:
      "The Lord of the Rings films are based on a novel written by which author?\nA) Justin Roiland\nB) J.K. Rowling\nC) J.R.R. Tolkien",
    answer: "C",
    hint: " The author's initials are J.R.R",
  },
  {
    question:
      "Who released King Theoden from the spell of Saruman, which caused his appearance to make him look much older than he is?\nA) Gandalf\nB) Merlin\nC) Saruman",
    answer: "A",
    hint: "He is a wise wizard and a trusted advisor",
  },
  {
    question:
      "What is the name of the mountain where the Master Ring was made?\nA) Everest\nB) Mount Doom\nC) Mount Destiny",
    answer: "B",
    hint: "The mountain's name starts with 'M' and signifies destruction",
  },
  {
    question:
      "What is the title of the second movie in the trilogy?\nA) The Lord Of The Rings: The Return Of The King,\nB) The Lord of the Rings: The Fellowship of the Ring\nC) The Lord of the Rings: The Two Towers",
    answer: "C",
    hint: "The title refers to two tall structures",
  },
  {
    question:
      "Who is Isildur's heir, also heir to the throne of Gondor, and known as 'Strider' and 'Dunadan'?\nA) Bilbo\nB) Boromir\nC) Aragorn",
    answer: "C",
    hint: "His name starts with 'A' and he is a skilled warrior",
  },
  {
    question:
      "Who used to own the Ring of Power until Bilbo Baggins picked it up in the cave?\nA) Gollum\nB) Pippin\nC) Aquaman",
    answer: "A",
    hint: "He is a deformed creature and has a love-hate relationship with the ring",
  },
];

const quitKeyword = "quit";

let chances = 10;
let hints = 3;
let score = 0;
let isPlaying = true;

console.clear();
const name = readline.question("What is your name, my precious? ");

console.log(` 
         ___ . .  _                                                                                             
"T$$$P"   |  |_| |_                                                                                             
 :$$$     |  | | |_                                                                                             
 :$$$                                                      "T$$$$$$$b.                                          
 :$$$     .g$$$$$p.   T$$$$b.    T$$$$$bp.                   BUG    "Tb      T$b      T$P   .g$P^^T$$  ,gP^^T$$ 
  $$$    d^"     "^b   $$  "Tb    $$    "Tb    .s^s. :sssp   $$$     :$; T$$P $^b.     $   dP"      ´T :$P     ´T
  :$$   dP         Tb  $$   :$;   $$      Tb  d'   ´b $      $$$     :$;  $$  $  Tp    $  d$           Tbp.   
  :$$  :$;         :$; $$   :$;   $$      :$; T.   .P $^^    $$$    .dP   $$  $   ^b.  $ :$;            "T$$p.  
  $$$  :$;         :$; $$...dP    $$      :$;   °s°' .$.     $$$...dP"    $$  $     Tp $ :$;     "T$$      "T$b. 
  $$$   Tb.       ,dP  $$"""Tb    $$      dP ""$""$" "$"$^^  $$$""T$b     $$  $      ^b$  T$       T$ ;      $$;
  $$$    Tp._   _,gP   $$    Tb.  $$    ,dP    $  $...$ $..  $$$   T$b    :$  $        $   Tb.     :$ T.    ,dP 
  $$$;    "^$$$$$^"   d$$      T.d$$$$$P^"     $  $"""$ $"", $$$    T$b  d$$bd$b      d$b   "^TbsssP" 'T$bgd$P  
  $$$b.____.dP                                 $ .$. .$.$ss,d$$$b.   T$b.                                       
.d$$$$$$$$$$P                                                         T$b.
`);

console.log(
  `Welcome to the Middle Earth Trivia, ${name}!\nYou will have ${chances} chances to answer the questions, you will have ${hints} hints, in case you need them type "hint". \nYou can quit anytime typing "quit". \nGood luck!\n`
);

const player = play.play("music/lotr.wav", (err) => {
  if (err) throw err;
});

for (let i = 0; i < questions.length; i++) {
  console.log(questions[i].question);
  let userAnswer = readline.question("\nEnter your answer > ");

  if (userAnswer.toLowerCase() === quitKeyword) {
    console.log(`Thank you for playing ${name}! Come back soon.`);
    player.kill();
    break;
  }

  while (userAnswer.toLowerCase() === "hint" && hints > 0) {
    console.log(`Hint: ${questions[i].hint}`);
    hints--;
    userAnswer = readline.question("\nEnter your answer > ");
  }

  if (hints === 0) {
    console.log("That was your last hint");
  }

  const validAnswers = ["A", "B", "C"];
  const isValidAnswer = validAnswers.includes(userAnswer.toUpperCase());

  if (isValidAnswer) {
    if (userAnswer.toUpperCase() === questions[i].answer.toUpperCase()) {
      score++;
      console.log(`That's correct ${name}, your current score is ${score}!\n`);
    } else {
      chances--;
      console.log(
        `That's incorrect you fool! your chances are ${chances - score}.\n`
      );

      if (chances === 7) {
        console.log(`<--Remember-->\nYou have ${hints} hints. Use them!\n`);
      }

      if (chances === 0) {
        console.log(`That was your last chance ${name}... You lose!`);
        break;
      }
    }
  } else {
    console.log(
      `"${userAnswer}" is an invalid answer. Please enter either 'A', 'B' or 'C'.`
    );
    i--;
  }
}

if (score === questions.length) {
  console.log(
    `Congratulations, ${name}! You answered all the questions correctly!`
  );
} else if (score > 0) {
  console.log(
    `Well done, ${name}! You finished the game, but didn't reach the maximum score.`
  );
}

console.log(`\nYour final score is ${score} out of ${questions.length}.`);

if (isPlaying) {
  player.kill();
  process.exit();
}
