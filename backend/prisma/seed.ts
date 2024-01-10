/// <reference types='node' />

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaUser {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
}

const users: PrismaUser[] = [
  {
    username: 'dave',
    email: 'dave@gamr8.net',
    password: '$2a$10$DISJw/kBVWAwCyfuSbWaEe8DI/h97ALlMF7gnZtSpAcr7gVxmGW.G', // 123
    avatarUrl: 'https://gamr8.net/users/avatars/dave.png',
  },
  {
    username: 'wazyli',
    email: 'wazyli@gamr8.net',
    password: '$2a$10$rpSBAz7S1FumWF7VvyRax.vi1Ao0GFpDX3LYxsQEaaevWLDlR0dWu', // 123
    avatarUrl: 'https://gamr8.net/users/avatars/wazyli.png',
  },
  {
    username: 'xardas',
    email: 'xardas@gamr8.net',
    password: '$2a$10$6Eex9T.4ago1s7buheuom.krAuxrExgnCJfVxdvkpPH/GRqU1W9GW', // 123
    avatarUrl: 'https://gamr8.net/users/avatars/xardas.png',
  },
];

interface PrismaGame {
  title: string;
  slug: string;
  description: string;
  year: number;
  imageUrl: string;
}

const games: PrismaGame[] = [
  {
    title: 'Deathloop',
    slug: 'deathloop',
    description:
      'In "Deathloop," players find themselves on the mysterious island of Blackreef, trapped in a time \
      loop. The game is a first-person shooter that combines elements of stealth and strategy, where the player\'s \
      goal is to eliminate eight key targets before the day resets. Its unique gameplay mechanic centers around \
      learning from each loop to devise the perfect strategy.',
    year: 2021,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4nzt.png',
  },
  {
    title: 'Elden Ring',
    slug: 'elden-ring',
    description:
      '"Elden Ring" is an open-world action RPG developed by FromSoftware, known for its challenging \
    gameplay and rich lore. Set in the Lands Between, players are tasked to find the Elden Ring fragments to become \
    the Elden Lord. The game features vast landscapes, complex dungeons, and a blend of magic and combat with a high \
    degree of customization.',
    year: 2022,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png',
  },
  {
    title: 'World of Warcraft',
    slug: 'world-of-warcraft',
    description:
      '"World of Warcraft" is a massively multiplayer online role-playing game (MMORPG) set in the \
    high-fantasy universe of Azeroth. Players create characters from various races and classes, exploring a vast \
    world, completing quests, and interacting with other players. WoW is known for its expansive lore, regular \
    updates, and large-scale raids and dungeons.',
    year: 2004,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l7z.png',
  },
  {
    title: 'The Sims 4',
    slug: 'the-sims-4',
    description:
      '"The Sims 4" is a life simulation game where players create and control virtual people, known as \
    Sims, in their daily activities and relationships. The game emphasizes customization, from the Sims\' appearance \
    and personalities to the design of their homes. It\'s known for its open-ended gameplay, numerous expansion \
    packs, and the ability for players to share creations.',
    year: 2014,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3h3l.png',
  },
  {
    title: 'Final Fantasy XV',
    slug: 'final-fantasy-xv',
    description:
      '"Final Fantasy XV" is an action RPG set in the fictional world of Eos. The story follows Prince \
    Noctis and his friends on a quest to reclaim his throne from an invading empire. The game combines real-time \
    combat with strategic elements, a deep narrative, and a vast world to explore.',
    year: 2016,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5w3k.png',
  },
  {
    title: 'God of War: Ragnarok',
    slug: 'god-of-war-ragnarok',
    description:
      '"God of War: Ragnarok" continues the story of Kratos and his son Atreus in a world steeped in Norse \
    mythology. This action-adventure game combines brutal combat with puzzle-solving and exploration elements. The \
    narrative focuses on themes of family and fate, as Kratos and Atreus face new gods and monsters in the backdrop \
    of the prophesied end of the world.',
    year: 2022,
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.png',
  },
];

interface PrismaReview {
  author_username: string;
  game_id: number;
  title: string;
  description: string;
  rating: number;
  date_posted: string;
}

const reviews: PrismaReview[] = [
  {
    author_username: 'dave',
    game_id: 2,
    title: 'A Disappointing Experience in an Overhyped World',
    description: 'As an avid gamer, I was incredibly excited to delve into "Elden Ring," a game surrounded by immense \
      hype and high expectations. Unfortunately, my experience was far from what I anticipated.\n\nFirstly, the \
      game\'s open-world, while vast and visually appealing, felt overwhelmingly directionless. I spent hours \
      wandering aimlessly, often finding myself lost in its enormity without a clear sense of purpose or progress. \
      The lack of guidance and coherent storytelling left me more frustrated than entertained.\n\nCombat, a core \
      aspect of the game, was another letdown. It felt unpolished and unfairly punishing, with enemy AI that was \
      often glitchy and unpredictable. The balance between challenge and fun was missing, turning what should have \
      been exhilarating battles into tedious and frustrating encounters.\n\nMoreover, the performance issues were \
      hard to overlook. I encountered frequent frame rate drops and long loading times that significantly disrupted \
      the gameplay experience. For a game of this caliber and coming from a renowned developer, these technical \
      shortcomings were surprising and unacceptable.\n\nIn conclusion, "Elden Ring" was a letdown. It may offer an \
      expansive world to explore, but the lack of direction, flawed combat, and technical issues significantly marred \
      my experience. It\'s a game that, despite its potential, failed to live up to the hype for me.',
    rating: 3,
    date_posted: new Date('2023-01-01').toISOString(),
  },
  {
    author_username: 'xardas',
    game_id: 1,
    title: 'A Time-Bending Thrill Ride: My Take on Deathloop',
    description: 'Deathloop delivers an exhilarating experience that blends innovative gameplay with a compelling \
      narrative. The time-loop mechanic isn\'t just a gimmick; it\'s seamlessly integrated into both the story and \
      the gameplay, offering a refreshing challenge. The art style is vibrant and unique, perfectly complementing the \
      mysterious island of Blackreef. While the game occasionally falters with some repetitive elements, its strong \
      voice acting and intriguing plot twists more than make up for it. Deathloop is a must-play for those seeking a \
      game that breaks the mold in the best way possible.',
    rating: 8,
    date_posted: new Date('2023-01-02').toISOString(),
  },
  {
    author_username: 'dave',
    game_id: 3,
    title: 'Epic Adventures in Azeroth: My Journey Through World of Warcraft',
    description: 'World of Warcraft is an iconic staple in the MMORPG genre, offering an expansive world filled with \
      lore, diverse races, and countless quests. The game\'s ability to constantly evolve through expansions keeps the \
      content fresh and engaging. Its rich, detailed world brimming with history and culture makes every quest feel \
      like part of a grander narrative. The social aspect of forming parties and guilds adds a delightful layer of \
      community interaction that enhances the overall experience.\n\nThe game\'s graphics, though not cutting-edge, \
      have a timeless charm that contributes to its unique aesthetic. Combat mechanics are well-designed, offering \
      depth and variety to suit different playstyles. While the subscription model might be a deterrent for some, the \
      quality and quantity of content available provide excellent value. World of Warcraft remains a benchmark in the \
      genre, captivating veterans and newcomers alike with its enchanting world and dynamic gameplay.',
    rating: 8,
    date_posted: new Date('2023-01-03').toISOString(),
  },
];

async function main() {
  // Insert users
  for (const user of users) {
    const result = await prisma.user.create({
      data: user,
    });
    console.log('Inserted user:', result);
  }

  // Insert games
  for (const game of games) {
    const result = await prisma.game.create({
      data: game,
    });
    console.log('Inserted game:', result);
  }

  // Insert reviews
  for (const review of reviews) {
    const result = await prisma.review.create({
      data: review,
    });
    console.log('Inserted review:', result);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
