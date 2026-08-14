import type {LucideIcon} from 'lucide-react';
import {Code2, FolderKanban, Github, GraduationCap, Home, Linkedin, Mail} from 'lucide-react';

export type SectionId = 'home' | 'projects' | 'skills' | 'education' | 'contact';

export type NavigationItem = {
    id: SectionId;
    label: string;
    icon: LucideIcon;
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
    items: string[];
};

export const navigationItems: NavigationItem[] = [
    {id: 'home', label: 'Home', icon: Home},
    {id: 'projects', label: 'Projects', icon: FolderKanban},
    {id: 'skills', label: 'Skills', icon: Code2},
    {id: 'education', label: 'Education', icon: GraduationCap},
    {id: 'contact', label: 'Contact', icon: Mail}
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
        title: 'Campus Interest Hub',
        description:
            'A student organisation platform that helps users discover campus groups, manage memberships, and connect through real-time messaging and discussion spaces.',
        href: 'https://github.com/longknguyen/clubstrate',
        image: '/assets/images/projects/clubstrate/clubstrate-prev.webp',
        tags: ['Python', 'Django', 'CSS', 'JavaScript', 'HTML']
    },
    {
        title: 'Shared Recipe Book',
        description:
            'A collaborative digital cookbook where users can explore recipes, curate their own collections, post their own original dishes and engage with other cooks through reviews.',
        href: 'https://github.com/longknguyen/shared-recipe-book',
        image: '/assets/images/projects/shared-recipe-book/full-preview.webp',
        tags: ['React', 'Tailwind', 'SQL', 'Java', 'Spring Boot']
    },
    {
        title: 'Online Bookstore',
        description:
            'A database-backed bookstore built with separate customer and admin flows, book management and 3NF schemas.',
        href: 'https://github.com/longknguyen/online-book-store',
        image: '/assets/images/projects/bookstore/bookstoreindex.webp',
        tags: ['Java', 'Spring Boot', 'HTML', 'CSS']
    }
];

export const skillGroups: SkillGroup[] = [
    {
        title: 'Backend',
        items: ['Java', 'SQL', 'Spring Boot', 'Python']
    },
    {
        title: 'Frontend',
        items: ['React', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript']
    },
    {
        title: 'Practices',
        items: ['Object-Oriented Programming', 'Data Structures', 'Unit Testing', 'TDD', 'Database Design']
    },
    {
        title: 'Tools',
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
        "I'm Long Nguyen, and I enjoy creating software that feels intentional and easy to grow over time.",
    image: '/assets/images/profile/profile-pic.webp'
};
