import {HeroSection} from '@/components/sections/HeroSection';

type HomePageProps = {
    onNavigate: (sectionId: 'projects' | 'contact') => void;
};

export const HomePage = ({onNavigate}: HomePageProps) => {
    return <HeroSection onNavigate={onNavigate}/>;
};
