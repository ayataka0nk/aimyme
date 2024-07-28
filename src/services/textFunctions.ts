import { Prisma } from '@prisma/client'
import { getSessionOrFail } from './sessions'
import { prisma } from '@/prisma'
import { TextFunctionDefinition } from '@/types'
import { notFound } from 'next/navigation'
import OpenAI from 'openai'
import { getCurrentUserOrFail } from './authentications'

export const getTextFunctions = async ({
  keyword
}: {
  keyword?: string
}): Promise<TextFunctionDefinition[]> => {
  const { userId } = await getSessionOrFail()
  const where: Prisma.TextFunctionDefinitionWhereInput = {
    userId: userId
  }
  if (keyword) {
    where.name = {
      contains: keyword
    }
  }
  const textFunctions = await prisma.textFunctionDefinition.findMany({
    where: where,
    orderBy: {
      id: 'desc'
    }
  })
  const data = textFunctions.map((textFunction) => ({
    id: textFunction.id,
    name: textFunction.name,
    definition: textFunction.definition
  }))
  return data
}

export const getTextFunction = async (id: string) => {
  const { userId } = await getSessionOrFail()

  const textFunction = await prisma.textFunctionDefinition.findFirst({
    where: {
      id,
      userId: userId
    }
  })
  if (textFunction === null) {
    notFound()
  }
  return {
    id: textFunction.id,
    name: textFunction.name,
    definition: textFunction.definition
  }
}

export type StoreTextFunctionParams = {
  name: string
  definition: string
}

export const storeTextFunction = async (
  params: StoreTextFunctionParams
): Promise<string> => {
  const { userId } = await getSessionOrFail()
  const textFunction = await prisma.textFunctionDefinition.create({
    data: {
      name: params.name,
      definition: params.definition,
      userId: userId
    }
  })
  return textFunction.id
}

export type UpdateTextFunctionParams = {
  id: string
  name: string
  definition: string
}

export const updateTextFunction = async (
  params: UpdateTextFunctionParams
): Promise<void> => {
  const { userId } = await getSessionOrFail()
  await prisma.textFunctionDefinition.update({
    where: {
      id: params.id
    },
    data: {
      name: params.name,
      definition: params.definition
    }
  })
}

export const deleteTextFunction = async (id: string) => {
  const { userId } = await getSessionOrFail()
  await prisma.textFunctionDefinition.deleteMany({
    where: {
      id: id,
      userId: userId
    }
  })
}

export interface TextFunction {
  execute(definition: string, input: string): Promise<string>
}
type TextFunctionType = 'velocity'

class VelocityTextFunction implements TextFunction {
  private client: OpenAI
  constructor() {
    this.client = new OpenAI()
  }
  async execute(definition: string, input: string): Promise<string> {
    const user = await getCurrentUserOrFail()
    const chatCompletion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: definition },
        { role: 'user', content: input }
      ]
    })
    const reply = chatCompletion.choices[0].message.content
    if (reply === null) {
      throw new Error('Failed to generate text')
    }
    await prisma.textFunctionLog.create({
      data: {
        userId: user.id,
        definition: definition,
        input: input,
        output: reply
      }
    })
    return reply
  }
}

export const createTextFunction = (type?: TextFunctionType): TextFunction => {
  return new VelocityTextFunction()
}
