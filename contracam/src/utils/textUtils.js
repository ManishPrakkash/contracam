import { HfInference } from '@huggingface/inference'; // Correct import for HfInference

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const summarizeText = async (inputText) => {
  try {
    const { summary_text } = await hf.summarization({
      model: 'facebook/bart-large-cnn', // Use a summarization model
      inputs: inputText,
    });
    return summary_text; // Adjust to the correct response field
  } catch (error) {
    console.error('Error during summarization:', error); // Log the error
    return 'Error summarizing text.';
  }
};

export const detectAlerts = (inputText, triggers) => {
  const alerts = triggers.filter((trigger) => inputText.includes(trigger));
  return alerts;
};
