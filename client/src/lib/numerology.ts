// Numerology calculation functions

export function reduceNumber(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

export function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const total = day + month + year;
  return reduceNumber(total);
}

export function letterValue(letter: string): number {
  const values: Record<string, number> = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };
  return values[letter.toUpperCase()] || 0;
}

export function calculateDestinyNumber(fullName: string): number {
  const total = fullName.replace(/[^A-Za-z]/g, '').split('').reduce((sum, letter) => sum + letterValue(letter), 0);
  return reduceNumber(total);
}

export function calculateSoulUrge(fullName: string): number {
  const vowels = 'AEIOU';
  const total = fullName.replace(/[^A-Za-z]/g, '').split('')
    .filter(letter => vowels.includes(letter.toUpperCase()))
    .reduce((sum, letter) => sum + letterValue(letter), 0);
  return reduceNumber(total);
}

export function calculatePersonality(fullName: string): number {
  const vowels = 'AEIOU';
  const total = fullName.replace(/[^A-Za-z]/g, '').split('')
    .filter(letter => !vowels.includes(letter.toUpperCase()))
    .reduce((sum, letter) => sum + letterValue(letter), 0);
  return reduceNumber(total);
}

export function calculateBirthdayNumber(birthDate: string): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  return reduceNumber(day);
}

export function calculateAttitudeNumber(birthDate: string): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return reduceNumber(day + month);
}

export function detectKarmicDebtNumbers(lifePath: number, destiny: number, soulUrge: number, personality: number): number[] {
  const karmicNumbers = [13, 14, 16, 19];
  const allNumbers = [lifePath, destiny, soulUrge, personality];
  return karmicNumbers.filter(num => allNumbers.includes(num));
}

export function detectMasterNumbers(lifePath: number, destiny: number, soulUrge: number, personality: number): number[] {
  const masterNumbers = [11, 22, 33];
  const allNumbers = [lifePath, destiny, soulUrge, personality];
  return masterNumbers.filter(num => allNumbers.includes(num));
}

// Number interpretations
export const interpretations = {
  en: {
    lifePath: {
      1: "You are a natural leader with strong independence and determination. Your path involves pioneering new ideas and inspiring others to follow your vision. You have the ability to create your own reality and manifest your dreams through focused action.",
      2: "You are a natural diplomat and peacemaker. Your path involves cooperation, partnership, and bringing harmony to relationships and situations. You excel at working with others and creating balance in all areas of life.",
      3: "You are a creative communicator with natural artistic talents. Your path involves self-expression, creativity, and inspiring others through your words and art. You have the gift of bringing joy and optimism to the world.",
      4: "You are a practical builder with strong organizational skills. Your path involves creating stable foundations and working methodically toward long-term goals. You excel at turning dreams into concrete reality through hard work and dedication.",
      5: "You are an adventurous free spirit who craves variety and change. Your path involves exploring new experiences and helping others embrace freedom. You are meant to break barriers and explore uncharted territories.",
      6: "You are a natural nurturer and healer. Your path involves caring for others, creating harmony in your community, and taking responsibility for those you love. You have a deep desire to serve and protect others.",
      7: "You are a deep thinker and spiritual seeker. Your path involves seeking truth, developing wisdom, and sharing your insights with the world. You are drawn to mystery and have natural psychic abilities.",
      8: "You are a natural leader in material matters with strong business acumen. Your path involves achieving material success and using your power responsibly. You have the ability to create wealth and abundance.",
      9: "You are a humanitarian with a global perspective. Your path involves serving others and working for the greater good of humanity. You are meant to be a beacon of light and inspiration for others.",
      11: "You are an intuitive spiritual teacher with heightened psychic abilities. Your path involves developing your intuition and inspiring others through your spiritual insights. You are here to be a bridge between the physical and spiritual worlds.",
      22: "You are a master builder who can turn dreams into reality on a global scale. Your path involves creating something lasting that will benefit humanity. You have the power to manifest grand visions into concrete form.",
      33: "You are a master teacher and healer with the highest spiritual calling. Your path involves selfless service and helping others reach their highest potential. You are here to uplift humanity through love and compassion."
    },
    destiny: {
      1: "Your destiny is to be a pioneer and leader, creating new paths for others to follow.",
      2: "Your destiny is to be a bridge-builder, bringing people together in harmony and cooperation.",
      3: "Your destiny is to be a creative communicator, inspiring others through art and expression.",
      4: "Your destiny is to be a master builder, creating lasting structures and systems.",
      5: "Your destiny is to be an explorer and innovator, bringing freedom and change to the world.",
      6: "Your destiny is to be a healer and nurturer, caring for others and creating harmony.",
      7: "Your destiny is to be a seeker of truth, developing wisdom and spiritual insight.",
      8: "Your destiny is to be a leader in material success, creating abundance and prosperity.",
      9: "Your destiny is to be a humanitarian, serving the greater good of all humanity."
    }
  },
  ru: {
    lifePath: {
      1: "Вы прирожденный лидер с сильной независимостью и решимостью. Ваш путь включает в себя пионерство новых идей и вдохновение других следовать вашему видению. У вас есть способность создавать свою собственную реальность.",
      2: "Вы прирожденный дипломат и миротворец. Ваш путь включает сотрудничество, партнерство и внесение гармонии в отношения и ситуации. Вы превосходно работаете с другими.",
      3: "Вы творческий коммуникатор с природными художественными талантами. Ваш путь включает самовыражение, творчество и вдохновение других через ваши слова и искусство.",
      4: "Вы практичный строитель с сильными организационными навыками. Ваш путь включает создание стабильных основ и методичную работу для достижения долгосрочных целей.",
      5: "Вы авантюрный свободный дух, жаждущий разнообразия и перемен. Ваш путь включает изучение новых впечатлений и помощь другим принять свободу.",
      6: "Вы прирожденный воспитатель и целитель. Ваш путь включает заботу о других, создание гармонии в вашем сообществе и ответственность за тех, кого вы любите.",
      7: "Вы глубокий мыслитель и духовный искатель. Ваш путь включает поиск истины, развитие мудрости и обмен своими прозрениями с миром.",
      8: "Вы прирожденный лидер в материальных вопросах с сильной деловой хваткой. Ваш путь включает достижение материального успеха и ответственное использование вашей власти.",
      9: "Вы гуманист с глобальной перспективой. Ваш путь включает служение другим и работу на благо всего человечества.",
      11: "Вы интуитивный духовный учитель с повышенными экстрасенсорными способностями. Ваш путь включает развитие интуиции и вдохновение других.",
      22: "Вы мастер-строитель, который может превратить мечты в реальность в глобальном масштабе. Ваш путь включает создание чего-то долговечного.",
      33: "Вы мастер-учитель и целитель с высочайшим духовным призванием. Ваш путь включает бескорыстное служение и помощь другим."
    },
    destiny: {
      1: "Ваша судьба - быть пионером и лидером, создавая новые пути для других.",
      2: "Ваша судьба - быть строителем мостов, объединяя людей в гармонии и сотрудничестве.",
      3: "Ваша судьба - быть творческим коммуникатором, вдохновляя других через искусство.",
      4: "Ваша судьба - быть мастером-строителем, создавая прочные структуры и системы.",
      5: "Ваша судьба - быть исследователем и новатором, принося свободу и изменения в мир.",
      6: "Ваша судьба - быть целителем и воспитателем, заботясь о других и создавая гармонию.",
      7: "Ваша судьба - быть искателем истины, развивая мудрость и духовное прозрение.",
      8: "Ваша судьба - быть лидером в материальном успехе, создавая изобилие и процветание.",
      9: "Ваша судьба - быть гуманистом, служащим всеобщему благу человечества."
    }
  },
  cs: {
    lifePath: {
      1: "Jste přirozený vůdce se silnou nezávislostí a odhodláním. Vaše cesta zahrnuje průkopnictví nových myšlenek a inspirování ostatních, aby následovali vaši vizi.",
      2: "Jste přirozený diplomat a mírový tvůrce. Vaše cesta zahrnuje spolupráci, partnerství a vnášení harmonie do vztahů a situací.",
      3: "Jste kreativní komunikátor s přirozenými uměleckými talenty. Vaše cesta zahrnuje sebevyjádření, kreativitu a inspirování ostatních.",
      4: "Jste praktický stavitel se silnými organizačními dovednostmi. Vaše cesta zahrnuje vytváření stabilních základů a metodické práce.",
      5: "Jste dobrodružný svobodný duch, který touží po rozmanitosti a změně. Vaše cesta zahrnuje zkoumání nových zkušeností.",
      6: "Jste přirozený pečovatel a léčitel. Vaše cesta zahrnuje péči o ostatní, vytváření harmonie ve vaší komunitě.",
      7: "Jste hluboký myslitel a duchovní hledač. Vaše cesta zahrnuje hledání pravdy, rozvoj moudrosti a sdílení svých pozorování.",
      8: "Jste přirozený vůdce v materiálních záležitostech se silným obchodním důvtipem. Vaše cesta zahrnuje dosažení materiálního úspěchu.",
      9: "Jste humanista s globální perspektivou. Vaše cesta zahrnuje službu ostatním a práci pro větší dobro lidstva.",
      11: "Jste intuitivní duchovní učitel s vyvinutými psychickými schopnostmi. Vaše cesta zahrnuje rozvoj intuice a inspirování ostatních.",
      22: "Jste mistr stavitel, který může proměnit sny ve skutečnost v globálním měřítku. Vaše cesta zahrnuje vytvoření něčeho trvalého.",
      33: "Jste mistr učitel a léčitel s nejvyšším duchovním povoláním. Vaše cesta zahrnuje nesobeckou službu a pomoc ostatním."
    },
    destiny: {
      1: "Vaším osudem je být průkopníkem a vůdcem, vytvářet nové cesty pro ostatní.",
      2: "Vaším osudem je být stavitelem mostů, spojovat lidi v harmonii a spolupráci.",
      3: "Vaším osudem je být kreativním komunikátorem, inspirovat ostatní prostřednictvím umění.",
      4: "Vaším osudem je být mistrem stavitelem, vytvářet trvalé struktury a systémy.",
      5: "Vaším osudem je být průzkumníkem a inovátorem, přinášet svobodu a změny do světa.",
      6: "Vaším osudem je být léčitelem a pečovatelem, starat se o ostatní a vytvářet harmonii.",
      7: "Vaším osudem je být hledačem pravdy, rozvíjet moudrost a duchovní vhled.",
      8: "Vaším osudem je být vůdcem v materiálním úspěchu, vytvářet hojnost a prosperitu.",
      9: "Vaším osudem je být humanistou, sloužit většímu dobru celého lidstva."
    }
  }
};

// Compatibility calculations
export function calculateCompatibilityScore(person1Numbers: Record<string, number>, person2Numbers: Record<string, number>, testType: string): number {
  let score = 0;
  
  if (testType === 'lifePath') {
    const diff = Math.abs(person1Numbers.lifePath - person2Numbers.lifePath);
    if (diff === 0) score = 100;
    else if (diff === 1 || diff === 8) score = 90;
    else if (diff === 2 || diff === 7) score = 75;
    else if (diff === 3 || diff === 6) score = 60;
    else score = 45;
  } else if (testType === 'name') {
    const destinyDiff = Math.abs(person1Numbers.destiny - person2Numbers.destiny);
    const soulUrgeDiff = Math.abs(person1Numbers.soulUrge - person2Numbers.soulUrge);
    const personalityDiff = Math.abs(person1Numbers.personality - person2Numbers.personality);
    
    const avgDiff = (destinyDiff + soulUrgeDiff + personalityDiff) / 3;
    score = Math.max(40, 100 - (avgDiff * 15));
  } else if (testType === 'complete') {
    const lifePathDiff = Math.abs(person1Numbers.lifePath - person2Numbers.lifePath);
    const destinyDiff = Math.abs(person1Numbers.destiny - person2Numbers.destiny);
    const soulUrgeDiff = Math.abs(person1Numbers.soulUrge - person2Numbers.soulUrge);
    const personalityDiff = Math.abs(person1Numbers.personality - person2Numbers.personality);
    
    const avgDiff = (lifePathDiff + destinyDiff + soulUrgeDiff + personalityDiff) / 4;
    score = Math.max(35, 100 - (avgDiff * 12));
  }
  
  return Math.round(score);
}

export function getCompatibilityInterpretation(score: number, language: string = 'en'): string {
  const interpretations = {
    en: {
      excellent: 'Excellent compatibility! You share similar life paths and understanding. This relationship has the potential for deep harmony and mutual support.',
      good: 'Good compatibility with potential for growth and mutual support. You complement each other well and can learn much together.',
      moderate: 'Moderate compatibility requiring understanding and compromise. With effort and communication, this relationship can flourish.',
      challenging: 'Challenging compatibility that may require significant effort to harmonize. Focus on understanding each other\'s differences.'
    },
    ru: {
      excellent: 'Отличная совместимость! Вы разделяете схожие жизненные пути и понимание. Эти отношения имеют потенциал для глубокой гармонии и взаимной поддержки.',
      good: 'Хорошая совместимость с потенциалом для роста и взаимной поддержки. Вы хорошо дополняете друг друга и можете многому научиться вместе.',
      moderate: 'Умеренная совместимость, требующая понимания и компромиссов. При усилиях и общении эти отношения могут процветать.',
      challenging: 'Сложная совместимость, которая может потребовать значительных усилий для гармонизации. Сосредоточьтесь на понимании различий друг друга.'
    },
    cs: {
      excellent: 'Výborná kompatibilita! Sdílíte podobné životní cesty a porozumění. Tento vztah má potenciál pro hlubokou harmonii a vzájemnou podporu.',
      good: 'Dobrá kompatibilita s potenciálem pro růst a vzájemnou podporu. Dobře se doplňujete a můžete se spolu hodně naučit.',
      moderate: 'Střední kompatibilita vyžadující porozumění a kompromisy. S úsilím a komunikací může tento vztah vzkvétat.',
      challenging: 'Náročná kompatibilita, která může vyžadovat značné úsilí k harmonizaci. Zaměřte se na pochopení vzájemných rozdílů.'
    }
  };
  
  if (score >= 85) return interpretations[language as keyof typeof interpretations]?.excellent || interpretations.en.excellent;
  if (score >= 70) return interpretations[language as keyof typeof interpretations]?.good || interpretations.en.good;
  if (score >= 55) return interpretations[language as keyof typeof interpretations]?.moderate || interpretations.en.moderate;
  return interpretations[language as keyof typeof interpretations]?.challenging || interpretations.en.challenging;
}
