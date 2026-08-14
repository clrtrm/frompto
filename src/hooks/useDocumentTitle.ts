import { useEffect } from 'react'

const APP_NAME = 'Prompto'

const useDocumentTitle = (
  title: string,
  options: { prefixed?: boolean } = {},
): void => {
  const { prefixed = true } = options

  useEffect(() => {
    const previousTitle = document.title
    document.title = prefixed ? `${APP_NAME} | ${title}` : title

    return () => {
      document.title = previousTitle
    }
  }, [title, prefixed])
}

export default useDocumentTitle
