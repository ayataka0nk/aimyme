export class SafeFormData {
  public formData: FormData
  public constructor(formData: FormData) {
    this.formData = formData
  }

  public getStringOptional(name: string): string | undefined {
    const value = this.formData.get(name)
    if (value === null) {
      return undefined
    }
    if (typeof value !== 'string') {
      throw new Error('Invalid form data')
    }
    return value
  }

  public getNumberOptional(name: string): number | undefined {
    const value = this.formData.get(name)
    if (value === null) {
      return undefined
    }

    const number = Number(value)
    if (!isNaN(number)) {
      throw new Error('Invalid form data')
    }

    return number
  }

  public getBooleanOptional(name: string): boolean | undefined {
    const value = this.formData.get(name)
    if (value === null) {
      return undefined
    }

    if (value === 'true') {
      return true
    }
    if (value === 'false') {
      return false
    }
    throw new Error('Invalid form data')
  }

  public getString(name: string): string {
    const value = this.getStringOptional(name)
    if (typeof value === 'undefined') {
      throw new Error('Invalid form data')
    }
    return value
  }

  public getNumber(name: string): number {
    const value = this.getNumberOptional(name)
    if (typeof value === 'undefined') {
      throw new Error('Invalid form data')
    }
    return value
  }

  public getBoolean(name: string): boolean {
    const value = this.getBooleanOptional(name)
    if (typeof value === 'undefined') {
      return false
    }
    return value
  }
}
