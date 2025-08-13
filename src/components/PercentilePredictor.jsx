import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react'
import { calculatePercentile } from '@/data/catData'

const PercentilePredictor = () => {
  const [scores, setScores] = useState({
    varc: '',
    dilr: '',
    qa: '',
    year: '2024'
  })
  const [results, setResults] = useState(null)
  const [errors, setErrors] = useState({})

  const validateInputs = () => {
    const newErrors = {}
    
    if (!scores.varc || scores.varc < 0 || scores.varc > 34) {
      newErrors.varc = 'VARC score must be between 0 and 34'
    }
    if (!scores.dilr || scores.dilr < 0 || scores.dilr > 32) {
      newErrors.dilr = 'DILR score must be between 0 and 32'
    }
    if (!scores.qa || scores.qa < 0 || scores.qa > 34) {
      newErrors.qa = 'QA score must be between 0 and 34'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateResults = () => {
    if (!validateInputs()) return
    
    const varcScore = parseFloat(scores.varc)
    const dilrScore = parseFloat(scores.dilr)
    const qaScore = parseFloat(scores.qa)
    const totalScore = varcScore + dilrScore + qaScore
    
    const varcPercentile = calculatePercentile(varcScore, 'varc', scores.year)
    const dilrPercentile = calculatePercentile(dilrScore, 'dilr', scores.year)
    const qaPercentile = calculatePercentile(qaScore, 'qa', scores.year)
    const overallPercentile = calculatePercentile(totalScore, 'overall', scores.year)
    
    setResults({
      totalScore,
      sectionalPercentiles: {
        varc: varcPercentile?.toFixed(2),
        dilr: dilrPercentile?.toFixed(2),
        qa: qaPercentile?.toFixed(2)
      },
      overallPercentile: overallPercentile?.toFixed(2)
    })
  }

  const handleInputChange = (field, value) => {
    setScores(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getPercentileColor = (percentile) => {
    if (percentile >= 99) return 'text-green-600 bg-green-100'
    if (percentile >= 95) return 'text-blue-600 bg-blue-100'
    if (percentile >= 90) return 'text-orange-600 bg-orange-100'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <section id="tools" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">CAT Percentile Predictor</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enter your CAT scores to predict your percentile based on historical data and trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Enter Your Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Year Selection */}
              <div>
                <Label htmlFor="year">CAT Year</Label>
                <select
                  id="year"
                  value={scores.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2024">CAT 2024</option>
                  <option value="2023">CAT 2023</option>
                </select>
              </div>

              {/* Score Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="varc">VARC Score</Label>
                  <Input
                    id="varc"
                    type="number"
                    placeholder="0-34"
                    value={scores.varc}
                    onChange={(e) => handleInputChange('varc', e.target.value)}
                    className={errors.varc ? 'border-red-500' : ''}
                  />
                  {errors.varc && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.varc}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dilr">DILR Score</Label>
                  <Input
                    id="dilr"
                    type="number"
                    placeholder="0-32"
                    value={scores.dilr}
                    onChange={(e) => handleInputChange('dilr', e.target.value)}
                    className={errors.dilr ? 'border-red-500' : ''}
                  />
                  {errors.dilr && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dilr}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="qa">QA Score</Label>
                  <Input
                    id="qa"
                    type="number"
                    placeholder="0-34"
                    value={scores.qa}
                    onChange={(e) => handleInputChange('qa', e.target.value)}
                    className={errors.qa ? 'border-red-500' : ''}
                  />
                  {errors.qa && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.qa}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                onClick={calculateResults} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Calculate Percentile
              </Button>

              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <p className="font-medium mb-1">Note:</p>
                <p>This predictor uses historical CAT data and statistical models. Actual percentiles may vary based on exam difficulty and candidate performance.</p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Predicted Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Total Score</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{results.totalScore}</p>
                    <Badge className={`text-lg px-3 py-1 ${getPercentileColor(parseFloat(results.overallPercentile))}`}>
                      {results.overallPercentile}%ile
                    </Badge>
                  </div>

                  {/* Sectional Percentiles */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Section-wise Percentiles</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-medium">VARC</span>
                        <Badge className={getPercentileColor(parseFloat(results.sectionalPercentiles.varc))}>
                          {results.sectionalPercentiles.varc}%ile
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-medium">DILR</span>
                        <Badge className={getPercentileColor(parseFloat(results.sectionalPercentiles.dilr))}>
                          {results.sectionalPercentiles.dilr}%ile
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-medium">QA</span>
                        <Badge className={getPercentileColor(parseFloat(results.sectionalPercentiles.qa))}>
                          {results.sectionalPercentiles.qa}%ile
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Performance Analysis */}
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-2">Performance Analysis</h4>
                    <p className="text-sm text-yellow-700">
                      {parseFloat(results.overallPercentile) >= 99 
                        ? "Excellent performance! You're in the top 1% of candidates."
                        : parseFloat(results.overallPercentile) >= 95
                        ? "Great performance! You have good chances at top IIMs."
                        : parseFloat(results.overallPercentile) >= 90
                        ? "Good performance! Consider newer IIMs and other top B-schools."
                        : "Keep working hard! Focus on improving your weaker sections."
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter your scores to see predicted percentiles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default PercentilePredictor

