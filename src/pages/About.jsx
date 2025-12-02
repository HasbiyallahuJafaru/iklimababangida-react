function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Visual Artist • Creative Director • Storyteller
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="h-96 lg:h-[500px] bg-gray-300 rounded-lg shadow-lg"></div>
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">Who I Am</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Hello! I'm Iklima Babangida, a visual artist based in [Location].
                  My journey in art began [background story], and since then, I've
                  been dedicated to creating work that resonates with people on a
                  deeper level.
                </p>
                <p>
                  My artistic practice is rooted in exploring themes of identity,
                  culture, and the human experience. I believe that art has the
                  power to bridge gaps, spark conversations, and create meaningful
                  connections between people from all walks of life.
                </p>
                <p>
                  Through my work, I aim to tell stories that matter—stories that
                  challenge perspectives, celebrate diversity, and inspire change.
                  Each piece I create is a reflection of my commitment to using art
                  as a tool for expression, education, and empowerment.
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-600 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  Digital Art
                </h3>
                <p className="text-gray-600 text-center">
                  Creating stunning digital illustrations and artwork using
                  industry-standard tools and techniques.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-600 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  Mixed Media
                </h3>
                <p className="text-gray-600 text-center">
                  Combining traditional and contemporary techniques to create
                  unique, multi-layered artworks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-600 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  Creative Direction
                </h3>
                <p className="text-gray-600 text-center">
                  Leading creative projects from concept to completion with a
                  clear artistic vision.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-purple-600 font-bold">2020-Present</span>
                </div>
                <div className="flex-grow pl-8 border-l-2 border-purple-600">
                  <h3 className="text-xl font-bold mb-2">
                    Freelance Visual Artist
                  </h3>
                  <p className="text-gray-600">
                    Working with various clients on creative projects, exhibitions,
                    and commissions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-purple-600 font-bold">2018-2020</span>
                </div>
                <div className="flex-grow pl-8 border-l-2 border-purple-600">
                  <h3 className="text-xl font-bold mb-2">
                    Creative Director
                  </h3>
                  <p className="text-gray-600">
                    Led creative teams in developing visual content for brands and
                    organizations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-purple-600 font-bold">2015-2018</span>
                </div>
                <div className="flex-grow pl-8 border-l-2 border-purple-600">
                  <h3 className="text-xl font-bold mb-2">Visual Designer</h3>
                  <p className="text-gray-600">
                    Created visual designs for digital and print media across
                    various industries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-2">
                  Bachelor of Fine Arts
                </h3>
                <p className="text-purple-600 font-semibold mb-2">
                  [University Name]
                </p>
                <p className="text-gray-600">
                  Graduated [Year] • Specialized in Visual Arts and Design
                </p>
              </div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12">
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">[Award Name]</h3>
                <p className="text-purple-600 mb-2">[Year]</p>
                <p className="text-gray-600">
                  Recognition for outstanding contribution to visual arts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">[Exhibition Name]</h3>
                <p className="text-purple-600 mb-2">[Year]</p>
                <p className="text-gray-600">
                  Featured artist at prestigious art exhibition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Know More?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Feel free to reach out if you'd like to discuss collaborations,
            commissions, or just want to chat about art.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
