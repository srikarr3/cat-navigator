import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLink, Star, Clock, Users, BookOpen, Target } from 'lucide-react'
import { mockTestResources } from '@/data/catData'

const MockTests = () => {
  const [selectedCategory, setSelectedCategory] = useState('free')

  const features = {
    free: [
      "Limited number of tests",
      "Basic performance analysis",
      "Standard question quality",
      "Community support",
      "Basic explanations"
    ],
    paid: [
      "Extensive test series",
      "Detailed performance analytics",
      "Expert-designed questions",
      "Personal mentoring",
      "Video explanations",
      "All India ranking",
      "Sectional tests",
      "Topic-wise practice"
    ]
  }

  const tips = [
    {
      title: "Start Early",
      description: "Begin taking mocks at least 3-4 months before CAT",
      icon: <Clock className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Analyze Performance",
      description: "Spend equal time analyzing mistakes as taking the test",
      icon: <Target className="h-5 w-5 text-green-600" />
    },
    {
      title: "Maintain Consistency",
      description: "Take 2-3 mocks per week in the final 2 months",
      icon: <BookOpen className="h-5 w-5 text-purple-600" />
    },
    {
      title: "Simulate Exam Conditions",
      description: "Take mocks in a quiet environment with proper timing",
      icon: <Users className="h-5 w-5 text-orange-600" />
    }
  ]

  const getProviderRating = (provider) => {
    const ratings = {
      'Cracku': 4.2,
      'iQuanta': 4.5,
      'Career Launcher': 4.3,
      'IMS India': 4.6,
      'TIME': 4.4
    }
    return ratings[provider] || 4.0
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section id="mock-tests" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">CAT Mock Test Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of free and paid mock test series to boost your CAT preparation
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'free' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('free')}
              className="px-6"
            >
              Free Mock Tests
            </Button>
            <Button
              variant={selectedCategory === 'paid' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('paid')}
              className="px-6"
            >
              Paid Test Series
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mock Tests List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {mockTestResources[selectedCategory].map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 mb-2">
                          {resource.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="secondary" className="text-sm">
                            {resource.provider}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(getProviderRating(resource.provider))}
                            <span className="text-sm text-gray-600 ml-1">
                              {getProviderRating(resource.provider)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{resource.count}</p>
                      </div>
                      {selectedCategory === 'paid' && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {resource.price}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {resource.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-between items-center pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                        {selectedCategory === 'free' && (
                          <Badge className="bg-green-100 text-green-600">
                            Free
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedCategory === 'free' ? 'Free Tests' : 'Paid Series'} Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {features[selectedCategory].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Mock Test Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mock Test Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {tip.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{tip.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Our Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-3">
                  Start with free mocks to understand your baseline. Once comfortable, 
                  invest in a paid series for comprehensive preparation.
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-blue-600">
                    <strong>Best Free:</strong> iQuanta AI-based mocks
                  </div>
                  <div className="text-xs text-blue-600">
                    <strong>Best Paid:</strong> SIMCATs by IMS India
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mock Test Schedule */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Recommended Mock Test Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3-4M</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Before CAT</h4>
                <p className="text-sm text-gray-600">Start with 1 mock per week. Focus on understanding patterns.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2-3M</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Before CAT</h4>
                <p className="text-sm text-gray-600">Increase to 2 mocks per week. Work on weak areas.</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">1M</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Before CAT</h4>
                <p className="text-sm text-gray-600">Take 3 mocks per week. Focus on time management.</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">1W</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Before CAT</h4>
                <p className="text-sm text-gray-600">Reduce to 1-2 mocks. Focus on revision and confidence.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h4 className="font-medium text-yellow-800 mb-2">Important Note</h4>
            <p className="text-sm text-yellow-700">
              Mock tests are tools for improvement, not just assessment. Focus on learning from mistakes 
              rather than just scores. Quality of analysis matters more than quantity of tests taken.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default MockTests

