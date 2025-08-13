import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Download,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { catPercentileMappings } from '../data/comprehensiveData'
import { generateIIMCSV, generateOtherInstitutesCSV, generateJSONData, downloadCSV, downloadJSON } from '../data/exportData'
import { Card, CardContent } from '@/components/ui/card'

const MarksVsPercentile = () => {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedSection, setSelectedSection] = useState('overall')
  const [selectedCategory, setSelectedCategory] = useState('general')

  const availableYears = Object.keys(catPercentileMappings)
  const sections = [
    { id: 'overall', name: 'Overall', maxMarks: 204 },
    { id: 'varc', name: 'VARC', maxMarks: 72 },
    { id: 'dilr', name: 'DILR', maxMarks: 60 },
    { id: 'qa', name: 'QA', maxMarks: 72 }
  ]

  // Note: Category-specific data is not yet available
  // Will be implemented in a future update

  const getConfidenceIcon = (confidence) => {
    switch (confidence) {
      case 'High':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Medium':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'Low':
        return <Info className="w-4 h-4 text-red-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const currentSection = sections.find(s => s.id === selectedSection)
  const yearData = catPercentileMappings[selectedYear]?.[selectedSection] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Marks vs Percentile Tracker
        </h1>
        <p className="text-xl text-gray-600">
          Interactive mapping of CAT scores to percentiles with year-wise data and confidence scores
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CAT Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>CAT {year}</option>
              ))}
            </select>
          </div>

          {/* Section Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name} (Max: {section.maxMarks})
                </option>
              ))}
            </select>
          </div>

          {/* Category Selection - Currently only General category data available */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-100 text-gray-500 cursor-not-allowed"
                disabled
                title="Currently showing General category data only"
              >
                <option value="general">General (Only available)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Info className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Category-specific percentiles coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Main Data Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Percentile to Marks Table */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" />
            Percentile → Marks Mapping
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-50">
                  <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">
                    Target Percentile
                  </th>
                  <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">
                    Required Marks
                  </th>
                  <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">
                    % of Max
                  </th>
                  <th className="border border-pink-200 p-3 text-left text-sm font-medium text-pink-800">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {yearData.map((item) => {
                  const percentageOfMax = ((item.marks / currentSection.maxMarks) * 100).toFixed(1)
                  return (
                    <tr key={item.percentile} className="hover:bg-pink-50">
                      <td className="border border-pink-200 p-3 font-semibold text-gray-800">
                        {item.percentile}%
                      </td>
                      <td className="border border-pink-200 p-3 text-gray-800">
                        {item.marks}
                      </td>
                      <td className="border border-pink-200 p-3 text-gray-600">
                        {percentageOfMax}%
                      </td>
                      <td className="border border-pink-200 p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(item.confidence)}`}>
                          {getConfidenceIcon(item.confidence)}
                          <span className="ml-1">{item.confidence}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center text-blue-800">
              <Info className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Data Source: {yearData[0]?.source || 'Interpolated'}</span>
            </div>
          </div>
        </div>

        {/* Quick Reference Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3" />
            Quick Reference
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">🎯 Key Percentiles</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>90%ile:</span>
                  <span className="font-semibold">Most New & Baby IIMs</span>
                </div>
                <div className="flex justify-between">
                  <span>95%ile:</span>
                  <span className="font-semibold">Most Old IIMs</span>
                </div>
                <div className="flex justify-between">
                  <span>99%ile:</span>
                  <span className="font-semibold">All IIMs + Top Non-IIMs</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Section Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>VARC:</span>
                  <span className="font-semibold">Often highest cutoff</span>
                </div>
                <div className="flex justify-between">
                  <span>DILR:</span>
                  <span className="font-semibold">Balanced performance needed</span>
                </div>
                <div className="flex justify-between">
                  <span>QA:</span>
                  <span className="font-semibold">Strong foundation required</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">💡 Strategy Tips</h3>
              <div className="space-y-2 text-sm">
                <div>• Focus on balanced sectional performance</div>
                <div>• Don't neglect any section</div>
                <div>• Practice time management</div>
                <div>• Regular mock test analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year Comparison */}
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-3" />
          Year-wise Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableYears.map(year => (
            <div key={year} className="border border-pink-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">CAT {year}</h3>
              <div className="space-y-2">
                {catPercentileMappings[year]?.overall?.slice(0, 4).map(item => (
                  <div key={item.percentile} className="flex justify-between text-sm">
                    <span>{item.percentile}%ile:</span>
                    <span className="font-semibold">{item.marks} marks</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-pink-200">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(yearData[0]?.confidence || 'Medium')}`}>
                  {yearData[0]?.confidence || 'Medium'} Confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Quality & Methodology */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
          Data Quality & Methodology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Sources Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Sources</h3>
              <ul className="space-y-3">
                {[
                  { text: 'Official CAT percentile reports', icon: CheckCircle, color: 'text-green-500' },
                  { text: 'IIM admission notifications', icon: CheckCircle, color: 'text-green-500' },
                  { text: 'Verified aggregator mappings (IMS, Cracku)', icon: CheckCircle, color: 'text-green-500' },
                  { text: 'Interpolated estimates for missing data', icon: AlertCircle, color: 'text-yellow-500' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <item.icon className={`w-5 h-5 ${item.color} mr-2 mt-0.5 flex-shrink-0`} />
                    <span className="text-gray-600">{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Confidence Levels Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Confidence Levels</h3>
              <div className="space-y-4 mb-4">
                {[
                  { 
                    level: 'High', 
                    description: 'Official CAT data, verified sources', 
                    icon: CheckCircle, 
                    color: 'bg-green-100 text-green-800 border-green-200'
                  },
                  { 
                    level: 'Medium', 
                    description: 'Interpolated from official data', 
                    icon: AlertCircle, 
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  },
                  { 
                    level: 'Low', 
                    description: 'Estimated from multiple sources', 
                    icon: Info, 
                    color: 'bg-red-100 text-red-800 border-red-200'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.color} mr-3`}>
                      <item.icon className="w-3 h-3 mr-1" />
                      {item.level}
                    </div>
                    <span className="text-sm text-gray-600">{item.description}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Percentile to marks conversion may vary slightly due to normalization and slot variations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Download Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
          Download Complete Data
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Download comprehensive CAT percentile to marks mapping data in CSV or JSON format.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'IIM Data',
              desc: 'Detailed IIM admission data',
              onClick: () => {
                const iimCSV = generateIIMCSV()
                downloadCSV(iimCSV, 'iim_admissions_data.csv')
              },
              icon: <BarChart3 className="w-8 h-8 text-white" />,
              color: 'from-pink-500 to-pink-600'
            },
            {
              title: 'Other Institutes',
              desc: 'Non-IIM institutes data',
              onClick: () => {
                const otherCSV = generateOtherInstitutesCSV()
                downloadCSV(otherCSV, 'other_institutes_data.csv')
              },
              icon: <FileText className="w-8 h-8 text-white" />,
              color: 'from-purple-500 to-purple-600'
            },
            {
              title: 'Complete Dataset',
              desc: 'All data in JSON format',
              onClick: () => {
                const jsonData = generateJSONData()
                downloadJSON(jsonData, 'cat_admissions_data.json')
              },
              icon: <Download className="w-8 h-8 text-white" />,
              color: 'from-blue-500 to-blue-600'
            }
          ].map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardContent 
                className="p-6 text-center h-full flex flex-col items-center justify-between"
                onClick={item.onClick}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.desc}
                </p>
                <button 
                  className="mt-auto bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={item.onClick}
                >
                  Download
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MarksVsPercentile

