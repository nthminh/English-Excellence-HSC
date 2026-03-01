/**
 * Centralized image assets configuration.
 * Change the URLs here to update images across the entire application.
 */
export const IMAGES = {
  // Founder / About Page
  founder: "https://picsum.photos/seed/leo/800/800",
  
  // Home Page
  hero: "https://picsum.photos/seed/tutoring/800/1000",
  
  // Placeholders for dynamic content (can be replaced with specific URLs)
  studentPlaceholder: (id: string | number) => `https://picsum.photos/seed/student${id}/100/100`,
  blogPlaceholder: (id: string | number) => `https://picsum.photos/seed/blog${id}/800/600`,
  reviewPlaceholder: (id: string | number) => `https://picsum.photos/seed/review${id}/200/200`,
  
  // School Logos (used in Inquiry page)
  schools: [
    { name: 'Sydney Grammar', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SG&backgroundColor=02074d' },
    { name: 'James Ruse', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=JR&backgroundColor=c5a059' },
    { name: 'Baulkham Hills', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BH&backgroundColor=02074d' },
    { name: 'North Sydney Boys', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NSB&backgroundColor=c5a059' },
    { name: 'North Sydney Girls', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NSG&backgroundColor=02074d' },
    { name: 'Hornsby Girls', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HG&backgroundColor=c5a059' },
  ]
};
