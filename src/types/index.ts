export interface Plan {
  _id: number;
  name: string;
  duration: number;
  price: number;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Ticket {
  code: string;
  duration: number;
  planName?: string;
  price: number;
}
