import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
}

export const supabase = createClient(
  supabaseUrl || 'https://fospnnvfgsccidjqxtnx.supabase.co', 
  supabaseAnonKey || ''
)

// Auth functions
export const authService = {
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        console.error('Supabase auth error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
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

// Portfolio functions (using portfolio_sections table)
export const portfolioService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select(`
          *,
          section_images (
            id,
            image_url,
            caption,
            display_order
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase getAll error:', error)
        throw error
      }
      
      // Format data for Portfolio page - add image_url from first image
      const formattedData = data?.map(section => ({
        ...section,
        image_url: section.section_images?.[0]?.image_url || null,
        images: section.section_images?.map(img => img.image_url) || []
      })) || []
      
      return formattedData
    } catch (error) {
      console.error('Portfolio getAll error:', error)
      throw error
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select(`
          *,
          section_images (
            id,
            image_url,
            caption,
            display_order
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Supabase getById error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Portfolio getById error:', error)
      throw error
    }
  },

  async create(portfolioItem) {
    try {
      console.log('Creating portfolio item in Supabase:', portfolioItem)
      
      // Extract images from the portfolio item
      const { images, image_url, ...sectionData } = portfolioItem
      
      // Create the portfolio section
      const { data: section, error: sectionError } = await supabase
        .from('portfolio_sections')
        .insert([{
          title: sectionData.title,
          content: sectionData.article || sectionData.description || null,
          story: sectionData.article || sectionData.description || null,
          category: sectionData.category || null,
          location: sectionData.location || null,
          date: sectionData.date || null,
          created_at: sectionData.created_at || new Date().toISOString()
        }])
        .select()
      
      if (sectionError) {
        console.error('Supabase create section error:', sectionError)
        throw sectionError
      }
      
      console.log('Portfolio section created:', section)
      
      const sectionId = section[0].id
      
      // If there are images, create entries in section_images table
      if (images && images.length > 0) {
        const imageEntries = images.map((url, index) => ({
          section_id: sectionId,
          image_url: url,
          display_order: index + 1
        }))
        
        const { error: imagesError } = await supabase
          .from('section_images')
          .insert(imageEntries)
        
        if (imagesError) {
          console.error('Error inserting images:', imagesError)
          // Don't throw - section was created successfully
        }
      }
      
      // Return the complete section with images
      const { data: completeSection } = await supabase
        .from('portfolio_sections')
        .select(`
          *,
          section_images (
            id,
            image_url,
            caption,
            display_order
          )
        `)
        .eq('id', sectionId)
        .single()
      
      // Format for compatibility with existing code
      return {
        ...completeSection,
        image_url: images?.[0] || image_url || '',
        images: images || []
      }
    } catch (error) {
      console.error('Portfolio create error:', error)
      throw error
    }
  },

  async update(id, portfolioItem) {
    try {
      console.log('Updating portfolio item in Supabase:', id, portfolioItem)
      
      const { images, image_url, ...sectionData } = portfolioItem
      
      // Update the portfolio section
      const { data, error } = await supabase
        .from('portfolio_sections')
        .update({
          title: sectionData.title,
          content: sectionData.article || sectionData.description || '',
          category: sectionData.category,
          location: sectionData.location,
          date: sectionData.date
        })
        .eq('id', id)
        .select()
      
      if (error) {
        console.error('Supabase update error:', error)
        throw error
      }
      
      // Update images if provided
      if (images && images.length > 0) {
        // Delete existing images
        await supabase
          .from('section_images')
          .delete()
          .eq('section_id', id)
        
        // Insert new images
        const imageEntries = images.map((url, index) => ({
          section_id: id,
          image_url: url,
          display_order: index + 1
        }))
        
        await supabase
          .from('section_images')
          .insert(imageEntries)
      }
      
      console.log('Portfolio item updated successfully:', data)
      
      // Return formatted data
      return {
        ...data[0],
        image_url: images?.[0] || image_url || '',
        images: images || []
      }
    } catch (error) {
      console.error('Portfolio update error:', error)
      throw error
    }
  },

  async delete(id) {
    try {
      // Delete associated images first
      await supabase
        .from('section_images')
        .delete()
        .eq('section_id', id)
      
      // Delete the section
      const { error } = await supabase
        .from('portfolio_sections')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Portfolio delete error:', error)
      throw error
    }
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
