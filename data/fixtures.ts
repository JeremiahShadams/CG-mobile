import type { RiskLevel } from '@/theme/tokens';

export interface CGDocument {
  id: string;
  title: string;
  pages: number;
  updatedAt: string;
  risk: RiskLevel;
  riskLabel: string;
  status: string;
}

export interface Finding {
  id: string;
  clauseNo: string;
  title: string;
  severity: RiskLevel;
  severityLabel: string;
  summary: string;
}

export interface Clause {
  id: string;
  no: string;
  title: string;
  risk: RiskLevel;
  riskLabel: string;
  meaning: string;
  why: string;
  evidence: { before: string; highlightA: string; middle: string; highlightB: string; after: string };
  evidenceStrength: string;
  related: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  subtext?: string;
  citation?: { clauseNo: string; title: string; page: string };
}

export const documents: CGDocument[] = [
  { id: 'employment', title: 'Employment Agreement', pages: 8, updatedAt: 'Updated today', risk: 'critical', riskLabel: 'HIGH RISK', status: 'Analysis complete' },
  { id: 'commercial-lease', title: 'Commercial Lease', pages: 14, updatedAt: 'Updated yesterday', risk: 'medium', riskLabel: 'MEDIUM RISK', status: 'Analysis complete' },
  { id: 'nda', title: 'Mutual NDA', pages: 2, updatedAt: 'Updated Oct 12, 2023', risk: 'safe', riskLabel: 'SAFE', status: 'Analysis complete' },
  { id: 'freelance-msa', title: 'Freelance MSA', pages: 5, updatedAt: 'Updated Sep 28, 2023', risk: 'critical', riskLabel: 'HIGH RISK', status: 'Review requested' },
  { id: 'tenancy', title: 'Tenancy Agreement', pages: 6, updatedAt: 'Yesterday', risk: 'medium', riskLabel: 'MEDIUM RISK', status: 'Analysis complete' },
];

export const recentDocuments = [
  { id: 'freelance-msa', title: 'Freelance MSA', date: '2 hours ago', risk: 'critical' as RiskLevel },
  { id: 'tenancy', title: 'Tenancy Agreement', date: 'Yesterday', risk: 'medium' as RiskLevel },
  { id: 'nda', title: 'Mutual NDA', date: 'Oct 12, 2023', risk: 'safe' as RiskLevel },
];

export const analysisSummary = {
  docId: 'employment',
  title: 'Employment Agreement',
  pages: 8,
  overall: 'HIGH RISK',
  totalFindings: 27,
  distribution: [
    { key: 'critical', count: 3, color: '#9B1C1C' },
    { key: 'high', count: 2, color: '#9F580A' },
    { key: 'medium', count: 4, color: '#EAB308' },
    { key: 'info', count: 7, color: '#3B82F6' },
    { key: 'safe', count: 11, color: '#166534' },
  ],
};

export const topFindings: Finding[] = [
  {
    id: 'f-8-2',
    clauseNo: 'Clause 8.2',
    title: 'Intellectual Property',
    severity: 'critical',
    severityLabel: 'Critical',
    summary: 'The clause appears to assign ownership of pre-existing material created before this agreement.',
  },
  {
    id: 'f-11-3',
    clauseNo: 'Clause 11.3',
    title: 'Termination',
    severity: 'high',
    severityLabel: 'High',
    summary: 'Allows termination by client immediately without notice or opportunity to cure breach.',
  },
  {
    id: 'f-14-1',
    clauseNo: 'Clause 14.1',
    title: 'Non-compete',
    severity: 'high',
    severityLabel: 'High',
    summary: 'Restricts working with competitors globally for 24 months after termination.',
  },
];

export const clause82: Clause = {
  id: '8-2',
  no: 'Clause 8.2',
  title: 'Intellectual Property',
  risk: 'critical',
  riskLabel: 'CRITICAL RISK',
  meaning:
    'This clause appears to assign ownership of all intellectual property you create to the company, even if it is not directly related to the contracted project or created during your working hours.',
  why: 'This broad language may allow the client to claim ownership over your personal projects, previous independent work, or future inventions that are entirely unrelated to this specific agreement. It severely limits your personal IP rights.',
  evidence: {
    before: '...',
    highlightA:
      'The Contractor agrees that all intellectual property, inventions, concepts, and materials created, conceived, or reduced to practice during the term of this Agreement',
    middle: ' shall be the sole and exclusive property of the Company, ',
    highlightB:
      'regardless of whether such materials were created using Company resources or during standard working hours.',
    after: '...',
  },
  evidenceStrength: 'Strong Match',
  related: ['Clause 8.4', 'Clause 11.3'],
};

export const viewerParagraphs = [
  { heading: true, text: '8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY' },
  {
    heading: false,
    text: "8.1 Confidential Information. The Contractor acknowledges that during the engagement, they will have access to and become acquainted with various trade secrets, inventions, innovations, processes, information, records and specifications owned or licensed by the Company and/or used by the Company in connection with the operation of its business including, without limitation, the Company's business and product processes, methods, customer lists, accounts and procedures.",
  },
  {
    heading: false,
    highlight: true,
    text: '8.2 Intellectual Property. The Contractor agrees that any and all works, inventions, discoveries, improvements, designs, and ideas, whether or not patentable or copyrightable, which the Contractor creates, conceives, or develops, either solely or jointly with others, during the term of this Agreement, shall be the sole and exclusive property of the Company. The Contractor hereby assigns to the Company all right, title, and interest in and to such Intellectual Property, including any copyrights, patents, trademarks, and trade secrets arising therefrom.',
  },
  {
    heading: false,
    text: '8.3 Pre-existing Materials. Subject to Section 8.2, if in the course of performing the Services, the Contractor incorporates into any Company property any pre-existing invention, improvement, development, concept, discovery or other proprietary information owned by the Contractor or in which the Contractor has an interest, the Company is hereby granted and shall have a non-exclusive, royalty-free, irrevocable, perpetual, worldwide license to make, have made, modify, use and sell such item as part of or in connection with such Company property.',
  },
  {
    heading: false,
    text: "8.4 Return of Property. Upon termination of this Agreement or whenever requested by the Company, the Contractor shall immediately deliver to the Company all property in the Contractor's possession or under the Contractor's control belonging to the Company, including all documents, records, notebooks, and similar repositories of or containing Confidential Information, including all copies thereof.",
  },
  {
    heading: false,
    text: '8.5 Survival. The provisions of this Section 8 shall survive the termination or expiration of this Agreement and remain in full force and effect.',
  },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', role: 'user', text: 'What happens if I miss a deadline?' },
  {
    id: 'm2',
    role: 'ai',
    text: "I can't establish that from the contract. The document does not specify exact penalties for missed deadlines.",
    subtext: 'The closest relevant provisions are regarding general breach of contract in Clause 11.2.',
  },
  { id: 'm3', role: 'user', text: 'Can they own my previous work?' },
  {
    id: 'm4',
    role: 'ai',
    text: 'Yes, under the current wording, the client may claim ownership of pre-existing material if it is incorporated into the final deliverables.',
    citation: { clauseNo: 'Clause 8.2', title: 'Intellectual Property', page: 'p.7' },
  },
];

export const suggestedQuestions = [
  'Can I terminate this contract early?',
  'How am I paid?',
  'Which clauses should I negotiate?',
];

export const lawyerCase = {
  id: 'CG-19482',
  title: 'Intellectual Property — Clause 8.2',
  docTitle: 'Employment Agreement',
  question: '"Can they claim my previous IP under this phrasing?"',
  response: {
    analysis:
      'Yes, the current phrasing "all intellectual property created by the Contractor" is too broad and does not specify a temporal limitation. As currently drafted, it could arguably encompass pre-existing IP that you bring to the project.',
    suggestedChange:
      '"...all intellectual property created by the Contractor specifically and exclusively for the Client during the Term of this Agreement..."',
    annotationNote: 'I have added an annotation to the document with this exact phrasing.',
    questionsToRaise: [
      'Ask them to append a "Schedule A" listing your pre-existing IP that is explicitly excluded from this assignment.',
    ],
  },
};

export const profile = {
  initials: 'JR',
  name: 'Jeremiah Rodriguez',
  email: 'jeremiah@example.com',
  greeting: 'Good morning, Jeremiah',
};
