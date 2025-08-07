import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Hammer, PaintBucket, TreePine } from "lucide-react";

const IMG_3886 = "/attached_assets/IMG_3886.jpg";
const IMG_0548 = "/attached_assets/IMG_0548.jpeg";
const Screenshot_2025_07_09_122022 = "/attached_assets/Screenshot 2025-07-09 122022.png";
const HighlandValley4 = "/attached_assets/Highland Valley (4).png";
const commercial = "/attached_assets/commercial.jpg";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-charcoal mb-6">
            Our Services
          </h1>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            From new construction to complete renovations, we deliver exceptional 
            craftsmanship across all our specialties
          </p>
        </div>
      </section>
      {/* Main Services */}
      <section className="py-20 bg-white pt-[20px] pb-[20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* New Builds */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={IMG_3886} 
                alt="New construction home" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4">New Builds</h3>
                <p className="text-brand-grey mb-6">
                  Custom homes built from the ground up with attention to every detail. 
                  We work with you from design to completion to create your dream home.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Custom home design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Site preparation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Foundation to finish
                  </li>
                </ul>
                <Button asChild className="w-full bg-brand-green hover:bg-brand-green-light">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Kitchen Renovations */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={IMG_0548} 
                alt="Luxury kitchen renovation" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold brand-charcoal mb-4">Kitchen Renovations</h3>
                <p className="text-brand-grey mb-6">
                  Transform your kitchen into a culinary masterpiece with our high-end 
                  renovation services featuring premium materials and expert craftsmanship.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Custom cabinetry
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Premium countertops
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Complete remodeling
                  </li>
                </ul>
                <Button asChild className="w-full bg-brand-green hover:bg-brand-green-light">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Bathroom Renovations */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={Screenshot_2025_07_09_122022} 
                alt="Modern bathroom renovation" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold brand-charcoal mb-4">Bathroom Renovations</h3>
                <p className="text-brand-grey mb-6">
                  Create your personal spa retreat with our luxury bathroom renovations 
                  featuring modern fixtures and timeless design elements.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Luxury fixtures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Custom tile work
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Spa-like features
                  </li>
                </ul>
                <Button asChild className="w-full bg-brand-green hover:bg-brand-green-light">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Commercial Construction */}
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                src={commercial} 
                alt="Commercial construction project" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold brand-charcoal mb-4">Commercial Construction</h3>
                <p className="text-brand-grey mb-6">Professional commercial construction services for businesses, offices, and industrial infastruction. </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Office buildouts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Retail spaces
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-brand-green mr-3 h-5 w-5" />
                    Industrial building
                  </li>
                </ul>
                <Button asChild className="w-full bg-brand-green hover:bg-brand-green-light">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Additional Services */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <h3 className="text-3xl font-bold brand-charcoal mb-8 text-center">
              Additional Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Home className="mx-auto mb-4 h-12 w-12 brand-green" />
                <h4 className="font-semibold brand-charcoal">Custom ADU Construction</h4>
              </div>
              <div className="text-center">
                <Hammer className="mx-auto mb-4 h-12 w-12 brand-green" />
                <h4 className="font-semibold brand-charcoal">Home Addition</h4>
              </div>
              <div className="text-center">
                <PaintBucket className="mx-auto mb-4 h-12 w-12 brand-green" />
                <h4 className="font-semibold brand-charcoal">Interior & Exterior Remodeling</h4>
              </div>
              <div className="text-center">
                <TreePine className="mx-auto mb-4 h-12 w-12 brand-green" />
                <h4 className="font-semibold brand-charcoal">Outdoor Living</h4>
              </div>
            </div>
          </Card>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-light text-black border-2 border-brand-charcoal hover:border-brand-slate-dark shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="/contact">Schedule Your Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 bg-[#a1c6e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold brand-charcoal mb-6">Our Process</h2>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              We follow a proven process to ensure your project is completed on time, 
              within budget, and exceeds your expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">1</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Consultation</h3>
              <p className="text-brand-grey">Free in-home consultation to discuss your vision and needs</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">2</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Design</h3>
              <p className="text-brand-grey">Detailed design and planning with transparent pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">3</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Construction</h3>
              <p className="text-brand-grey">Expert construction with regular updates and communication</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">4</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-charcoal mb-2">Completion</h3>
              <p className="text-brand-grey">Final walkthrough and ongoing support guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
