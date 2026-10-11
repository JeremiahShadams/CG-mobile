import {
  analysisSummary,
  chatMessages,
  clause82,
  documents,
  lawyerCase,
  suggestedQuestions,
  topFindings,
  viewerParagraphs,
} from '@/data/fixtures';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Stub API layer — fixtures with fake latency. Swap for real backend calls later. */
export const api = {
  async getDocuments() {
    await delay(250);
    return documents;
  },
  async getAnalysis(docId: string) {
    await delay(400);
    return { summary: analysisSummary, findings: topFindings, docId };
  },
  async getClause(clauseId: string) {
    await delay(250);
    return { ...clause82, id: clauseId };
  },
  async getViewer(docId: string) {
    await delay(250);
    return { docId, paragraphs: viewerParagraphs, currentPage: 7, totalPages: 18 };
  },
  async getChat(docId: string) {
    await delay(250);
    return { docId, messages: chatMessages, suggestions: suggestedQuestions };
  },
  async getLawyerCase() {
    await delay(300);
    return lawyerCase;
  },
  async fakeUpload(onProgress: (pct: number) => void) {
    for (const pct of [12, 28, 44, 66, 84, 100]) {
      await delay(450);
      onProgress(pct);
    }
  },
};
