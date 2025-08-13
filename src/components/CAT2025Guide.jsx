import { CalendarDays, FileText, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

const CAT2025Guide = () => {
  const importantDates = [
    { 
      id: 1, 
      event: 'Registration Start', 
      date: 'August 1, 2025', 
      time: '10:00 AM IST',
      status: 'upcoming' 
    },
    { 
      id: 2, 
      event: 'Registration End', 
      date: 'September 13, 2025', 
      time: '5:00 PM IST',
      status: 'upcoming' 
    },
    { 
      id: 3, 
      event: 'Admit Card Release', 
      date: 'First week of November 2025', 
      time: '--',
      status: 'upcoming' 
    },
    { 
      id: 4, 
      event: 'CAT 2025 Exam', 
      date: 'November 30, 2025', 
      time: 'As per slot',
      status: 'upcoming' 
    },
    { 
      id: 5, 
      event: 'Result Declaration', 
      date: 'First week of January 2026', 
      time: '--',
      status: 'upcoming' 
    },
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Registration',
      details: [
        'Visit the official IIM CAT website (iimcat.ac.in)',
        'Click on "New Registration"',
        'Fill in personal details (Name, Date of Birth, Email, Mobile)',
        'Create login credentials',
        'Verify email and mobile number',
      ],
    },
    {
      step: 2,
      title: 'Application Form',
      details: [
        'Log in with registered credentials',
        'Fill in academic details (10th, 12th, Graduation marks)',
        'Enter work experience (if any)',
        'Select preferred programs and IIMs',
        'Upload required documents (Photo, Signature, Category Certificate if applicable)',
      ],
    },
    {
      step: 3,
      title: 'Application Fee Payment',
      details: [
        'Fee for General/OBC candidates: ₹2400',
        'Fee for SC/ST/PwD candidates: ₹1200',
        'Payment methods: Credit Card/Debit Card/Net Banking/UPI',
        'Save payment confirmation for future reference',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CAT 2025 Application Guide</h1>
        <p className="text-xl text-gray-600">Everything you need to know about applying for CAT 2025</p>
      </div>

      {/* Important Dates */}
      <section className="mb-16 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <CalendarDays className="w-6 h-6 mr-2" />
          Important Dates
        </h2>
        <div className="space-y-4">
          {importantDates.map((item) => (
            <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {item.status === 'upcoming' ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{item.event}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
                {item.time !== '--' && <p className="text-xs text-gray-500">{item.time}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          <FileText className="w-6 h-6 inline-block mr-2" />
          Application Process
        </h2>
        <div className="space-y-8">
          {applicationSteps.map((step) => (
            <div key={step.step} className="relative pl-8 pb-8 border-l-2 border-pink-200">
              <div className="absolute -left-3.5 top-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <ul className="space-y-2 text-gray-700">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notes */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes:</h3>
        <ul className="space-y-2 text-yellow-700">
          <li>• Keep scanned copies of all documents ready before starting the application</li>
          <li>• Double-check all entered information before submission</li>
          <li>• The application fee is non-refundable</li>
          <li>• Save and print the confirmation page after successful submission</li>
          <li>• Check your email regularly for updates and admit card information</li>
        </ul>
      </section>

      {/* Official Website Link */}
      <div className="mt-8 text-center">
        <a
          href="https://iimcat.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 text-lg font-medium transition-colors duration-200"
        >
          Visit Official CAT 2025 Website
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CAT2025Guide;
