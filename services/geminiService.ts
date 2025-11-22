import { GoogleGenAI } from "@google/genai";

export const generatePropertyDescription = async (
  type: string,
  address: string,
  features: string
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
        return "Chave de API não configurada. Por favor, preencha a descrição manualmente.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Atue como um corretor de imóveis experiente.
      Crie uma descrição curta, atraente e vendedora para um imóvel com as seguintes características:
      Tipo: ${type}
      Endereço (bairro/cidade): ${address}
      Características principais: ${features}

      Use no máximo 300 caracteres. O tom deve ser profissional e convidativo.
      Responda apenas com a descrição.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a descrição.";
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    return "Erro ao conectar com a IA. Tente novamente mais tarde.";
  }
};