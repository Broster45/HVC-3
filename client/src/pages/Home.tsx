import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Handshake, Clock, CheckCircle } from "lucide-react";
const houseBackgroundPath = "/attached_assets/new-hero-background.png";
const woodBackgroundPath = "/attached_assets/wood-1853403_1751588818138.jpg";
const Screenshot_2025_07_09_121726 = "/attached_assets/Screenshot 2025-07-09 121726.png";
const IMG_3886 = "/attached_assets/IMG_3886.jpg";
const IMG_0548 = "/attached_assets/IMG_0548.jpeg";
const Screenshot_2025_07_09_122022 = "/attached_assets/Screenshot 2025-07-09 122022.png";
const FramingOutside = "/attached_assets/Framing outside.jpg";
const commercial = "/attached_assets/commercial.jpg";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed hero-gradient"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 54, 93, 0.6), rgba(45, 55, 72, 0.6)), url(${houseBackgroundPath})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
            Quality Craftsmanship.<br />
            <span className="brand-green-light">Honest Service.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
            Highland Valley Construction specializes in new builds, remodels, and high-end 
            kitchen and bathroom renovations. We put our customers first with transparent 
            communication and exceptional quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-light text-lg px-8 py-4">
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Link href="/gallery">
              <button className="text-lg px-8 py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-semibold rounded-lg transition-all duration-200">
                View Our Work
              </button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-brand-green" />
              <h3 className="text-xl font-semibold mb-2 text-white">Licensed & Insured</h3>
              <p className="text-gray-100">Fully licensed and insured for your peace of mind</p>
            </div>
            <div className="text-center">
              <Handshake className="mx-auto mb-4 h-12 w-12 text-brand-green" />
              <h3 className="text-xl font-semibold mb-2 text-white">Honest Pricing</h3>
              <p className="text-gray-100">Transparent quotes with no hidden fees</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-4 h-12 w-12 text-brand-green" />
              <h3 className="text-xl font-semibold mb-2 text-white">On-Schedule Completion</h3>
              <p className="text-gray-100">Projects completed on time and within budget</p>
            </div>
          </div>
        </div>
      </section>
      {/* Services Preview */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              From new construction to complete renovations, we deliver exceptional 
              craftsmanship across all our specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={IMG_3886} 
                alt="New construction home" 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4">New Builds</h3>
                <p className="text-brand-grey mb-4">
                  Custom homes built from the ground up with attention to every detail.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={IMG_0548} 
                alt="Luxury kitchen renovation" 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4">Kitchen Renovations</h3>
                <p className="text-brand-grey mb-4">
                  Transform your kitchen with our high-end renovation services.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={Screenshot_2025_07_09_122022} 
                alt="Modern bathroom renovation" 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4">Bathroom Renovations</h3>
                <p className="text-brand-grey mb-4">
                  Create your personal spa retreat with luxury bathroom renovations.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={commercial} 
                alt="Home addition and remodeling project" 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4">Commercial Builds</h3>
                <p className="text-brand-grey mb-4">Commercial construction solutions for offices, retail, and industrial spaces.</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          
        </div>
      </section>
      {/* Why Choose Highland Valley */}
      <section 
        className="py-16 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${woodBackgroundPath})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow">
              Why Choose <span className="text-brand-green">Highland Valley Construction</span>?
            </h2>
            <p className="text-2xl text-white max-w-4xl mx-auto leading-relaxed text-shadow">
              Experience the difference that <span className="text-brand-green font-semibold">quality craftsmanship</span> and 
              <span className="text-brand-blue font-semibold"> honest service</span> make
            </p>
          </div>

          {/* Visual Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#000000d6]">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-4 mr-6">
                    <CheckCircle className="h-10 w-10 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">20+ Years Experience</h3>
                    <p className="text-green-100 text-lg">Proven Excellence</p>
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed">Over a decade of transforming homes across San Diego county with unmatched craftsmanship and attention to detail.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#000000d6]">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-4 mr-6">
                    <Award className="h-10 w-10 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Licensed & Insured</h3>
                    <p className="text-blue-100 text-lg">Complete Protection</p>
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed">Fully licensed and insured (CSLB License #855529) for your complete peace of mind. Your investment is always protected.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#000000d6]">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-4 mr-6">
                    <Handshake className="h-10 w-10 text-brand-charcoal" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Honest Pricing</h3>
                    <p className="text-gray-200 text-lg">No Surprises</p>
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  Transparent quotes with no hidden fees. What we quote is what you pay - guaranteed.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative group">
              <div className="rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-[#000000d6]">
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-4 mr-6">
                    <Clock className="h-10 w-10 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Timely, Reliable Work</h3>
                    <p className="text-green-100 text-lg">Dependable Timelines</p>
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  Projects completed on schedule and within budget. We respect your time and your investment.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center rounded-3xl p-12 shadow-2xl bg-[#000000d6]">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied homeowners who trusted Highland Valley Construction with their dream projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#ffffff] hover:bg-brand-green-light text-black border-2 border-brand-charcoal hover:border-brand-slate-dark shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/contact">Get Your Free Quote Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-[#000000] border-2 border-white text-white hover:bg-white hover:text-brand-slate-dark shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/gallery">See Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
