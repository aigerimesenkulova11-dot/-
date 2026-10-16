import { Difficulty, MathQuestion } from '../types/game';

export const mathQuestionsDatabase: MathQuestion[] = [
  // ==========================================
  // ЖЕҢИЛ (EASY) - 5-класс деңгээли
  // ==========================================
  {
    id: 'e-1',
    grade: 5,
    difficulty: 'easy',
    category: 'Амалдар тартиби',
    question: 'Эсептеңиз: 15 + 25 × 2',
    formula: '15 + 25 \\times 2 = ?',
    options: ['65', '80', '55', '50'],
    correctIndex: 0,
    explanation: 'Биринчи көбөйтүү аткарылат: 25 × 2 = 50. Андан соң кошуу: 15 + 50 = 65.',
    hint: 'Амалдар тартибин эстеңиз: алгач көбөйтүү, андан соң кошуу аткарылат.'
  },
  {
    id: 'e-2',
    grade: 5,
    difficulty: 'easy',
    category: 'Жөнөкөй теңдеме',
    question: 'Теңдемени чыгаргыла: x + 28 = 75',
    formula: 'x + 28 = 75',
    options: ['47', '57', '43', '103'],
    correctIndex: 0,
    explanation: 'Белгисиз кошулуучуну табуу үчүн суммадан белгилүү кошулуучуну кемитебиз: x = 75 - 28 = 47.',
    hint: 'x = 75 - 28'
  },
  {
    id: 'e-3',
    grade: 5,
    difficulty: 'easy',
    category: 'Бөлчөктөр',
    question: 'Бөлчөктөрдү кошсоңуз канча болот: 3/8 + 2/8',
    formula: '\\frac{3}{8} + \\frac{2}{8} = ?',
    options: ['5/8', '5/16', '1/8', '6/8'],
    correctIndex: 0,
    explanation: 'Бөлүмдөрү бирдей болгон бөлчөктөрдү кошууда алымдары кошулуп, бөлүмү өзгөрүүсүз калат: (3 + 2)/8 = 5/8.',
    hint: 'Бөлүмү бирдей калат (8), алымдарын гана кошобуз.'
  },
  {
    id: 'e-4',
    grade: 5,
    difficulty: 'easy',
    category: 'Геометрия',
    question: 'Жактары 7 см жана 4 см болгон тик бурчтуктун аянтын (S) тапкыла:',
    formula: 'S = a \\times b',
    options: ['28 см²', '22 см²', '14 см²', '32 см²'],
    correctIndex: 0,
    explanation: 'Тик бурчтуктун аянты: S = a × b = 7 × 4 = 28 см².',
    hint: 'Аянтты табуу үчүн узуну менен туурасын көбөйтүңүз.'
  },
  {
    id: 'e-5',
    grade: 5,
    difficulty: 'easy',
    category: 'Геометрия',
    question: 'Жагы 6 см болгон квадраттын периметрин (P) тапкыла:',
    formula: 'P = 4 \\times a',
    options: ['24 см', '36 см', '18 см', '12 см'],
    correctIndex: 0,
    explanation: 'Квадраттын бардык 4 жагы барабар, демек: P = 4 × 6 = 24 см.',
    hint: 'Квадраттын 4 жагы бар: 4 × 6'
  },
  {
    id: 'e-6',
    grade: 5,
    difficulty: 'easy',
    category: 'Арифметика',
    question: 'Эсептеңиз: 120 : 4 + 18',
    formula: '120 \\div 4 + 18 = ?',
    options: ['48', '38', '50', '30'],
    correctIndex: 0,
    explanation: 'Биринчи бөлүү: 120 : 4 = 30. Андан соң кошуу: 30 + 18 = 48.',
    hint: 'Биринчи 120ны 4кө бөлүп, анан 18ди кошуңуз.'
  },
  {
    id: 'e-7',
    grade: 5,
    difficulty: 'easy',
    category: 'Теңдемелер',
    question: 'Теңдемени чыгаргыла: 6 × y = 54',
    formula: '6 \\times y = 54',
    options: ['9', '8', '7', '48'],
    correctIndex: 0,
    explanation: 'Белгисиз көбөйтүүчүнү табуу үчүн көбөйтүндүнү белгилүү көбөйтүүчүгө бөлөбүз: y = 54 : 6 = 9.',
    hint: 'y = 54 : 6'
  },
  {
    id: 'e-8',
    grade: 5,
    difficulty: 'easy',
    category: 'Чен бирдиктер',
    question: '3 саат 15 мүнөттө бардыгы канча мүнөт бар?',
    formula: '3 \\text{ саат } 15 \\text{ мүн} = ?',
    options: ['195 мүнөт', '180 мүнөт', '205 мүнөт', '175 мүнөт'],
    correctIndex: 0,
    explanation: '1 саатта 60 мүнөт бар. 3 саат = 3 × 60 = 180 мүнөт. 180 + 15 = 195 мүнөт.',
    hint: '1 саатта 60 мүнөт бар. 3 × 60 + 15.'
  },
  {
    id: 'e-9',
    grade: 5,
    difficulty: 'easy',
    category: 'Амалдар тартиби',
    question: 'Эсептеңиз: (45 - 15) : 5 + 14',
    formula: '(45 - 15) \\div 5 + 14 = ?',
    options: ['20', '22', '18', '24'],
    correctIndex: 0,
    explanation: 'Кашаанын ичи: 45 - 15 = 30. Бөлүү: 30 : 5 = 6. Кошуу: 6 + 14 = 20.',
    hint: 'Алгач кашааны эсептеңиз: (45 - 15) = 30.'
  },
  {
    id: 'e-10',
    grade: 5,
    difficulty: 'easy',
    category: 'Бөлчөктөр',
    question: 'Бөлчөктөрдү кемитүү: 7/10 - 4/10',
    formula: '\\frac{7}{10} - \\frac{4}{10} = ?',
    options: ['3/10', '3/20', '1/10', '11/10'],
    correctIndex: 0,
    explanation: 'Бөлүмдөрү бирдей болгондуктан, алымдарын кемитебиз: (7 - 4)/10 = 3/10.',
    hint: '7ден 4тү алып, бөлүмүн өзгөртпөңүз.'
  },
  {
    id: 'e-11',
    grade: 5,
    difficulty: 'easy',
    category: 'Теңдемелер',
    question: 'Теңдемени чыгаргыла: a - 35 = 65',
    formula: 'a - 35 = 65',
    options: ['100', '30', '90', '110'],
    correctIndex: 0,
    explanation: 'Кемүүчүнү табуу үчүн айырмага кемитүүчүнү кошобуз: a = 65 + 35 = 100.',
    hint: 'a = 65 + 35'
  },
  {
    id: 'e-12',
    grade: 5,
    difficulty: 'easy',
    category: 'Чен бирдиктер',
    question: '4 километрде канча метр бар?',
    formula: '4 \\text{ км} = ? \\text{ м}',
    options: ['4000 м', '400 м', '40 000 м', '40 м'],
    correctIndex: 0,
    explanation: '1 километр = 1000 метр. Демек, 4 км = 4 × 1000 = 4000 метр.',
    hint: '1 км = 1000 м'
  },
  {
    id: 'e-13',
    grade: 5,
    difficulty: 'easy',
    category: 'Арифметика',
    question: 'Эсептеңиз: 9 × 8 - 4 × 7',
    formula: '9 \\times 8 - 4 \\times 7 = ?',
    options: ['44', '36', '48', '52'],
    correctIndex: 0,
    explanation: '9 × 8 = 72, ал эми 4 × 7 = 28. Айырмасы: 72 - 28 = 44.',
    hint: 'Көбөйтүүлөрдү өз-өзүнчө аткарып, кемитиңиз.'
  },
  {
    id: 'e-14',
    grade: 5,
    difficulty: 'easy',
    category: 'Бөлүнгүчтүк',
    question: 'Төмөнкү сандардын кайсынысы 5ке калдыксыз бөлүнөт?',
    formula: 'x \\pmod 5 = 0',
    options: ['245', '124', '338', '512'],
    correctIndex: 0,
    explanation: '5ке бөлүнгүчтүктүн белгиси: акыркы цифрасы 0 же 5 менен аяктаган сандар 5ке бөлүнөт. 245 саны 5 менен аяктайт.',
    hint: 'Сандын акыркы цифрасына көңүл буруңуз (0 же 5 болушу керек).'
  },
  {
    id: 'e-15',
    grade: 5,
    difficulty: 'easy',
    category: 'Геометрия',
    question: 'Жактары 5 см, 8 см жана 6 см болгон үч бурчтуктун периметри канча?',
    formula: 'P = a + b + c',
    options: ['19 см', '20 см', '18 см', '21 см'],
    correctIndex: 0,
    explanation: 'Үч бурчтуктун периметри – бардык жактарынын суммасы: 5 + 8 + 6 = 19 см.',
    hint: 'Бардык үч жагын кошобуз.'
  },

  // ==========================================
  // ОРТО (MEDIUM) - 6-7-класс деңгээли
  // ==========================================
  {
    id: 'm-1',
    grade: 6,
    difficulty: 'medium',
    category: 'Терс сандар',
    question: 'Эсептеңиз: -15 + 23',
    formula: '-15 + 23 = ?',
    options: ['8', '-8', '38', '-38'],
    correctIndex: 0,
    explanation: 'Ар башка белгилүү сандарды кошууда модулу чоң сандын белгиси коюлуп, модулдары кемитилет: 23 - 15 = 8.',
    hint: '23төн 15ти кемитип, чоң сандын оң белгисин калтырабыз.'
  },
  {
    id: 'm-2',
    grade: 6,
    difficulty: 'medium',
    category: 'Терс сандар',
    question: 'Эсептеңиз: -7 × (-8)',
    formula: '(-7) \\times (-8) = ?',
    options: ['56', '-56', '49', '-49'],
    correctIndex: 0,
    explanation: 'Эки терс санды көбөйткөндө натыйжасы ар дайым оң сан болот: (-) × (-) = (+). Демек, 56.',
    hint: 'Минус менен минусту көбөйтсө плюс болот!'
  },
  {
    id: 'm-3',
    grade: 6,
    difficulty: 'medium',
    category: 'Пайыздар',
    question: '400 санынын 25%ин тапкыла:',
    formula: '400 \\times 25\\% = ?',
    options: ['100', '80', '120', '150'],
    correctIndex: 0,
    explanation: '25% – бул төрттөн бир бөлүгү (1/4): 400 × 0.25 = 100 же 400 : 4 = 100.',
    hint: '25% бул төрттөн бир бөлүк (400 : 4).'
  },
  {
    id: 'm-4',
    grade: 6,
    difficulty: 'medium',
    category: 'Ондук бөлчөктөр',
    question: 'Эсептеңиз: 3.5 × 4 - 2.8',
    formula: '3.5 \\times 4 - 2.8 = ?',
    options: ['11.2', '12.2', '10.8', '14.0'],
    correctIndex: 0,
    explanation: '3.5 × 4 = 14.0. Андан соң кемитүү: 14.0 - 2.8 = 11.2.',
    hint: '3.5ти 4кө көбөйтүп (14), анан 2.8ди кемитиңиз.'
  },
  {
    id: 'm-5',
    grade: 6,
    difficulty: 'medium',
    category: 'Сызыктуу теңдеме',
    question: 'Теңдемени чыгаргыла: 3x - 7 = 20',
    formula: '3x - 7 = 20',
    options: ['9', '8', '7', '10'],
    correctIndex: 0,
    explanation: '3x = 20 + 7 => 3x = 27 => x = 27 : 3 = 9.',
    hint: '7ни оң жакка кошуу кылып өткөрүңүз: 3x = 27'
  },
  {
    id: 'm-6',
    grade: 7,
    difficulty: 'medium',
    category: 'Даражалар',
    question: 'Туюнтманын маанисин тапкыла: 2⁵ - 3²',
    formula: '2^5 - 3^2 = ?',
    options: ['23', '21', '25', '19'],
    correctIndex: 0,
    explanation: '2⁵ = 32, ал эми 3² = 9. 32 - 9 = 23.',
    hint: '2нин бешинчи даражасы 32, 3түн квадраты 9.'
  },
  {
    id: 'm-7',
    grade: 6,
    difficulty: 'medium',
    category: 'Пропорция',
    question: 'Пропорциядан x ти тапкыла: x / 8 = 3 / 4',
    formula: '\\frac{x}{8} = \\frac{3}{4}',
    options: ['6', '5', '7', '4'],
    correctIndex: 0,
    explanation: 'Пропорциянын негизги касиети: 4x = 8 × 3 => 4x = 24 => x = 6.',
    hint: 'Крест түрүндө көбөйтүңүз: 4 * x = 8 * 3'
  },
  {
    id: 'm-8',
    grade: 6,
    difficulty: 'medium',
    category: 'Терс сандар',
    question: 'Эсептеңиз: -36 : (-4) + (-12)',
    formula: '(-36) \\div (-4) + (-12) = ?',
    options: ['-3', '3', '-21', '21'],
    correctIndex: 0,
    explanation: '-36 : (-4) = +9. Андан соң: 9 + (-12) = 9 - 12 = -3.',
    hint: '(-36) : (-4) = +9, андан соң 9 - 12'
  },
  {
    id: 'm-9',
    grade: 7,
    difficulty: 'medium',
    category: 'Алгебра',
    question: 'Окшош мүчөлөрдү бириктиргиле: 5x + 3y - 2x + 4y',
    formula: '5x + 3y - 2x + 4y = ?',
    options: ['3x + 7y', '7x + 7y', '3x - y', '7x + y'],
    correctIndex: 0,
    explanation: 'x бар мүчөлөр: 5x - 2x = 3x. y бар мүчөлөр: 3y + 4y = 7y. Жообу: 3x + 7y.',
    hint: 'x менен xти, y менен yти чогултуңуз.'
  },
  {
    id: 'm-10',
    grade: 7,
    difficulty: 'medium',
    category: 'Сызыктуу теңдеме',
    question: 'Теңдемени чыгаргыла: 4(x + 2) = 24',
    formula: '4(x + 2) = 24',
    options: ['4', '5', '3', '6'],
    correctIndex: 0,
    explanation: 'Кашааны ачуу: 4x + 8 = 24 => 4x = 16 => x = 4. Же эки жагын тең 4кө бөлсөк: x + 2 = 6 => x = 4.',
    hint: '24тү 4кө бөлүп, андан соң 2ни кемитиңиз.'
  },
  {
    id: 'm-11',
    grade: 6,
    difficulty: 'medium',
    category: 'Пайыздар',
    question: 'Дүкөндө көйнөк 1200 сом эле. 10% арзандатуудан кийин канча сом болду?',
    formula: '1200 - (1200 \\times 10\\%) = ?',
    options: ['1080 сом', '1100 сом', '1050 сом', '1000 сом'],
    correctIndex: 0,
    explanation: '10% = 120 сом. Арзандатуудан кийинки баа: 1200 - 120 = 1080 сом.',
    hint: '1200дүн 10%и – бул 120 сом. Баштапкы баадан кемитебиз.'
  },
  {
    id: 'm-12',
    grade: 7,
    difficulty: 'medium',
    category: 'Даражалар',
    question: 'Эсептеңиз: (-4)³',
    formula: '(-4)^3 = ?',
    options: ['-64', '64', '-12', '-16'],
    correctIndex: 0,
    explanation: '(-4) × (-4) × (-4) = 16 × (-4) = -64. Так даражада терс белги сакталат.',
    hint: 'Так даража терс санда терс бойдон калат.'
  },

  // ==========================================
  // ТАТААЛ (HARD) - 7-8-класс деңгээли
  // ==========================================
  {
    id: 'h-1',
    grade: 8,
    difficulty: 'hard',
    category: 'Квадрат тамырлар',
    question: 'Эсептеңиз: √144 + √81 - √25',
    formula: '\\sqrt{144} + \\sqrt{81} - \\sqrt{25} = ?',
    options: ['16', '18', '14', '20'],
    correctIndex: 0,
    explanation: '√144 = 12, √81 = 9, √25 = 5. Эсептейбиз: 12 + 9 - 5 = 16.',
    hint: '12²=144, 9²=81, 5²=25.'
  },
  {
    id: 'h-2',
    grade: 7,
    difficulty: 'hard',
    category: 'Кыскача көбөйтүү',
    question: 'Кыскача көбөйтүү формуласын ачкыла: (x + 5)²',
    formula: '(x + 5)^2 = ?',
    options: ['x² + 10x + 25', 'x² + 25', 'x² + 5x + 25', 'x² + 10x + 10'],
    correctIndex: 0,
    explanation: '(a + b)² = a² + 2ab + b². Демек, (x + 5)² = x² + 2 × 5 × x + 5² = x² + 10x + 25.',
    hint: 'Эки эселенген көбөйтүндүнү (2 * 5 * x) унутпаңыз.'
  },
  {
    id: 'h-3',
    grade: 8,
    difficulty: 'hard',
    category: 'Пифагор теоремасы',
    question: 'Тик бурчтуу үч бурчтуктун катеттери 6 см жана 8 см болсо, гипотенузасын тапкыла:',
    formula: 'c^2 = a^2 + b^2',
    options: ['10 см', '12 см', '14 см', '9 см'],
    correctIndex: 0,
    explanation: 'Пифагор теоремасы боюнча: c² = 6² + 8² = 36 + 64 = 100. c = √100 = 10 см.',
    hint: 'c = √(6² + 8²) = √(36 + 64)'
  },
  {
    id: 'h-4',
    grade: 8,
    difficulty: 'hard',
    category: 'Теңдемелер',
    question: 'Теңдеменин оң тамырын тапкыла: x² - 49 = 0',
    formula: 'x^2 - 49 = 0',
    options: ['7', '8', '6', '14'],
    correctIndex: 0,
    explanation: 'x² = 49 => x = ±7. Оң тамыры x = 7 болот.',
    hint: 'Кайсы сандын квадраты 49га барабар?'
  },
  {
    id: 'h-5',
    grade: 7,
    difficulty: 'hard',
    category: 'Кыскача көбөйтүү',
    question: 'Көбөйтүүчүлөргө ажыраткыла: a² - 16',
    formula: 'a^2 - 16 = ?',
    options: ['(a - 4)(a + 4)', '(a - 4)²', '(a + 4)²', '(a - 8)(a + 2)'],
    correctIndex: 0,
    explanation: 'Квадраттардын айырмасынын формуласы: a² - b² = (a - b)(a + b). Демек, a² - 4² = (a - 4)(a + 4).',
    hint: '16 = 4², а² - b² = (a - b)(a + b) формуласын колдонуңуз.'
  },
  {
    id: 'h-6',
    grade: 8,
    difficulty: 'hard',
    category: 'Геометрия',
    question: 'Үч бурчтуктун эки бурчу 45° жана 75°. Үчүнчү бурчун тапкыла:',
    formula: '\\alpha + \\beta + \\gamma = 180^\\circ',
    options: ['60°', '70°', '50°', '65°'],
    correctIndex: 0,
    explanation: 'Үч бурчтуктун ички бурчтарынын суммасы 180°ка барабар: 180° - (45° + 75°) = 180° - 120° = 60°.',
    hint: 'Үч бурчтуктун бардык ички бурчтарынын суммасы 180°'
  },
  {
    id: 'h-7',
    grade: 8,
    difficulty: 'hard',
    category: 'Теңдемелер системасы',
    question: 'Теңдемелер системасынан x ти тапкыла:\n{ x + y = 10\n{ x - y = 4',
    formula: '\\begin{cases} x + y = 10 \\\\ x - y = 4 \\end{cases}',
    options: ['7', '6', '8', '3'],
    correctIndex: 0,
    explanation: 'Эки теңдемени мүчөлөп кошсок: 2x = 14 => x = 7. (y = 3 болот).',
    hint: 'Эки теңдемени кошсок y жоюлуп: 2x = 14'
  },
  {
    id: 'h-8',
    grade: 8,
    difficulty: 'hard',
    category: 'Квадрат тамырлар',
    question: 'Эсептеңиз: √(36 × 25)',
    formula: '\\sqrt{36 \\times 25} = ?',
    options: ['30', '35', '25', '40'],
    correctIndex: 0,
    explanation: 'Көбөйтүндүнүн тамыры: √36 × √25 = 6 × 5 = 30.',
    hint: '√36 = 6, √25 = 5. Андан соң 6 × 5.'
  },
  {
    id: 'h-9',
    grade: 7,
    difficulty: 'hard',
    category: 'Теңдемелер',
    question: 'Теңдемени чыгаргыла: 5(2x - 3) = 3x + 13',
    formula: '5(2x - 3) = 3x + 13',
    options: ['4', '5', '3', '2'],
    correctIndex: 0,
    explanation: '10x - 15 = 3x + 13 => 10x - 3x = 13 + 15 => 7x = 28 => x = 4.',
    hint: '10x - 15 = 3x + 13, x терди солго, сандарды оңго өткөрүңүз.'
  },
  {
    id: 'h-10',
    grade: 8,
    difficulty: 'hard',
    category: 'Даражалардын касиеттери',
    question: 'Туюнтманы жөнөкөйлөткүлө: (a⁴ × a³) : a²',
    formula: '\\frac{a^4 \\times a^3}{a^2} = ?',
    options: ['a⁵', 'a⁶', 'a⁷', 'a⁴'],
    correctIndex: 0,
    explanation: 'Даражаларды көбөйтүүдө көрсөткүчтөр кошулат (4+3=7), бөлүүдө кемитилет (7-2=5). Демек a⁵.',
    hint: 'a^(4 + 3 - 2)'
  },
  {
    id: 'h-11',
    grade: 8,
    difficulty: 'hard',
    category: 'Геометрия',
    question: 'Негизи 8 см жана бийиктиги 5 см болгон үч бурчтуктун аянтын (S) тапкыла:',
    formula: 'S = \\frac{1}{2} \\times a \\times h',
    options: ['20 см²', '40 см²', '15 см²', '30 см²'],
    correctIndex: 0,
    explanation: 'Үч бурчтуктун аянты: S = (a × h) / 2 = (8 × 5) / 2 = 40 / 2 = 20 см².',
    hint: 'Аянт негиздин бийиктикке көбөйтүндүсүнүн жарымына барабар.'
  },
  {
    id: 'h-12',
    grade: 7,
    difficulty: 'hard',
    category: 'Кыскача көбөйтүү',
    question: 'Эсептеңиз: 51² - 49²',
    formula: '51^2 - 49^2 = ?',
    options: ['200', '100', '196', '250'],
    correctIndex: 0,
    explanation: 'Квадраттардын айырмасы: (51 - 49)(51 + 49) = 2 × 100 = 200.',
    hint: 'a² - b² = (a - b)(a + b) колдонуңуз: (51 - 49) × (51 + 49).'
  }
];

// Helper to dynamically generate procedural questions to never run out
export function generateProceduralQuestion(difficulty: Difficulty): MathQuestion {
  const rand = Math.random();
  const id = 'proc-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  if (difficulty === 'easy') {
    if (rand < 0.33) {
      // 2-digit addition with carry
      const a = Math.floor(Math.random() * 40) + 15;
      const b = Math.floor(Math.random() * 40) + 15;
      const c = Math.floor(Math.random() * 20) + 5;
      const ans = a + b - c;
      const wrong1 = ans + 10;
      const wrong2 = ans - 5;
      const wrong3 = ans + 2;
      return {
        id,
        grade: 5,
        difficulty: 'easy',
        category: 'Арифметика',
        question: `Эсептеңиз: ${a} + ${b} - ${c}`,
        formula: `${a} + ${b} - ${c} = ?`,
        options: shuffleArray([String(ans), String(wrong1), String(wrong2), String(wrong3)]),
        correctIndex: 0, // will be properly updated by shuffle
        explanation: `${a} + ${b} = ${a + b}. Андан ${c}ни кемитсек = ${ans}.`,
        hint: `Адегенде ${a} менен ${b}ни кошуп, андан ${c}ни кемитиңиз.`
      };
    } else if (rand < 0.66) {
      // Simple equation: x + a = b
      const xVal = Math.floor(Math.random() * 30) + 5;
      const a = Math.floor(Math.random() * 30) + 10;
      const b = xVal + a;
      return {
        id,
        grade: 5,
        difficulty: 'easy',
        category: 'Теңдемелер',
        question: `Теңдемени чыгаргыла: x + ${a} = ${b}`,
        formula: `x + ${a} = ${b}`,
        options: shuffleArray([String(xVal), String(xVal + 5), String(xVal - 3), String(b + a)]),
        correctIndex: 0,
        explanation: `x = ${b} - ${a} = ${xVal}.`,
        hint: `x = ${b} - ${a}`
      };
    } else {
      // Area of rectangle
      const w = Math.floor(Math.random() * 8) + 3;
      const h = Math.floor(Math.random() * 8) + 3;
      const ans = w * h;
      return {
        id,
        grade: 5,
        difficulty: 'easy',
        category: 'Геометрия',
        question: `Узуну ${w} см, туурасы ${h} см болгон тик бурчтуктун аянтын тапкыла:`,
        formula: `S = ${w} \\times ${h}`,
        options: shuffleArray([`${ans} см²`, `${(w + h) * 2} см²`, `${ans + 6} см²`, `${ans - 4} см²`]),
        correctIndex: 0,
        explanation: `S = ${w} × ${h} = ${ans} см².`,
        hint: `Узунун туурасына көбөйтөбүз (${w} × ${h}).`
      };
    }
  } else if (difficulty === 'medium') {
    if (rand < 0.35) {
      // Negative integers multiplication & addition
      const a = -(Math.floor(Math.random() * 8) + 2);
      const b = -(Math.floor(Math.random() * 7) + 2);
      const c = Math.floor(Math.random() * 20) + 5;
      const ans = a * b - c;
      return {
        id,
        grade: 6,
        difficulty: 'medium',
        category: 'Терс сандар',
        question: `Эсептеңиз: (${a}) × (${b}) - ${c}`,
        formula: `(${a}) \\times (${b}) - ${c} = ?`,
        options: shuffleArray([String(ans), String(-ans), String(ans + 10), String(ans - 6)]),
        correctIndex: 0,
        explanation: `(${a}) × (${b}) = ${a * b}. ${a * b} - ${c} = ${ans}.`,
        hint: `Эки терс санды көбөйтүү оң санды берет: (${a}) × (${b}) = ${a * b}.`
      };
    } else if (rand < 0.7) {
      // Percentage of a number
      const percents = [10, 20, 25, 50];
      const p = percents[Math.floor(Math.random() * percents.length)];
      const base = (Math.floor(Math.random() * 8) + 2) * 50;
      const ans = (base * p) / 100;
      return {
        id,
        grade: 6,
        difficulty: 'medium',
        category: 'Пайыздар',
        question: `${base} санынын ${p}%ин тапкыла:`,
        formula: `${base} \\times ${p}\\% = ?`,
        options: shuffleArray([String(ans), String(ans + 20), String(ans - 15), String(ans * 2)]),
        correctIndex: 0,
        explanation: `${base} × (${p} / 100) = ${ans}.`,
        hint: `${base}ди 100гө бөлүп, ${p}ке көбөйтөбүз.`
      };
    } else {
      // Linear equation: a * x + b = c
      const a = Math.floor(Math.random() * 4) + 2;
      const xVal = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 10) + 3;
      const c = a * xVal + b;
      return {
        id,
        grade: 7,
        difficulty: 'medium',
        category: 'Теңдемелер',
        question: `Теңдемени чыгаргыла: ${a}x + ${b} = ${c}`,
        formula: `${a}x + ${b} = ${c}`,
        options: shuffleArray([String(xVal), String(xVal + 2), String(xVal - 1), String(xVal + 4)]),
        correctIndex: 0,
        explanation: `${a}x = ${c} - ${b} = ${c - b} => x = ${c - b} / ${a} = ${xVal}.`,
        hint: `${a}x = ${c} - ${b}`
      };
    }
  } else {
    // Hard (7-8)
    if (rand < 0.35) {
      // Square roots
      const rootPairs = [
        { sq: 169, val: 13 },
        { sq: 196, val: 14 },
        { sq: 225, val: 15 },
        { sq: 256, val: 16 },
        { sq: 121, val: 11 },
        { sq: 144, val: 12 },
      ];
      const choice = rootPairs[Math.floor(Math.random() * rootPairs.length)];
      const bonus = Math.floor(Math.random() * 10) + 2;
      const ans = choice.val + bonus;
      return {
        id,
        grade: 8,
        difficulty: 'hard',
        category: 'Квадрат тамырлар',
        question: `Эсептеңиз: √${choice.sq} + ${bonus}`,
        formula: `\\sqrt{${choice.sq}} + ${bonus} = ?`,
        options: shuffleArray([String(ans), String(ans + 2), String(ans - 3), String(ans + 5)]),
        correctIndex: 0,
        explanation: `√${choice.sq} = ${choice.val}. ${choice.val} + ${bonus} = ${ans}.`,
        hint: `${choice.val}² = ${choice.sq}.`
      };
    } else if (rand < 0.7) {
      // Pythagoras
      const pythTriples = [
        { a: 3, b: 4, c: 5 },
        { a: 6, b: 8, c: 10 },
        { a: 5, b: 12, c: 13 },
        { a: 8, b: 15, c: 17 }
      ];
      const p = pythTriples[Math.floor(Math.random() * pythTriples.length)];
      return {
        id,
        grade: 8,
        difficulty: 'hard',
        category: 'Геометрия',
        question: `Тик бурчтуу үч бурчтуктун катеттери ${p.a} см жана ${p.b} см болсо, гипотенузасын тапкыла:`,
        formula: `c^2 = ${p.a}^2 + ${p.b}^2`,
        options: shuffleArray([`${p.c} см`, `${p.c + 2} см`, `${p.c - 1} см`, `${p.a + p.b} см`]),
        correctIndex: 0,
        explanation: `c = √(${p.a}² + ${p.b}²) = √(${p.a * p.a} + ${p.b * p.b}) = √${p.c * p.c} = ${p.c} см.`,
        hint: `Пифагор теоремасы: c² = a² + b²`
      };
    } else {
      // Difference of squares
      const numA = Math.floor(Math.random() * 5) + 25;
      const numB = numA - 2; // e.g. 26 and 24 => (26-24)(26+24) = 2 * 50 = 100
      const ans = numA * numA - numB * numB;
      return {
        id,
        grade: 8,
        difficulty: 'hard',
        category: 'Кыскача көбөйтүү',
        question: `Эсептеңиз: ${numA}² - ${numB}²`,
        formula: `${numA}^2 - ${numB}^2 = ?`,
        options: shuffleArray([String(ans), String(ans + 20), String(ans - 10), String(ans * 2)]),
        correctIndex: 0,
        explanation: `Квадраттардын айырмасы: (${numA} - ${numB}) × (${numA} + ${numB}) = ${numA - numB} × ${numA + numB} = ${ans}.`,
        hint: `a² - b² = (a - b)(a + b) формуласын колдонуңуз.`
      };
    }
  }
}

function shuffleArray(arr: string[]): string[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Function to fetch a randomized question set for a game session
export function getQuestionsForGame(difficulty: Difficulty, count: number = 10): MathQuestion[] {
  const filtered = mathQuestionsDatabase.filter(q => q.difficulty === difficulty);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());

  const result: MathQuestion[] = [];

  for (let i = 0; i < count; i++) {
    if (i < shuffled.length) {
      // Re-shuffle options for each question so correctIndex is dynamic
      const orig = shuffled[i];
      const correctOption = orig.options[orig.correctIndex];
      const shuffledOptions = shuffleArray(orig.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctOption);

      result.push({
        ...orig,
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      });
    } else {
      // Generate procedural question if more needed
      const proc = generateProceduralQuestion(difficulty);
      const correctOption = proc.options[0];
      const shuffledOptions = shuffleArray(proc.options);
      result.push({
        ...proc,
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(correctOption)
      });
    }
  }

  return result;
}
