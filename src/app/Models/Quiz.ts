export interface Quiz {
    id: number;
    title: string;
    questions: Question[];
  }
  

  export interface Answer {
    id: number | null; // o id: number | undefined
    text: string;
    correct: boolean;
  }
  
  
  export interface Question {
    questionText: string;
    answers: Answer[];
    correctAnswerIndex: number;
  }
  