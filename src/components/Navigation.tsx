import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: 'jetstream', label: 'Jet Stream', altitude: '40,000 ft' },
    { id: 'atmosphere', label: 'Atmosphere', altitude: '25,000 ft' },
    { id: 'coastal', label: 'Coastal', altitude: 'Sea Level' },
    { id: 'ocean', label: 'Deep Ocean', altitude: '2,000 m below' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="glass-card p-4 space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-300 group ${
              activeSection === index 
                ? 'bg-data-primary/20 text-data-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-data-primary scale-150' : 'bg-muted-foreground/50'
              }`} />
              <div>
                <div className="font-medium text-sm">{section.label}</div>
                <div className="text-xs opacity-70">{section.altitude}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;