/**
 * Centralized image assets configuration.
 * Change the URLs here to update images across the entire application.
 */
export const IMAGES = {
  // Founder / About Page
  founder: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/leofounder.png?alt=media&token=d50ac739-b642-4dac-b1c3-7b4c891ae780",
  
  // Home Page
  hero: "https://firebasestorage.googleapis.com/v0/b/english-excellence-1bc2a.firebasestorage.app/o/Gemini_Generated_Image_4zkxct4zkxct4zkx.png?alt=media&token=0e80a6dc-767b-4685-837e-ff0c4ddfe3b2",
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
