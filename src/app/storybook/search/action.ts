'use server'

export const actionSample = (formData: FormData) => {
  const keyword = formData.get('keyword')
  console.log('keyword:', keyword)
}
