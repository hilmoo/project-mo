interface Category {
  id: string;
  name: string;
}
export interface Competition {
  id: string;
  name: string;
  description: string;
  organizer: string;
  url: string;
  image: string;
  category: Array<Category>;
  deadline: string;
  upload_date: string;
  deadlineUnix?: number;
}

export interface CompetitionArray extends Array<Competition> {}

export interface CompetitionForm {
  name: string;
  organizer: string;
  deadline: Date;
  url: string;
  description: string;
  image?: Array<FileWithPath>;
  img_url?: string;
  category: Array<string>;
}

export interface CompetitionGemini {
  name: string;
  description: string;
  organizer: string;
  url: string;
  deadline: Date;
  url_image: string;
}

export interface APIResponseArr {
  success: boolean;
  data: Array<Competition>;
}

export interface APIResponse {
  success: boolean;
  data?: Competition;
  error?: Array<string>;
}

export interface GeminiResponse {
  success: boolean;
  data?: CompetitionGemini;
  error?: Array<string>;
}

export interface loaderIndex {
  competition: CompetitionArray;
  category: Array<Category>;
}

export interface loaderUpload {
  categoryArray: Array<Category>;
  endpoint: string;
  turnstile: string;
}
