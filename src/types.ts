export type User = {
  id: string
  name: string
  email: string
}

export type ProjectSummary = {
  id: string
  name: string
  description: string
}

export type ProjectDetail = {
  id: string
  name: string
  description: string
}

export type TextFunctionDefinition = {
  id: string
  name: string
  definition: string
}

export type ServerURLSearchParams = {
  [key: string]: string | string[] | undefined
}

export type ServerFlatURLSearchParams = {
  [key: string]: string
}
