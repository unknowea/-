import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { FALLBACK_CATEGORIES, FALLBACK_ITEM_DETAILS, FALLBACK_BIBLE_BOOKS } from './src/fallbackData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GoogleGenAI client on the server side securely
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Robust retry wrapper for Gemini generateContent to handle temporary 503 or 429 errors
  async function generateContentWithRetry(params: any, maxAttempts = 3, initialDelayMs = 1000): Promise<any> {
    let lastError: any;
    let delay = initialDelayMs;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await ai.models.generateContent(params);
      } catch (error: any) {
        lastError = error;
        // Check for 503 (Service Unavailable) or 429 (Too Many Requests/Rate Limit)
        const status = error?.status || error?.code || (error?.message && parseInt(error.message.match(/\b\d{3}\b/)?.[0] || '0', 10));
        const isTransient = status === 503 || status === 429 || 
                            error?.message?.includes('503') || 
                            error?.message?.includes('429') || 
                            error?.message?.includes('UNAVAILABLE') || 
                            error?.message?.includes('Resource has been exhausted');
        
        if (!isTransient || attempt === maxAttempts) {
          throw error;
        }
        console.warn(`Gemini API transient error on attempt ${attempt}/${maxAttempts} (${error?.message || '503'}). Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
      }
    }
    throw lastError;
  }

  // API Route for Bible books overview
  app.post('/api/gemini/bible', async (req, res) => {
    const { bookName, language } = req.body;
    try {
      if (!bookName || !language) {
        return res.status(400).json({ error: 'bookName and language are required' });
      }

      if (!apiKey) {
        const text = FALLBACK_BIBLE_BOOKS[bookName]?.[language] || FALLBACK_BIBLE_BOOKS[bookName]?.['English'] || FALLBACK_BIBLE_BOOKS['default']?.[language] || FALLBACK_BIBLE_BOOKS['default']?.['English'];
        return res.json({ text });
      }

      const promptText = `Using Google Search results, provide a comprehensive, extremely detailed theological and historical overview of the Bible book "${bookName}" in ${language}. 
      Focus on its importance and unique interpretation in the Ethiopian Orthodox Tewahedo Church. Use Markdown.
      You MUST provide an extensive, rich, and highly detailed historical text of at least 20 substantial lines/paragraphs, with structured sections detailing its authorship, themes, and liturgical significance.`;

      const response = await generateContentWithRetry({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      res.json({ text: response.text || '' });
    } catch (error: any) {
      console.error('Gemini Bible Error, using fallback:', error);
      const text = FALLBACK_BIBLE_BOOKS[bookName]?.[language] || FALLBACK_BIBLE_BOOKS[bookName]?.['English'] || FALLBACK_BIBLE_BOOKS['default']?.[language] || FALLBACK_BIBLE_BOOKS['default']?.['English'];
      res.json({ text });
    }
  });

  // API Route for Category listings
  app.post('/api/gemini/category', async (req, res) => {
    const { categoryId, language } = req.body;
    try {
      if (!categoryId || !language) {
        return res.status(400).json({ error: 'categoryId and language are required' });
      }

      if (!apiKey) {
        const fallbackList = FALLBACK_CATEGORIES[categoryId]?.[language] || FALLBACK_CATEGORIES[categoryId]?.['English'] || [];
        return res.json(fallbackList);
      }

      const promptText = `Provide 10 major spiritual entries for the category "${categoryId}" in ${language}. 
      Return ONLY valid JSON: [{"name": "...", "description": "...", "searchTerms": "..."}]`;

      const response = await generateContentWithRetry({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: { 
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                searchTerms: { type: Type.STRING }
              },
              required: ['name', 'description', 'searchTerms']
            }
          }
        }
      });

      res.json(JSON.parse(response.text || '[]'));
    } catch (error: any) {
      console.error('Gemini Category Error, using fallback:', error);
      const fallbackList = FALLBACK_CATEGORIES[categoryId]?.[language] || FALLBACK_CATEGORIES[categoryId]?.['English'] || [];
      res.json(fallbackList);
    }
  });

  // API Route for specific Item history/detail (such as specific monasteries, abnet types, or holidays)
  app.post('/api/gemini/item', async (req, res) => {
    const { itemName, language } = req.body;
    try {
      if (!itemName || !language) {
        return res.status(400).json({ error: 'itemName and language are required' });
      }

      if (!apiKey) {
        const text = FALLBACK_ITEM_DETAILS[itemName]?.[language] || FALLBACK_ITEM_DETAILS[itemName]?.['English'] || FALLBACK_ITEM_DETAILS['default']?.[language] || FALLBACK_ITEM_DETAILS['default']?.['English'];
        return res.json({ text });
      }

      // Asking for a highly detailed and exhaustive history to fulfill the user's request for "more text history"
      const promptText = `Using Google Search results, write an AUTHENTIC and EXTREMELY DETAILED, comprehensive history of "${itemName}" in ${language} for the Ethiopian Orthodox Church tradition. 
      You MUST provide at least 20 substantial lines/paragraphs of rich historical, theological, and geographical information.
      Write a long, rich, and exhaustive account containing:
      1. Historical Origins and Founding Era (dates, founders, kings, and spiritual context with precise historical details).
      2. Life and Gedl (spiritual struggle) of the Founding Saint or associated teachers.
      3. Sacred Relics, Treasures, and Manuscripts preserved.
      4. Unique Architectural, Geographical, and Cave/Rock design features.
      5. Liturgical, Theological, and Spiritual significance to the Tewahedo Orthodox faith.
      
      Make the content highly descriptive, detailed, and at least 20 lines of rich text. Use beautiful, elegant Markdown styling and headers. At the end, add 'IMAGE_TAGS: [3 descriptive English keywords]'.`;

      const response = await generateContentWithRetry({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      res.json({ text: response.text || '' });
    } catch (error: any) {
      console.error('Gemini Item Error, using fallback:', error);
      const text = FALLBACK_ITEM_DETAILS[itemName]?.[language] || FALLBACK_ITEM_DETAILS[itemName]?.['English'] || FALLBACK_ITEM_DETAILS['default']?.[language] || FALLBACK_ITEM_DETAILS['default']?.['English'];
      res.json({ text });
    }
  });

  // API Route for Audio Narration generation
  app.post('/api/gemini/audio', async (req, res) => {
    try {
      const { itemName, prompt, language } = req.body;
      if (!itemName || !prompt || !language) {
        return res.status(400).json({ error: 'itemName, prompt and language are required' });
      }

      if (!apiKey) {
        return res.status(503).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
      }

      // Generate text history/narration
      const genPrompt = `Generate a comprehensive and immersive narration (approx 600 words) of the history of ${itemName} in ${language}. 
      Context: ${prompt}. 
      Tone: Deeply spiritual, respectful, and educational. Use clean narration text without markdown tags.`;

      const genResult = await generateContentWithRetry({
        model: 'gemini-3.5-flash',
        contents: genPrompt,
      });

      const textToSpeak = genResult.text;
      if (!textToSpeak) {
        return res.status(500).json({ error: 'Failed to generate narration text' });
      }

      // Convert text to speech using gemini-2.5-flash (which supports AUDIO modality)
      const ttsResponse = await generateContentWithRetry({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, 
            },
          },
        },
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: 'The narration service is currently unavailable.' });
      }

      res.json({ audioBase64: base64Audio });
    } catch (error: any) {
      console.error('Gemini Audio Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate audio history' });
    }
  });

  // Vite middleware for development or serving compiled static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
