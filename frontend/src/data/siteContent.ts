import {
    BriefcaseBusiness,
    Code2,
    Github,
    GraduationCap,
    Layers3,
    Linkedin,
    Mail,
    Wrench
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

export type NavigationItem = {
    id: string;
    label: string;
};

export type SocialLink = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export type Project = {
    title: string;
    description: string;
    href: string;
    image: string;
    tags: string[];
};

export type SkillGroup = {
    title: string;
    icon: LucideIcon;
    items: string[];
};

export const navigationItems: NavigationItem[] = [
    {id: 'home', label: 'Home'},
    {id: 'projects', label: 'Projects'},
    {id: 'skills', label: 'Skills'},
    {id: 'education', label: 'Education'},
    {id: 'contact', label: 'Contact'}
];

export const socialLinks: SocialLink[] = [
    {
        label: 'GitHub',
        href: 'https://github.com/longknguyen',
        icon: Github
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/long-nguyen-a3473a286/',
        icon: Linkedin
    },
    {
        label: 'Email',
        href: 'mailto:wnc2zb@virginia.edu',
        icon: Mail
    }
];

export const projects: Project[] = [
    {
        title: 'Shared Recipe Book',
        description:
            'A full-stack recipe platform with authentication, collections, reviews, and recipe management built with React, Tailwind CSS, Java and SQL.',
        href: 'https://github.com/longknguyen/flappy-bird',
        image: '/assets/images/projects/shared-recipe-book/full-preview.webp',
        tags: ['React', 'Tailwind', 'SQL', 'Spring Boot']
    },
    {
        title: 'Online Bookstore',
        description:
            'A database-backed bookstore built with separate customer and admin flows, book management and 3NF schemas.',
        href: 'https://github.com/longknguyen/online-book-store',
        image: '/assets/images/projects/bookstore/bookstoreindex.webp',
        tags: ['Java','Spring Boot', 'HTML', 'CSS']
    },
    {
        title: 'Personal Website',
        description:
            'A portfolio rebuilt to be more maintainable with typed components, reusable sections and a restructured frontend architecture.',
        href: 'https://github.com/longknguyen/longknguyen.github.io',
        image: '/assets/images/projects/portfolio/personal-web-prev.webp',
        tags: ['React', 'TypeScript', 'Tailwind ', 'Spring Boot']
    }
];

export const skillGroups: SkillGroup[] = [
    {
        title: 'Backend',
        icon: Code2,
        items: ['Java', 'SQL', 'Spring Boot', 'Python', 'C']
    },
    {
        title: 'Frontend',
        icon: Layers3,
        items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript']
    },
    {
        title: 'Practices',
        icon: BriefcaseBusiness,
        items: ['Object-Oriented Programming', 'Data Structures', 'Unit Testing', 'TDD', 'Database Design']
    },
    {
        title: 'Tools',
        icon: Wrench,
        items: ['Git', 'GitHub', 'Gradle', 'Docker']
    }
];

export const education = {
    school: 'The University of Virginia',
    degree: 'Bachelor of Science in Computer Science',
    graduation: 'Expected Graduation: May 2027',
    image: '/assets/images/education/university-logo.webp'
};

export const heroContent = {
    eyebrow: 'Computer Science Student',
    title: "Long Nguyen",
    summary:
        "I'm Long Nguyen, and I enjoy creating software that feels reliable, intentional and easy to grow over time.",
    image: '/assets/images/profile/profile-pic.webp'
};
