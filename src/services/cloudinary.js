// Cloudinary configuration
const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
}

export const cloudinaryService = {
  /**
   * Upload an image to Cloudinary
   * @param {File} file - The image file to upload
   * @param {Object} options - Additional upload options
   * @returns {Promise<Object>} Upload result with image URL
   */
  async uploadImage(file, options = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', cloudinaryConfig.uploadPreset)
    
    if (options.folder) {
      formData.append('folder', options.folder)
    }
    
    if (options.publicId) {
      formData.append('public_id', options.publicId)
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  /**
   * Get optimized image URL
   * @param {string} publicId - Cloudinary public ID
   * @param {Object} transformations - Image transformation options
   * @returns {string} Optimized image URL
   */
  getOptimizedUrl(publicId, transformations = {}) {
    const {
      width,
      height,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = transformations

    let transforms = `q_${quality},f_${format}`
    
    if (width) transforms += `,w_${width}`
    if (height) transforms += `,h_${height}`
    if (crop) transforms += `,c_${crop}`

    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transforms}/${publicId}`
  },

  /**
   * Delete an image from Cloudinary
   * @param {string} publicId - Cloudinary public ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteImage(publicId) {
    // Note: Deletion requires server-side implementation with API secret
    // This is a placeholder - implement on your backend
    console.warn('Image deletion should be handled server-side')
    return { success: false, message: 'Not implemented client-side' }
  }
}

export default cloudinaryService
