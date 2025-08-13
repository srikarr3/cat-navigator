import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Target, BookOpen, TrendingUp, Users, Calculator } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()
  
  const features = [
    {
      icon: BarChart3,
      title: 'Percentile vs Marks Tracker',
      description: 'Interactive data visualization with historical trends and category-wise analysis'
    },
    {
      icon: Target,
      title: 'IIM-wise Cutoff Data',
      description: 'Comprehensive cutoff information for all IIMs with sectional requirements'
    },
    {
      icon: BookOpen,
      title: 'Post-CAT Process Guides',
      description: 'Detailed admission process guides for WAT, PI, and GD rounds'
    },
    {
      icon: TrendingUp,
      title: 'Low PI/WAT Weightage IIMs',
      description: 'Strategic insights for IIMs with higher CAT score weightage'
    },
    {
      icon: Users,
      title: 'Other Colleges Accepting CAT',
      description: 'Complete list of non-IIM institutes with their cutoffs and processes'
    },
    {
      icon: Calculator,
      title: 'Interactive Tools',
      description: 'Percentile predictors and mark requirement calculators'
    }
  ]

  return (
    <section id="home" className="bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-black">Your Complete</span>
            <span className="bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent block font-extrabold tracking-tight">
              CAT Preparation Guide
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Navigate your CAT journey with comprehensive data, interactive tools, and strategic insights 
            for MBA admissions. Everything you need to make informed decisions about your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-pink-600 hover:bg-pink-700 text-white hover:cursor-pointer"
              onClick={() => navigate('/tools')}
            >
              Explore Tools
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-pink-600 border-pink-600 hover:bg-pink-50 hover:cursor-pointer"
              onClick={() => navigate('/iim-cutoffs')}
            >
              View IIM Cutoffs
            </Button>
          </div>
        </div>

        {/* Features Grid - Home style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-pink-100 p-3 rounded-lg w-fit mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-pink-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600">21+</div>
              <div className="text-gray-600">IIMs Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">100+</div>
              <div className="text-gray-600">Colleges Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">5+</div>
              <div className="text-gray-600">Years of Data</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">Free</div>
              <div className="text-gray-600">Always</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

