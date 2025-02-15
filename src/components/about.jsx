const About = () => {
  const skills = [
    { id: 1, category: 'Frontend', items: ['React', 'NextJS', 'TypeScript', 'Tailwind CSS', 'Shadcn', 'Grommet', 'Jotai'] },
    { id: 2, category: 'Backend', items: ['Node.js', 'Express', 'NextJS', 'Python', 'Django', 'PostgreSQL - Supabase', 'MongoDB'] },
    { id: 3, category: 'Tools', items: ['Git', 'Gitlab', 'Github', 'Docker', 'VS Code'] },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              I'm a passionate full-stack developer with a keen eye for detail and a commitment to creating efficient, scalable solutions.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              With experience in both frontend and backend development, I bring ideas to life through clean code and intuitive user experiences.
            </p>
          </div>

          <div className="space-y-6">
            {skills.map(skillGroup => (
              <div key={skillGroup.category}>
                <h3 className="text-xl font-semibold mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map(skill => (
                    <span
                      key={skillGroup.id}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
