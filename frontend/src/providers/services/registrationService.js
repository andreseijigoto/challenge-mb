import { apiUrl } from '@/support'

export const PostRegistration = async (payload) => {
  const response = await fetch(`${apiUrl}/registration`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: payload
  })
  
  if (response.status === 200) {
    return { success: true }
  }
  return { success: false, error: response.error }
}
