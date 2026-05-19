import { PROJECTS, PERSONAL } from './constants';

export interface ChatResponse {
  text: string;
  suggestions?: string[];
  handover?: boolean;
}

const FAQ_KNOWLEDGE = [
  {
    category: 'who_are_you',
    keywords: ['who are you', 'your name', 'about you', 'who is', 'robin', 'ruke', 'bot', 'assistant', 'greet', 'hi', 'hey', 'hello', 'yo'],
    response: `I am **Ruke**, Al Amin Robin's AI Assistant! I can tell you about Robin, who is a professional Fullstack Software Engineer with over 6 years of experience building premium web applications, SaaS products, and high-performance user interfaces.`,
    suggestions: ['What are your services?', 'Show your projects', 'How to contact Robin']
  },
  {
    category: 'experience',
    keywords: ['experience', 'how long', 'years of', 'career', 'history', 'background', 'exp'],
    response: `Al Amin Robin has over **6+ years of professional engineering experience**. He has completed 13,000+ tasks/projects and maintains a perfect 5-star rating across top client platforms.`,
    suggestions: ['What is your tech stack?', 'Show your projects', 'Contact Robin']
  },
  {
    category: 'skills',
    keywords: ['skills', 'tech stack', 'languages', 'technologies', 'frameworks', 'skills', 'stack', 'tech', 'coding'],
    response: `Robin's expertise spans the entire development stack:\n\n* **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js\n* **Backend**: Node.js, Express, Python, Django, PostgreSQL, MongoDB, Prisma\n* **CMS**: WordPress, PHP, Elementor, Custom Theme development`,
    suggestions: ['Show Next.js projects', 'Show React projects', 'What are your services?']
  },
  {
    category: 'services',
    keywords: ['services', 'what do you do', 'what can you build', 'work', 'offer', 'service', 'skills'],
    response: `Robin offers high-end software development services including:\n\n1. **Fullstack Web Apps**: High-performance React, Next.js, and TypeScript applications.\n2. **Custom APIs & Backends**: Secure, scalable Node.js & Python backends.\n3. **Premium UI/UX**: Responsive, interactive, and eye-catching animated user interfaces.\n4. **WordPress & CMS**: Custom themes, plugins, and performance optimizations.`,
    suggestions: ['How much do you charge?', 'Show your projects', 'Contact Robin']
  },
  {
    category: 'pricing',
    keywords: ['price', 'rate', 'cost', 'charge', 'how much', 'hire', 'pricing', 'money', 'fee', 'budget'],
    response: `Robin's rates depend on the project's scope, complexity, and timeline. He offers flexible hiring models (hourly or fixed price).\n\nTo get a custom quote for your project, please message Robin directly on WhatsApp!`,
    suggestions: ['Chat on WhatsApp', 'Show your projects', 'How to contact Robin']
  },
  {
    category: 'contact',
    keywords: ['contact', 'email', 'social', 'linkedin', 'github', 'reach', 'find you', 'phone', 'number', 'whatsapp', 'hire'],
    response: `You can reach out to Al Amin Robin through multiple channels:\n\n* **Email**: ${PERSONAL.email}\n* **GitHub**: [Profile](${PERSONAL.github})\n* **LinkedIn**: [Profile](${PERSONAL.linkedin})\n* **WhatsApp**: Direct chat available via the button below!`,
    suggestions: ['Chat on WhatsApp', 'Download CV', 'Show your projects']
  },
  {
    category: 'cv',
    keywords: ['cv', 'resume', 'download cv', 'portfolio pdf', 'pdf'],
    response: `You can download Robin's professional CV / Resume directly using this link: [Download CV / Resume](${PERSONAL.cvUrl})`,
    suggestions: ['What is your experience?', 'Show your projects', 'Contact Robin']
  },
  {
    category: 'location',
    keywords: ['location', 'where do you live', 'where are you', 'timezone', 'country', 'bangladesh', 'gmt'],
    response: `Robin is based in **Bangladesh** (Timezone: **${PERSONAL.timezone}**). He works remotely with clients worldwide across various timezones (US, UK, Europe, Australia).`,
    suggestions: ['Are you available now?', 'What are your services?', 'Contact Robin']
  },
  {
    category: 'availability',
    keywords: ['available', 'availability', 'hire now', 'free to work', 'busy'],
    response: `Yes! Robin is **currently available** for new projects and freelance opportunities. Feel free to contact him to discuss your project!`,
    suggestions: ['Chat on WhatsApp', 'Show your projects', 'What are your services?']
  }
];

// Helper: Levenshtein Distance for fuzzy string similarity
function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1  // deletion
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Helper: check if two words match fuzzily (allowing for typos)
function wordMatchesFuzzily(word: string, keyword: string): boolean {
  const w = word.toLowerCase().trim();
  const kw = keyword.toLowerCase().trim();
  
  // Exact match or substring inclusion (e.g. "contact" in "contacting")
  if (w === kw || w.includes(kw) || kw.includes(w)) {
    return true;
  }
  
  // Fuzzy threshold based on word length
  const maxDistance = w.length <= 4 ? 1 : 2;
  const dist = getLevenshteinDistance(w, kw);
  
  return dist <= maxDistance;
}

export function getChatbotResponse(query: string): ChatResponse {
  const cleanQuery = query.toLowerCase().replace(/[^\w\s+.-]/g, '').trim();

  if (!cleanQuery) {
    return {
      text: "Please tell me what you'd like to know! I can tell you about my skills, services, projects, or redirect you to Robin's WhatsApp."
    };
  }

  // Split query into individual words/tokens for advanced matching
  const words = cleanQuery.split(/\s+/);

  // Synonym / Typo Normalization Maps (maps common short writing or abbreviations)
  const normalizedWords = words.map(w => {
    if (['cntact', 'contac', 'conact', 'conatct', 'eml', 'phn', 'num', 'whastapp', 'wtsapp', 'wtsp'].includes(w)) return 'contact';
    if (['skls', 'skil', 'skils', 'stk', 'tch', 'techno'].includes(w)) return 'skills';
    if (['proj', 'projs', 'prj', 'prjs', 'port', 'portf', 'portfo'].includes(w)) return 'projects';
    if (['exp', 'expr', 'exprience', 'experince', 'yrs'].includes(w)) return 'experience';
    if (['prc', 'prce', 'budget', 'budg', 'cost', 'charge'].includes(w)) return 'price';
    if (['hi', 'hey', 'helo', 'hlw', 'greetings', 'yo'].includes(w)) return 'greet';
    if (['avail', 'avlbl', 'avb', 'free'].includes(w)) return 'available';
    if (['srvc', 'srvcs', 'servise', 'servises'].includes(w)) return 'services';
    return w;
  });

  // 1. Dynamic Project Search: Check if the user is asking about projects/technologies
  const isProjectRelated = normalizedWords.some(w => 
    ['projects', 'project', 'work', 'portfolio', 'showcase', 'built', 'app', 'website', 'done'].includes(w)
  );

  const techKeywords = ['next.js', 'nextjs', 'react', 'typescript', 'tailwind', 'wordpress', 'php', 'node', 'python', 'three.js', 'gsap', 'framer motion', 'css'];
  
  // Find matching technology (with fuzzy capability for tech)
  const matchedTech = techKeywords.find(tech => 
    normalizedWords.some(w => wordMatchesFuzzily(w, tech.replace('.js', '').replace('js', '')))
  );

  if (isProjectRelated || matchedTech) {
    let filteredProjects = PROJECTS;
    let techName = '';

    if (matchedTech) {
      techName = matchedTech === 'nextjs' ? 'Next.js' : matchedTech.charAt(0).toUpperCase() + matchedTech.slice(1);
      const searchTech = matchedTech === 'nextjs' ? 'next.js' : matchedTech;
      filteredProjects = PROJECTS.filter(p => 
        p.tech.some(t => t.toLowerCase().includes(searchTech)) ||
        p.title.toLowerCase().includes(searchTech)
      );
    }

    if (filteredProjects.length > 0) {
      const showcase = filteredProjects.slice(0, 3);
      let responseText = matchedTech 
        ? `Here are some featured projects built using **${techName}**:\n\n`
        : `Here are some of my top featured projects:\n\n`;

      showcase.forEach((proj) => {
        responseText += `* **${proj.title}** (${proj.category}): ${proj.description}\n`;
        if (proj.liveUrl) {
          responseText += `  [Live Link](${proj.liveUrl})\n`;
        }
        responseText += `  *Tech: ${proj.tech.slice(0, 4).join(', ')}*\n\n`;
      });

      responseText += `Would you like to see the full list? Visit the [Portfolio](/portfolio) page!`;

      return {
        text: responseText,
        suggestions: ['What is your tech stack?', 'How much do you charge?', 'Contact Robin']
      };
    } else if (matchedTech) {
      return {
        text: `I don't have projects tagged specifically with **${techName}** in my showcase right now, but I have built many custom solutions. Ask Robin directly about this via WhatsApp!`,
        suggestions: ['Chat on WhatsApp', 'Show all projects', 'List your skills']
      };
    }
  }

  // 2. Advanced Fuzzy matching for FAQ Categories
  // We count the number of word/token matches for each FAQ category
  const matchesCount = FAQ_KNOWLEDGE.map(faq => {
    let score = 0;
    
    // Check match for normalized words
    normalizedWords.forEach(queryWord => {
      faq.keywords.forEach(keyword => {
        // Splitting multi-word keywords to match individual words
        const keywordParts = keyword.split(/\s+/);
        keywordParts.forEach(kp => {
          if (wordMatchesFuzzily(queryWord, kp)) {
            score += 1;
            // Reward exact match additional score
            if (queryWord === kp) score += 1.5;
          }
        });
      });
    });

    return { faq, score };
  });

  // Sort matches by highest score
  const bestMatch = matchesCount.sort((a, b) => b.score - a.score)[0];

  // If we have a reasonable confidence match (score threshold >= 1.5)
  if (bestMatch && bestMatch.score >= 1.5) {
    return {
      text: bestMatch.faq.response,
      suggestions: bestMatch.faq.suggestions
    };
  }

  // 3. Fallback: Can't answer, direct to WhatsApp
  return {
    text: `I'm not completely sure about the answer to that. But Al Amin Robin can help you directly! Would you like to chat with him on WhatsApp?`,
    suggestions: ['Chat on WhatsApp', 'Show projects', 'List skills'],
    handover: true
  };
}
