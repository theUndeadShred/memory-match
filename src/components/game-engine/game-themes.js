export const mario = [
  {
    id: 1,
    name: 'Peach',
    img: '/nintendo/peach.png',
  },
  {
    id: 2,
    name: 'Mario',
    img: '/nintendo/mario.webp',
  },
  {
    id: 3,
    name: 'Yoshi',
    img: '/nintendo/pink-yoshi.webp',
  },
  {
    id: 4,
    name: 'Toad',
    img: '/nintendo/toad.webp',
  },
  {
    id: 5,
    name: 'Luigi',
    img: '/nintendo/lugii.webp',
  },
  {
    id: 6,
    name: 'Wiggler',
    img: '/nintendo/wiggler.webp',
  },
];

export const zelda = [
  {
    id: 1,
    name: 'Link',
    img: '/nintendo/link.png',
  },
  {
    id: 2,
    name: 'Zelda',
    img: '/nintendo/zelda.png',
  },
  {
    id: 3,
    name: 'Ganondorf',
    img: '/nintendo/ganondorf.png',
  },
  {
    id: 4,
    name: 'Korok',
    img: '/nintendo/korok.jpg',
  },
  {
    id: 5,
    name: 'Guardian',
    img: '/nintendo/guardian.png',
  },
  {
    id: 6,
    name: 'chuchu',
    img: '/nintendo/chuchu.png',
  },
];

export const disney = [
  {
    id: 1,
    name: 'Mickey',
    img: '/disney/mickey.jpg',
  },
  {
    id: 2,
    name: 'Minnie',
    img: '/disney/minnie.jpg',
  },
  {
    id: 3,
    name: 'Goofy',
    img: '/disney/goofy.webp',
  },
  {
    id: 4,
    name: 'Donald',
    img: '/disney/donald.png',
  },
  {
    id: 5,
    name: 'Daisy',
    img: '/disney/daisy.jpg',
  },
  {
    id: 6,
    name: 'Pluto',
    img: '/disney/pluto.png',
  },
];

export const frogs = [
  {
    id: 1,
    name: 'frog1',
    img: '/frogs/frog1.png',
  },
  {
    id: 2,
    name: 'frog2',
    img: '/frogs/frog2.png',
  },
  {
    id: 3,
    name: 'frog3',
    img: '/frogs/frog3.png',
  },
  {
    id: 4,
    name: 'frog4',
    img: '/frogs/frog4.webp',
  },
  {
    id: 5,
    name: 'frog5',
    img: '/frogs/frog5.png',
  },
  {
    id: 6,
    name: 'frog6',
    img: '/frogs/frog6.png',
  },
];

export const mouse = [
  {
    id: 1,
    name: 'mouse1',
    img: '/mouse/mouse1.png',
  },
  {
    id: 2,
    name: 'mouse2',
    img: '/mouse/mouse2.png',
  },
  {
    id: 3,
    name: 'mouse3',
    img: '/mouse/mouse3.png',
  },
  {
    id: 4,
    name: 'mouse4',
    img: '/mouse/mouse4.png',
  },
  {
    id: 5,
    name: 'mouse5',
    img: '/mouse/mouse5.png',
  },
  {
    id: 6,
    name: 'mouse6',
    img: '/mouse/mouse6.png',
  },
];

const MATH_VALUE_MAX = 10;

// generate a list of 6 math problems with random numbers
// that are unique and have a unique answer
export const generateMathProblems = () => {
  const problems = [];
  const answers = [];
  let i = 0;
  while (i < 6) {
    let a = Math.floor(Math.random() * MATH_VALUE_MAX);
    let b = Math.floor(Math.random() * MATH_VALUE_MAX);
    const operator = Math.random() > 0.5 ? '+' : '-';

    if (operator === '-' && a < b) {
      // swap a and b to ensure the answer is not negative
      [a, b] = [b, a];
    }

    const problem = `${a} ${operator} ${b}`;
    const answer = operator === '+' ? a + b : a - b;
    if (!answers.includes(answer)) {
      answers.push(answer);
      problems.push({
        id: answer,
        name: problem,
      });
      problems.push({
        id: answer,
        name: answer,
      });
      i++;
    }
  }
  return problems;
};
