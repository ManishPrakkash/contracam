import { HfInference } from '@huggingface/inference'; // Correct import for HfInference

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const summarizeText = async (inputText) => {
  try {
    const result = await hf.summarization({
      model: 'facebook/bart-large-cnn', // Use a summarization model
      inputs: inputText,
    });
    return result.summary_text; // Adjust to the correct response field
  } catch (error) {
    console.error('Error during summarization:', error);
    return 'Error summarizing text.';
  }
};

export const detectAlerts = (inputText, triggers) => {
  const alerts = triggers.filter((trigger) => inputText.includes(trigger));
  return alerts;
};
