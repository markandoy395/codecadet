const getFallbackUrl = (websiteUrl: string) => {
  const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  return `https://logo.clearbit.com/${domain}`
}
export default getFallbackUrl
