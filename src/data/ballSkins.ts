import { BallSkin } from '../types/game';

export const BALL_SKINS: BallSkin[] = [
  {
    id: 'classic-blue',
    name: 'Классикалык Неон',
    description: 'Жылмакай жана туруктуу көк боулинг шары',
    color: '#2563eb',
    accent: '#60a5fa',
    gradient: 'radial-gradient(circle at 35% 35%, #93c5fd 0%, #2563eb 50%, #1e3a8a 100%)',
    shadow: 'rgba(37, 99, 235, 0.6)',
    weight: '12 кг',
    icon: '⚡'
  },
  {
    id: 'fire-lava',
    name: 'Оттуу Лава',
    description: 'Кеглилерди жалындатып кулатуучу шамдагай шар',
    color: '#ea580c',
    accent: '#f97316',
    gradient: 'radial-gradient(circle at 35% 35%, #fed7aa 0%, #f97316 45%, #9a3412 100%)',
    shadow: 'rgba(234, 88, 12, 0.7)',
    weight: '14 кг',
    icon: '🔥'
  },
  {
    id: 'cosmic-purple',
    name: 'Аалам сыры',
    description: 'Космостук тартылуу күчү бар кызгылт сыя шар',
    color: '#9333ea',
    accent: '#c084fc',
    gradient: 'radial-gradient(circle at 35% 35%, #e9d5ff 0%, #9333ea 50%, #581c87 100%)',
    shadow: 'rgba(147, 51, 234, 0.6)',
    weight: '13 кг',
    icon: '🪐'
  },
  {
    id: 'gold-champion',
    name: 'Алтын Чемпион',
    description: 'Олимпиада жеңүүчүлөрүнүн алтын жалатылган шары',
    color: '#eab308',
    accent: '#fde047',
    gradient: 'radial-gradient(circle at 35% 35%, #fef08a 0%, #eab308 55%, #854d0e 100%)',
    shadow: 'rgba(234, 179, 8, 0.7)',
    weight: '15 кг',
    icon: '🏆'
  },
  {
    id: 'emerald-speed',
    name: 'Изумруд Кристалл',
    description: 'Табияттын күчү менен тез тоголонгон жашыл шар',
    color: '#10b981',
    accent: '#34d399',
    gradient: 'radial-gradient(circle at 35% 35%, #a7f3d0 0%, #10b981 50%, #064e3b 100%)',
    shadow: 'rgba(16, 185, 129, 0.6)',
    weight: '11 кг',
    icon: '💎'
  }
];
