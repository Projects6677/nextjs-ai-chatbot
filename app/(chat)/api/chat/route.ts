// Add these imports at the top of the file
import { mapSkills } from '@/lib/ai/tools/map-skills';
import { getCareerPaths } from '@/lib/ai/tools/get-career-paths';
import { getSkillGaps } from '@/lib/ai/tools/get-skill-gaps';
// ... other imports

// Inside the POST function, locate the `streamText` call
// and add your new tools to the `tools` object.
const stream = createUIMessageStream({
  execute: ({ writer: dataStream }) => {
    const result = streamText({
      model: myProvider.languageModel(selectedChatModel),
      system: systemPrompt({ selectedChatModel, requestHints }),
      messages: convertToModelMessages(uiMessages),
      stopWhen: stepCountIs(5),
      experimental_activeTools:
        selectedChatModel === 'chat-model-reasoning'
          ? []
          : [
              'getWeather',
              'createDocument',
              'updateDocument',
              'requestSuggestions',
              'mapSkills', // <-- Add your new tools here
              'getCareerPaths',
              'getSkillGaps',
            ],
      tools: {
        getWeather,
        createDocument: createDocument({ session, dataStream }),
        updateDocument: updateDocument({ session, dataStream }),
        requestSuggestions: requestSuggestions({
          session,
          dataStream,
        }),
        mapSkills: mapSkills(), // <-- Add your new tools here
        getCareerPaths: getCareerPaths(),
        getSkillGaps: getSkillGaps(),
      },
      experimental_telemetry: {
        isEnabled: isProductionEnvironment,
        functionId: 'stream-text',
      },
    });

    result.consumeStream();

    dataStream.merge(
      result.toUIMessageStream({
        sendReasoning: true,
      }),
    );
  },
  generateId: generateUUID,
  onFinish: async ({ messages }) => {
    await saveMessages({
      messages: messages.map((message) => ({
        id: message.id,
        role: message.role,
        parts: message.parts,
        createdAt: new Date(),
        attachments: [],
        chatId: id,
      })),
    });
  },
  onError: () => {
    return 'Oops, an error occurred!';
  },
});

// ... rest of the file
