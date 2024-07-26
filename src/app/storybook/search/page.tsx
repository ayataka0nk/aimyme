'use client'

import { DockedSearchForm } from '@/templates/Search/DockedSearchForm'
import { actionSample } from './action'

export default function SearchPage() {
  return (
    <div>
      <h1>Search</h1>
      <div>
        <DockedSearchForm
          name="keyword"
          historyKey="sample"
          layer="surface-container-highest"
          searchedValue="foo"
          action={actionSample}
        />
      </div>
    </div>
  )
}
