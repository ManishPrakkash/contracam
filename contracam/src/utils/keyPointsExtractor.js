import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

/**
 * Extracts concise and optimized key points from the given text using Hugging Face's summarization model.
 * @param {string} inputText - The OCR data or full text to extract key points from.
 * @returns {Promise<string[]>} - A promise that resolves to an array of approximately 5 key points.
 */
export const extractKeyPoints = async (inputText) => {
  // Validate input
  if (!inputText || typeof inputText !== 'string') {
    return ['No key points available.'];
  }

  try {
    // Use Hugging Face's summarization model to extract a summary
    const { summary_text: summary } = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: inputText,
    });

    // Split the input text into sentences efficiently
    const sentences = inputText
      .split(/(?<=\.)\s+/) // Split on sentence-ending periods followed by whitespace
      .map((s) => s.trim()) // Trim whitespace from each sentence
      .filter(Boolean); // Remove empty strings

    // Rank sentences based on their relevance to the summary
    const rankedSentences = sentences.map((sentence) => ({
      sentence,
      relevance: summary.includes(sentence) ? 1 : 0, // Assign a relevance score
    }));

    // Sort sentences by relevance and select the top 5
    let keyPoints = rankedSentences
      .filter((item) => item.relevance > 0) // Keep only relevant sentences
      .map((item) => item.sentence)
      .slice(0, 5) // Limit to 5 key points
      .map((sentence) => sentence.endsWith('.') ? sentence : `${sentence}.`); // Ensure sentences end with a period

    // Fallback: If no sentences match the summary, select the first 5 coherent sentences
    if (keyPoints.length === 0) {
      keyPoints = sentences
        .filter((sentence) => sentence.length > 20) // Filter out very short sentences
        .slice(0, 5)
        .map((sentence) => sentence.endsWith('.') ? sentence : `${sentence}.`);
    }

    // Add placeholders if fewer than 5 key points are extracted
    while (keyPoints.length < 5) {
      keyPoints.push('No additional key points available.');
    }

    return keyPoints; // Return key points without numbering
  } catch (error) {
    console.error('Error extracting key points:', error);
    return ['Error extracting key points.'];
  }
};

// Example usage
const ocrText = `
Agreement for Services This Agreement is executed on 11 April 2025, between: First Party (Service Provider): Manish Purpose: This Agreement pertains to digital strategy consulting and process enhancement services to be rendered by the First Party. Terms: 1. Commencement & Duration: Services will commence on 15 April 2025 and span a 45-day timeline, unless a mutually agreed written extension is provided. 2. Fee Structure: a.
`;

extractKeyPoints(ocrText).then((keyPoints) => {
  console.log('Key Points:', keyPoints);
});
