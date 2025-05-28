export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          image: string
          author: string
          created_at: string
          updated_at: string
          status: 'draft' | 'published' | 'archived'
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          image: string
          author: string
          created_at?: string
          updated_at?: string
          status?: 'draft' | 'published' | 'archived'
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          image?: string
          author?: string
          created_at?: string
          updated_at?: string
          status?: 'draft' | 'published' | 'archived'
        }
      }
    }
  }
}