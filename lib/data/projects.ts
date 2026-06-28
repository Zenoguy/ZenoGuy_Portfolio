export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  services: string[];
  image: string;
  color: string;
  github: string;
  live: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'SpendSight',
    category: 'FinTech AI Pipeline',
    year: '2025',
    description: 'Hybrid AI pipeline that parses financial PDFs, classifies transactions through Regex → MiniLM → LLM stages, and generates RAG-powered insights with multi-bank support.',
    services: ['AI/ML', 'OCR', 'RAG', 'Database'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
    color: '#4F46E5',
    github: 'https://github.com/Zenoguy/SpendSight_',
    live: ''
  },
  {
    id: 2,
    title: 'Data Wiper',
    category: 'Security Toolkit',
    year: '2025',
    description: 'Enterprise-grade secure drive sanitization with zero-fill and AES-128 encryption wipes. Features partition backup, verification system, and compliance certificates.',
    services: ['Linux', 'Cryptography', 'Security'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
    color: '#EC4899',
    github: 'https://github.com/Zenoguy/data_wiping_linux',
    live: ''
  },
  {
    id: 3,
    title: 'Leaf Disease Segmenter',
    category: 'Computer Vision Research',
    year: '2025',
    description: 'Hierarchical panoptic segmentation using ConvNeXt-Tiny for plant health monitoring. Dual-headed architecture with custom loss functions achieving 0.72 F1 score.',
    services: ['PyTorch', 'CNN', 'Research'],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80',
    color: '#10B981',
    github: 'https://github.com/Zenoguy/Panoptic_Segmentation',
    live: ''
  },
  {
    id: 4,
    title: 'ChatApp',
    category: 'Desktop Messaging',
    year: '2025',
    description: 'Real-time chat application built with Java Swing, Sockets, and MySQL. Features message persistence, modern GUI, and timestamped messaging with custom UI.',
    services: ['Java', 'Sockets', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&q=80',
    color: '#F59E0B',
    github: 'https://github.com/Zenoguy/ChatApp-Java',
    live: ''
  },
  {
    id: 5,
    title: 'Space Shooters',
    category: 'Arcade Game',
    year: '2025',
    description: 'Classic arcade-style space shooter with Pygame featuring multiple enemy types, progressive difficulty, power-ups, health system, and full audio integration.',
    services: ['Python', 'Pygame', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80',
    color: '#8B5CF6',
    github: 'https://github.com/Zenoguy/Space_Shooters',
    live: 'https://zenoguy.itch.io/space-shooters-concept-game'
  },
];
