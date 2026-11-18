import type { FilterCondition, ComparisonOperator } from '@/types/filters.types'

export type FilterPrimitive = string | number | boolean | Date | null
export type FilterValue = FilterPrimitive | FilterPrimitive[]

export class FilterBuilder {
  private filters: FilterCondition[] = []

  add(field: string, operator: ComparisonOperator, value: FilterValue): this {
    this.filters.push({ field, operator, value })
    return this
  }

  notNull(field: string): this {
    return this.add(field, 'notnull', null)
  }

  isNull(field: string): this {
    return this.add(field, 'null', null)
  }

  equals(field: string, value: FilterValue): this {
    return this.add(field, 'eq', value)
  }

  notEquals(field: string, value: FilterValue): this {
    return this.add(field, 'ne', value)
  }

  contains(field: string, value: string): this {
    return this.add(field, 'ilike', value)
  }

  greaterThan(field: string, value: FilterValue): this {
    return this.add(field, 'gt', value)
  }

  lessThan(field: string, value: FilterValue): this {
    return this.add(field, 'lt', value)
  }

  inList(field: string, values: FilterPrimitive[]): this {
    return this.add(field, 'in', values)
  }

  between(field: string, min: FilterPrimitive, max: FilterPrimitive): this {
    return this.add(field, 'between', [min, max])
  }

  build(): FilterCondition[] {
    return this.filters
  }
}

// Helper de filtros estáticos para uso rápido
export const Filter = {
  notNull: (field: string): FilterCondition => ({
    field,
    operator: 'notnull',
    value: null,
  }),

  isNull: (field: string): FilterCondition => ({
    field,
    operator: 'null',
    value: null,
  }),

  equals: (field: string, value: FilterValue): FilterCondition => ({
    field,
    operator: 'eq',
    value,
  }),

  contains: (field: string, value: string): FilterCondition => ({
    field,
    operator: 'ilike',
    value,
  }),

  greaterThan: (field: string, value: FilterValue): FilterCondition => ({
    field,
    operator: 'gt',
    value,
  }),

  inList: (field: string, values: FilterPrimitive[]): FilterCondition => ({
    field,
    operator: 'in',
    value: values,
  }),
}
