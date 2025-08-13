import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Target, Calculator, AlertCircle, TrendingUp } from 'lucide-react'
import { calculateRequiredMarks } from '@/data/catData'

const MarkCalculator = () => {
  const [targets, setTargets] = useState({
    overallPercentile: '',
    varcPercentile: '',
    dilrPercentile: '',
    qaPercentile: '',
    year: '2024'
  })
  const [results, setResults] = useState(null)
  const [errors, setErrors] = useState({})

  const validateInputs = () => {
    const newErrors = {}
    
    if (!targets.overallPercentile || targets.overallPercentile < 0 || targets.overallPercentile > 100) {
      newErrors.overallPercentile = 'Overall percentile must be between 0 and 100'
    }
    if (targets.varcPercentile && (targets.varcPercentile < 0 || targets.varcPercentile > 100)) {
      newErrors.varcPercentile = 'VARC percentile must be between 0 and 100'
    }
    if (targets.dilrPercentile && (targets.dilrPercentile < 0 || targets.dilrPercentile > 100)) {
      newErrors.dilrPercentile = 'DILR percentile must be between 0 and 100'
    }
    if (targets.qaPercentile && (targets.qaPercentile < 0 || targets.qaPercentile > 100)) {
      newErrors.qaPercentile = 'QA percentile must be between 0 and 100'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateResults = () => {
    if (!validateInputs()) return
    
    const overallMarks = calculateRequiredMarks(parseFloat(targets.overallPercentile), 'overall', targets.year)
    const varcMarks = targets.varcPercentile ? calculateRequiredMarks(parseFloat(targets.varcPercentile), 'varc', targets.year) : null
    const dilrMarks = targets.dilrPercentile ? calculateRequiredMarks(parseFloat(targets.dilrPercentile), 'dilr', targets.year) : null
    const qaMarks = targets.qaPercentile ? calculateRequiredMarks(parseFloat(targets.qaPercentile), 'qa', targets.year) : null
    
    setResults({
      overallMarks,
      sectionalMarks: {
        varc: varcMarks,
        dilr: dilrMarks,
        qa: qaMarks
      },
      totalSectionalMarks: (varcMarks || 0) + (dilrMarks || 0) + (qaMarks || 0)
    })
  }

  const handleInputChange = (field, value) => {
    setTargets(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getDifficultyLevel = (percentile) => {
    if (percentile >= 99) return { level: 'Extremely Difficult', color: 'text-red-600 bg-red-100' }
    if (percentile >= 95) return { level: 'Very Difficult', color: 'text-orange-600 bg-orange-100' }
    if (percentile >= 90) return { level: 'Difficult', color: 'text-yellow-600 bg-yellow-100' }
    if (percentile >= 80) return { level: 'Moderate', color: 'text-blue-600 bg-blue-100' }
    return { level: 'Achievable', color: 'text-green-600 bg-green-100' }
  }

  const getPreparationTips = (percentile) => {
    if (percentile >= 99) {
      return "Aim for 95%+ accuracy in your strong sections. Focus on speed and precision. Take multiple mocks daily."
    } else if (percentile >= 95) {
      return "Maintain 90%+ accuracy in 2 sections. Focus on time management and consistent practice."
    } else if (percentile >= 90) {
      return "Build strong fundamentals in all sections. Practice regularly and analyze your mistakes."
    }
    return "Focus on concept building and basic problem-solving. Start with easier questions and gradually increase difficulty."
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mark Requirement Calculator</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Set your target percentile and discover the marks you need to achieve your CAT goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Set Your Targets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Year Selection */}
              <div>
                <Label htmlFor="year">CAT Year</Label>
                <select
                  id="year"
                  value={targets.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2024">CAT 2024</option>
                  <option value="2023">CAT 2023</option>
                </select>
              </div>

              {/* Overall Percentile */}
              <div>
                <Label htmlFor="overallPercentile">Target Overall Percentile *</Label>
                <Input
                  id="overallPercentile"
                  type="number"
                  placeholder="e.g., 99"
                  value={targets.overallPercentile}
                  onChange={(e) => handleInputChange('overallPercentile', e.target.value)}
                  className={errors.overallPercentile ? 'border-red-500' : ''}
                />
                {errors.overallPercentile && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.overallPercentile}
                  </p>
                )}
              </div>

              {/* Sectional Percentiles */}
              <div>
                <Label className="text-base font-medium">Sectional Targets (Optional)</Label>
                <p className="text-sm text-gray-600 mb-3">Set specific sectional percentile targets</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="varcPercentile">VARC</Label>
                    <Input
                      id="varcPercentile"
                      type="number"
                      placeholder="e.g., 85"
                      value={targets.varcPercentile}
                      onChange={(e) => handleInputChange('varcPercentile', e.target.value)}
                      className={errors.varcPercentile ? 'border-red-500' : ''}
                    />
                    {errors.varcPercentile && (
                      <p className="text-red-500 text-xs mt-1">{errors.varcPercentile}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dilrPercentile">DILR</Label>
                    <Input
                      id="dilrPercentile"
                      type="number"
                      placeholder="e.g., 90"
                      value={targets.dilrPercentile}
                      onChange={(e) => handleInputChange('dilrPercentile', e.target.value)}
                      className={errors.dilrPercentile ? 'border-red-500' : ''}
                    />
                    {errors.dilrPercentile && (
                      <p className="text-red-500 text-xs mt-1">{errors.dilrPercentile}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="qaPercentile">QA</Label>
                    <Input
                      id="qaPercentile"
                      type="number"
                      placeholder="e.g., 95"
                      value={targets.qaPercentile}
                      onChange={(e) => handleInputChange('qaPercentile', e.target.value)}
                      className={errors.qaPercentile ? 'border-red-500' : ''}
                    />
                    {errors.qaPercentile && (
                      <p className="text-red-500 text-xs mt-1">{errors.qaPercentile}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculateResults} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Required Marks
              </Button>

              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <p className="font-medium mb-1">Note:</p>
                <p>Calculations are based on historical data. Actual requirements may vary based on exam difficulty and competition level.</p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Required Marks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Overall Marks */}
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Overall Target</h3>
                    <p className="text-3xl font-bold text-green-600 mb-2">{results.overallMarks} marks</p>
                    <Badge className={getDifficultyLevel(parseFloat(targets.overallPercentile)).color}>
                      {getDifficultyLevel(parseFloat(targets.overallPercentile)).level}
                    </Badge>
                  </div>

                  {/* Sectional Marks */}
                  {(results.sectionalMarks.varc || results.sectionalMarks.dilr || results.sectionalMarks.qa) && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Section-wise Requirements</h4>
                      <div className="space-y-3">
                        {results.sectionalMarks.varc && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <span className="font-medium">VARC</span>
                            <Badge className="bg-blue-100 text-blue-600">
                              {results.sectionalMarks.varc} marks
                            </Badge>
                          </div>
                        )}
                        {results.sectionalMarks.dilr && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <span className="font-medium">DILR</span>
                            <Badge className="bg-blue-100 text-blue-600">
                              {results.sectionalMarks.dilr} marks
                            </Badge>
                          </div>
                        )}
                        {results.sectionalMarks.qa && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <span className="font-medium">QA</span>
                            <Badge className="bg-blue-100 text-blue-600">
                              {results.sectionalMarks.qa} marks
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Preparation Strategy */}
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Preparation Strategy</h4>
                    <p className="text-sm text-blue-700">
                      {getPreparationTips(parseFloat(targets.overallPercentile))}
                    </p>
                  </div>

                  {/* Quick Tips */}
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-2">Quick Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Focus on accuracy over speed initially</li>
                      <li>• Practice time management with mock tests</li>
                      <li>• Identify and strengthen your weak areas</li>
                      <li>• Maintain consistency in your preparation</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Set your target percentile to see required marks</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default MarkCalculator

