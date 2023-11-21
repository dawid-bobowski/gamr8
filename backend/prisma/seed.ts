/// <reference types='node' />

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PrismaUser {
  username: string;
  email: string;
  password: string;
}

const users: PrismaUser[] = [
  {
    username: 'dave',
    email: 'dave@gamr8.net',
    password: '$2a$10$DISJw/kBVWAwCyfuSbWaEe8DI/h97ALlMF7gnZtSpAcr7gVxmGW.G', // 123
  },
  {
    username: 'wazyli_ezyli',
    email: 'wazyli@gamr8.net',
    password: '$2a$10$rpSBAz7S1FumWF7VvyRax.vi1Ao0GFpDX3LYxsQEaaevWLDlR0dWu', // 123
  },
  {
    username: 'xardas',
    email: 'xardas@gamr8.net',
    password: '$2a$10$6Eex9T.4ago1s7buheuom.krAuxrExgnCJfVxdvkpPH/GRqU1W9GW', // 123
  },
];

interface PrismaGame {
  title: string;
  description: string;
  year: number;
}

const games: PrismaGame[] = [
  {
    title: 'Deathloop',
    description: 'In "Deathloop," players find themselves on the mysterious island of Blackreef, trapped in a time \
      loop. The game is a first-person shooter that combines elements of stealth and strategy, where the player\'s \
      goal is to eliminate eight key targets before the day resets. Its unique gameplay mechanic centers around \
      learning from each loop to devise the perfect strategy.',
    year: 2021,
  },
  {
    title: 'Elden Ring',
    description: '"Elden Ring" is an open-world action RPG developed by FromSoftware, known for its challenging \
    gameplay and rich lore. Set in the Lands Between, players are tasked to find the Elden Ring fragments to become \
    the Elden Lord. The game features vast landscapes, complex dungeons, and a blend of magic and combat with a high \
    degree of customization.',
    year: 2022,
  },
  {
    title: 'World of Warcraft',
    description: '"World of Warcraft" is a massively multiplayer online role-playing game (MMORPG) set in the \
    high-fantasy universe of Azeroth. Players create characters from various races and classes, exploring a vast \
    world, completing quests, and interacting with other players. WoW is known for its expansive lore, regular \
    updates, and large-scale raids and dungeons.',
    year: 2004,
  },
  {
    title: 'The Sims 4',
    description: '"The Sims 4" is a life simulation game where players create and control virtual people, known as \
    Sims, in their daily activities and relationships. The game emphasizes customization, from the Sims\' appearance \
    and personalities to the design of their homes. It\'s known for its open-ended gameplay, numerous expansion \
    packs, and the ability for players to share creations.',
    year: 2014,
  },
  {
    title: 'Final Fantasy XV',
    description: '"Final Fantasy XV" is an action RPG set in the fictional world of Eos. The story follows Prince \
    Noctis and his friends on a quest to reclaim his throne from an invading empire. The game combines real-time \
    combat with strategic elements, a deep narrative, and a vast world to explore.',
    year: 2016,
  },
  {
    title: 'God of War: Ragnarok',
    description: '"God of War: Ragnarok" continues the story of Kratos and his son Atreus in a world steeped in Norse \
    mythology. This action-adventure game combines brutal combat with puzzle-solving and exploration elements. The \
    narrative focuses on themes of family and fate, as Kratos and Atreus face new gods and monsters in the backdrop \
    of the prophesied end of the world.',
    year: 2022,
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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
