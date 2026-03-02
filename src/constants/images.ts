/**
 * Centralized image assets configuration.
 * Change the URLs here to update images across the entire application.
 */
export const IMAGES = {
  // Founder / About Page
  founder: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/92.png?alt=media&token=c7e36399-8b9d-4bd2-9960-4ca52b1932cd",
  
  // Home Page
  hero: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/89.png?alt=media&token=bcb4996e-6e57-4d2a-9ac4-5fa35cab4a03",
  
  // Placeholders for dynamic content (can be replaced with specific URLs)
  studentPlaceholder: (id: string | number) => `https://picsum.photos/seed/student${id}/100/100`,
  blogPlaceholder: (id: string | number) => `https://picsum.photos/seed/blog${id}/800/600`,
  reviewPlaceholder: (id: string | number) => `https://picsum.photos/seed/review${id}/200/200`,
  
  // School Logos (used in Inquiry page)
  schools: [
    { name: 'Sydney Grammar', logo: 'https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/94.png?alt=media&token=b9e3c01b-00ee-46a9-a5c2-bc3b6eee2852' },
    { name: 'James Ruse', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=JR&backgroundColor=c5a059' },
    { name: 'Baulkham Hills', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BH&backgroundColor=02074d' },
    { name: 'North Sydney Boys', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NSB&backgroundColor=c5a059' },
    { name: 'North Sydney Girls', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NSG&backgroundColor=02074d' },
    { name: 'Hornsby Girls', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HG&backgroundColor=c5a059' },
  ]
};
