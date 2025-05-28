export interface Service {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  content: string;
  rating: number;
}

export interface WebinarRegistration {
  name: string;
  email: string;
  phone: string;
}

export interface ProgramFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}