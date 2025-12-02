import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Auth functions
export const authService = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }
}

// Portfolio functions
export const portfolioService = {
  async getAll() {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(portfolioItem) {
    const { data, error } = await supabase
      .from('portfolio')
      .insert([portfolioItem])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async update(id, portfolioItem) {
    const { data, error } = await supabase
      .from('portfolio')
      .update(portfolioItem)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Articles functions
export const articlesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(article) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async update(id, article) {
    const { data, error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

export default supabase
