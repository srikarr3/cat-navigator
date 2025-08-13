import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'

const FilterPanel = ({ 
  filters = [], 
  activeFilters = {}, 
  onFilterChange, 
  onClearAll,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterToggle = (filterKey, value) => {
    const currentValues = activeFilters[filterKey] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    onFilterChange(filterKey, newValues)
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, values) => count + values.length, 0)
  }

  return (
    <div className={className}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {filters.map((filter) => (
            <div key={filter.key}>
              <h4 className="font-medium text-gray-900 mb-3">{filter.label}</h4>
              <div className="space-y-2">
                {filter.options.map((option) => {
                  const isActive = (activeFilters[filter.key] || []).includes(option.value)
                  return (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleFilterToggle(filter.key, option.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                      {option.count && (
                        <span className="text-xs text-gray-500">({option.count})</span>
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterKey, values]) =>
              values.map((value) => {
                const filter = filters.find(f => f.key === filterKey)
                const option = filter?.options.find(o => o.value === value)
                return (
                  <Badge
                    key={`${filterKey}-${value}`}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {option?.label || value}
                    <button
                      onClick={() => handleFilterToggle(filterKey, value)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

