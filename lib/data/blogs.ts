export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
  url: string;
  reactionsCount?: number;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'My First Hackathon – 24 Hours, 1 Fintech App, 0 Sleep',
    excerpt: 'Built SpendSight — a fintech app that turns horrendous PDF bank statements into clean, categorized insights. Won a Special Mention Award. No sleep. Worth it.',
    category: 'Hackathon',
    readTime: '3 min read',
    date: 'Jul 23, 2025',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    tags: ['hackathon', 'fintech', 'python', 'react'],
    url: 'https://dev.to/zenoguy/my-first-hackathon-24-hours-1-fintech-app-0-sleepspoiler-we-won-a-special-mention-too--3pho'
  },
  {
    id: 2,
    title: 'I Made a Java Chat App in One Night (Because I Had No Projects)',
    excerpt: 'So like any rational dev in a crunch, I built a full 1-on-1 chat app in Java using Sockets, JDBC, and Swing (yes, I suffered).',
    category: 'DevLog',
    readTime: '2 min read',
    date: 'Jun 26, 2025',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80',
    tags: ['java', 'mysql', 'networking', 'devlog'],
    url: 'https://dev.to/zenoguy/i-made-a-java-chat-app-in-one-night-because-i-had-no-projects-bo8'
  },
  {
    id: 3,
    title: 'So I Decided to Learn Vim… and I Kinda Get the Hype Now?',
    excerpt: 'Around day 3 or 4, I stopped trying to fight Vim. Made a cheat sheet because tabs, splits, and buffers were bouncing around like uncompiled code.',
    category: 'Tools',
    readTime: '2 min read',
    date: 'Jun 18, 2025',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80',
    tags: ['vim', 'beginners', 'cli', 'programming'],
    url: 'https://dev.to/zenoguy/so-i-decided-to-learn-vim-and-i-kinda-get-the-hype-now-287d'
  },
  {
    id: 4,
    title: 'Apple Just Buffed Dev Tools',
    excerpt: 'WWDC 2025 happened. Apple quietly fixed a bunch of stuff that actually matters to developers. Native Linux containers on macOS? Game-changer.',
    category: 'Dev Tools',
    readTime: '3 min read',
    date: 'Jun 16, 2025',
    image: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=1200&q=80',
    tags: ['apple', 'devtool', 'linux', 'ai'],
    url: 'https://dev.to/zenoguy/apple-just-buffed-dev-tools-4bcn'
  },
  {
    id: 5,
    title: '🛸 I tried Pygame (Build Space Shooters in a DAY)',
    excerpt: 'Made a space shooter in Python with Pygame. Collision detection, score tracking, and sound effects. It works. Kinda.',
    category: 'Game Dev',
    readTime: '7 min read',
    date: 'Jun 09, 2025',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    tags: ['python', 'pygame', 'gamedev', 'tutorial'],
    url: 'https://dev.to/zenoguy/i-made-a-space-shooter-in-python-and-it-works-kinda-kpg'
  },
  {
    id: 6,
    title: 'Intro to Functional Programming',
    excerpt: 'From code chaos to mathematical zen. Exploring pure functions, immutability, and why WhatsApp uses Erlang to handle billions of messages.',
    category: 'Programming',
    readTime: '5 min read',
    date: 'Jun 04, 2025',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    tags: ['functional', 'elixir', 'haskell', 'programming'],
    url: 'https://dev.to/zenoguy/functional-programming-from-code-chaos-to-mathematical-zen-1-4p8m'
  },
];
