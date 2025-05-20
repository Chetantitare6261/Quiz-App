import { useState } from 'react';
import { FiPlay, FiAward, FiUsers, FiBarChart2 } from 'react-icons/fi';

const Heroheader = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const quizCategories = [
    { name: 'Java', id: 'popular' },
    { name: 'C++', id: 'language' },
    { name: 'Python', id: 'python' },
    { name: 'DSA', id: 'science' },
    { name: 'OOPs', id: 'history' },
    { name: 'Databse', id: 'movies' },
    { name: 'Computer Architecture', id: 'sports' },
  ];

  const quizStats = [
    { value: '10,000+', label: 'Quizzes', icon: <FiPlay className="text-blue-500" /> },
    { value: '50,000+', label: 'Players', icon: <FiUsers className="text-green-500" /> },
    { value: '95%', label: 'Success Rate', icon: <FiBarChart2 className="text-purple-500" /> },
    { value: '500+', label: 'Awards', icon: <FiAward className="text-yellow-500" /> },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('https://svgshare.com/i/12hQ.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Test Your Knowledge with <span className="text-blue-600">Fun Quizzes</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Challenge yourself with thousands of quizzes on various topics. Learn, compete, and earn rewards!
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search for quizzes..."
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300">
              Search
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {quizCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2 rounded-full transition-colors duration-300 ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quizStats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
              Start Quiz Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors duration-300 border border-gray-300 shadow-sm hover:shadow-md">
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Floating quiz cards decoration */}
      <div className="hidden lg:block absolute -bottom-20 left-10 w-32 h-32 bg-white rounded-xl shadow-lg p-4 transform rotate-6">
        <div className="bg-blue-100 rounded-lg w-full h-full flex items-center justify-center">
          <span className="text-blue-600 font-bold">?</span>
        </div>
      </div>
      <div className="hidden lg:block absolute -bottom-10 right-10 w-40 h-40 bg-white rounded-xl shadow-lg p-4 transform -rotate-3">
        <div className="bg-purple-100 rounded-lg w-full h-full flex items-center justify-center">
          <span className="text-purple-600 font-bold text-xl">Quiz</span>
        </div>
      </div>
    </section>
  );
};

export default Heroheader;