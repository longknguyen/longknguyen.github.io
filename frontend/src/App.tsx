import {Navigation} from '@/components/layout/Navigation';
import {ContactSection} from '@/components/sections/ContactSection';
import {EducationSection} from '@/components/sections/EducationSection';
import {HeroSection} from '@/components/sections/HeroSection';
import {ProjectsSection} from '@/components/sections/ProjectsSection';
import {SkillsSection} from '@/components/sections/SkillsSection';
import {navigationItems} from '@/data/siteContent';
import {useSectionNavigation} from '@/hooks/useSectionNavigation';
import {useTheme} from '@/hooks/useTheme';

const App = () => {
    const {theme, toggleTheme} = useTheme();
    const {activeSection, navigateTo} = useSectionNavigation();

    return (
        <div className="site-shell">
            <Navigation
                items={navigationItems}
                activeSection={activeSection}
                theme={theme}
                onToggleTheme={toggleTheme}
                onNavigate={navigateTo}
            />

            <main>
                <HeroSection onNavigate={navigateTo}/>
                <ProjectsSection/>
                <SkillsSection/>
                <EducationSection/>
                <ContactSection/>
            </main>
        </div>
    );
};

export default App;
