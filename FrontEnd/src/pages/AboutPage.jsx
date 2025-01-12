import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Adopt-A-Pet</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p>At Adopt-A-Pet, we believe every animal deserves a loving and caring home. Our mission is to connect homeless pets with individuals and families looking to adopt, ensuring every pet finds their perfect match. We strive to make the adoption process seamless, informative, and compassionate.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Who We Are</h2>
        <p>We are a dedicated team of animal lovers, shelter staff, and tech enthusiasts. Our goal is to create a platform that not only helps pets find homes but also supports adopters and shelters in every step of the adoption journey. From creating pet profiles to scheduling adoption appointments, our platform is designed to make adoption easier and more effective.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold">What We Do</h2>
        <h3 className="text-xl font-bold mt-4">For Adopters</h3>
        <ul className="list-disc list-inside">
          <li>Search for Pets: Explore a diverse range of pets available for adoption.</li>
          <li>Favorites: Save your favorite pets to your profile for easy access.</li>
          <li>Apply for Adoption: Submit adoption applications directly through our platform.</li>
          <li>Schedule Appointments: Book appointments to visit shelters and meet pets.</li>
        </ul>
        <h3 className="text-xl font-bold mt-4">For Shelters</h3>
        <ul className="list-disc list-inside">
          <li>Pet Profiles: Create and manage detailed profiles for each pet.</li>
          <li>Review Applications: Evaluate adoption applications and communicate with potential adopters.</li>
          <li>Manage Appointments: Organize and manage visits from adopters.</li>
          <li>Fostering Support: Create and manage foster pet profiles, and coordinate with foster parents.</li>
        </ul>
        <h3 className="text-xl font-bold mt-4">For Foster Parents</h3>
        <ul className="list-disc list-inside">
          <li>Foster Pets: View and request to foster pets.</li>
          <li>Update Conditions: Provide updates on the pet's condition and progress.</li>
          <li>Request Returns: Coordinate with shelters for returning foster pets.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Our Values</h2>
        <ul className="list-disc list-inside">
          <li>Compassion: We prioritize the well-being and happiness of every animal.</li>
          <li>Transparency: Clear communication and honesty are at the core of our process.</li>
          <li>Community: We foster a supportive and inclusive community of pet lovers.</li>
          <li>Innovation: We leverage technology to improve the adoption process and enhance user experience.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p>Have questions or need assistance? We're here to help! Reach out to us at:</p>
        <ul className="list-disc list-inside">
          <li>Email: support@petadoption.com</li>
          <li>Phone: +1 800-123-4567</li>
          <li>Address: 123 Pet Lane, Happy Tails City, CA 90001</li>
        </ul>
      </section>
      
      <p className="mt-4">Together, we can make a difference in the lives of countless pets. Join us in our mission to give every pet the loving home they deserve.</p>
    </div>
  );
};

export default AboutPage;
