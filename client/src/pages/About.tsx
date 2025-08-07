import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Star, Handshake } from "lucide-react";

const aboutPhotoPath = "/attached_assets/About Pic For Website.jpg";
const About_Pic_For_Website = "/attached_assets/About Pic For Website.jpg";
const Framing_Inside = "/attached_assets/Framing Inside.jpg";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold brand-charcoal mb-6">
            About Highland Valley Construction
          </h1>
          <p className="text-xl brand-grey max-w-3xl mx-auto">Building trust one project at a time for over 20 years</p>
        </div>
      </section>
      {/* Main About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold brand-charcoal mb-6">
                Our Story
              </h2>
              <p className="text-xl brand-grey mb-6">For over 20 years, Highland Valley Construction has been building trust one project at a time. We believe that exceptional craftsmanship and honest communication are the foundation of every successful project.</p>
              <p className="text-lg brand-grey mb-8">Our team of skilled craftsmen are dedicated to bringing your vision to life while maintaining the highest standards of quality and professionalism. From the initial consultation to project completion, we prioritize transparency, reliability, and customer satisfaction.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="brand-green mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold brand-charcoal">20+ Years Experience</h4>
                    <p className="brand-grey text-sm">Proven track record of excellence</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="brand-green mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold brand-charcoal">Expert Team</h4>
                    <p className="brand-grey text-sm">Skilled craftsmen and Sub Contractors</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="brand-green mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold brand-charcoal">Quality Guaranteed</h4>
                    <p className="brand-grey text-sm">Commitment to exceptional results</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Handshake className="brand-green mr-4 h-8 w-8" />
                  <div>
                    <h4 className="font-semibold brand-charcoal">Honest Service</h4>
                    <p className="brand-grey text-sm">Transparent communication always</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-light">
                <Link href="/contact">Meet Our Team</Link>
              </Button>
            </div>

            <div className="relative">
              <img 
                src={Framing_Inside}
                alt="Highland Valley Construction team member" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-charcoal mb-6">
              Our Values
            </h2>
            <p className="text-xl brand-grey max-w-3xl mx-auto">
              These principles guide everything we do and every relationship we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 brand-green" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Quality First</h3>
              <p className="brand-grey">
                We never compromise on quality. Every project is executed with 
                meticulous attention to detail and the finest materials.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="bg-brand-blue-light/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-10 w-10 brand-blue-light" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Integrity</h3>
              <p className="brand-grey">
                Honest communication, transparent pricing, and keeping our promises 
                are the cornerstones of our business.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 brand-green" />
              </div>
              <h3 className="text-2xl font-bold brand-charcoal mb-4">Customer Focus</h3>
              <p className="brand-grey">
                Your satisfaction is our success. We listen to your needs and 
                exceed your expectations at every step.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-white pt-[0px] pb-[0px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <img 
                src={About_Pic_For_Website} 
                alt="Highland Valley Construction Team" 
                className="w-full h-[500px] object-contain rounded-2xl"
                style={{ aspectRatio: '3/4', borderRadius: '1rem' }}
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold brand-charcoal mb-6">Phillip Petrovic</h3>
              <p className="brand-green font-semibold text-xl mb-4">Founder & CEO</p>
              <p className="brand-grey text-lg leading-relaxed">With over 20 years in the construction industry, Phillip Petrovic founded Highland Valley Construction with a vision to deliver exceptional craftsmanship and customer service. As a licensed General Contractor, his passion for quality building and commitment to excellence have made Highland Valley Construction a trusted name in residential construction, remodeling, and custom home building throughout the valley.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#000000]">
            Ready to Work with Us?
          </h2>
          <p className="text-xl mb-8 text-[#000000]">
            Experience the Highland Valley difference. Let's build something amazing together.
          </p>
          <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-light text-[#000000] border-2 border-brand-charcoal hover:border-brand-slate-dark shadow-lg hover:shadow-xl transition-all duration-200">
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
